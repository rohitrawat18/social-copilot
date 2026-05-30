import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { socialAccounts, users, platformEnum } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// Platform-specific token exchange configs
const TOKEN_CONFIGS: Record<string, {
  tokenUrl: string;
  clientIdEnv: string;
  clientSecretEnv: string;
}> = {
  twitter: {
    tokenUrl: "https://api.twitter.com/2/oauth2/token",
    clientIdEnv: "TWITTER_CLIENT_ID",
    clientSecretEnv: "TWITTER_CLIENT_SECRET",
  },
  instagram: {
    tokenUrl: "https://api.instagram.com/oauth/access_token",
    clientIdEnv: "INSTAGRAM_CLIENT_ID",
    clientSecretEnv: "INSTAGRAM_CLIENT_SECRET",
  },
  youtube: {
    tokenUrl: "https://oauth2.googleapis.com/token",
    clientIdEnv: "YOUTUBE_CLIENT_ID",
    clientSecretEnv: "YOUTUBE_CLIENT_SECRET",
  },
  tiktok: {
    tokenUrl: "https://open.tiktokapis.com/v2/oauth/token/",
    clientIdEnv: "TIKTOK_CLIENT_ID",
    clientSecretEnv: "TIKTOK_CLIENT_SECRET",
  },
  linkedin: {
    tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
    clientIdEnv: "LINKEDIN_CLIENT_ID",
    clientSecretEnv: "LINKEDIN_CLIENT_SECRET",
  },
  pinterest: {
    tokenUrl: "https://api.pinterest.com/v5/oauth/token",
    clientIdEnv: "PINTEREST_CLIENT_ID",
    clientSecretEnv: "PINTEREST_CLIENT_SECRET",
  },
  discord: {
    tokenUrl: "https://discord.com/api/oauth2/token",
    clientIdEnv: "DISCORD_CLIENT_ID",
    clientSecretEnv: "DISCORD_CLIENT_SECRET",
  },
  slack: {
    tokenUrl: "https://slack.com/api/oauth.v2.access",
    clientIdEnv: "SLACK_CLIENT_ID",
    clientSecretEnv: "SLACK_CLIENT_SECRET",
  },
  facebook: {
    tokenUrl: "https://graph.facebook.com/v19.0/oauth/access_token",
    clientIdEnv: "FACEBOOK_CLIENT_ID",
    clientSecretEnv: "FACEBOOK_CLIENT_SECRET",
  },
};

async function exchangeTwitterToken(
  code: string,
  codeVerifier: string,
  redirectUri: string,
  clientId: string,
  clientSecret: string
) {
  const body = new URLSearchParams({
    code,
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Twitter token exchange failed:", errText);
    throw new Error(`Twitter token exchange failed: ${response.status} ${errText}`);
  }

  return response.json();
}

async function getTwitterUserHandle(accessToken: string): Promise<string> {
  const response = await fetch("https://api.twitter.com/2/users/me?user.fields=username,name", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Twitter user fetch failed:", errText);
    throw new Error(`Twitter user fetch failed: ${response.status}`);
  }

  const data = await response.json();
  return `@${data.data?.username || "unknown"}`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  try {
    const { userId: clerkId } = await auth();
    const resolvedParams = await params;

    if (!clerkId) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    const platform = resolvedParams.platform.toLowerCase();
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    const errorRedirect = new URL(`/accounts?error=oauth_failed`, baseUrl);

    if (error || !code) {
      console.error("OAuth error:", error || "No code provided");
      return NextResponse.redirect(errorRedirect);
    }

    const savedState = request.cookies.get(`oauth_state_${platform}`)?.value;

    if (!state || state !== savedState) {
      console.error("State mismatch or missing state cookie");
      return NextResponse.redirect(errorRedirect);
    }

    const tokenConfig = TOKEN_CONFIGS[platform];
    if (!tokenConfig) {
      console.error("Unsupported platform:", platform);
      return NextResponse.redirect(errorRedirect);
    }

    const clientId = process.env[tokenConfig.clientIdEnv];
    const clientSecret = process.env[tokenConfig.clientSecretEnv];

    if (!clientId || !clientSecret) {
      console.error(`Missing credentials for ${platform}`);
      return NextResponse.redirect(errorRedirect);
    }

    const redirectUri = `${baseUrl}/api/oauth/${platform}/callback`;

    let accessToken: string;
    let refreshToken: string | null = null;
    let accountHandle: string;
    let expiresAt: Date | null = null;

    if (platform === "twitter") {
      // Twitter uses PKCE - need code_verifier from cookie
      const codeVerifier = request.cookies.get(`oauth_verifier_twitter`)?.value;
      if (!codeVerifier) {
        console.error("Missing Twitter code verifier cookie");
        return NextResponse.redirect(errorRedirect);
      }

      const tokenData = await exchangeTwitterToken(
        code,
        codeVerifier,
        redirectUri,
        clientId,
        clientSecret
      );

      accessToken = tokenData.access_token;
      refreshToken = tokenData.refresh_token || null;

      if (tokenData.expires_in) {
        expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);
      }

      // Get the user's Twitter handle
      accountHandle = await getTwitterUserHandle(accessToken);

    } else {
      // Generic OAuth2 token exchange for other platforms
      const body = new URLSearchParams({
        code,
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      });

      const tokenResponse = await fetch(tokenConfig.tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!tokenResponse.ok) {
        const errText = await tokenResponse.text();
        console.error(`${platform} token exchange failed:`, errText);
        return NextResponse.redirect(errorRedirect);
      }

      const tokenData = await tokenResponse.json();
      accessToken = tokenData.access_token;
      refreshToken = tokenData.refresh_token || null;
      accountHandle = `${platform}_user`;

      if (tokenData.expires_in) {
        expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);
      }
    }

    // Get internal user id
    const userResult = await db.select().from(users).where(eq(users.clerkId, clerkId)).limit(1);
    if (!userResult.length) {
      console.error("User not found in db");
      return NextResponse.redirect(errorRedirect);
    }
    const internalUserId = userResult[0].id;

    // Validate platform enum
    if (!platformEnum.enumValues.includes(platform as any)) {
      console.error("Invalid platform:", platform);
      return NextResponse.redirect(errorRedirect);
    }

    // Remove existing account for this platform+user before inserting new one
    const existing = await db
      .select()
      .from(socialAccounts)
      .where(and(eq(socialAccounts.userId, internalUserId), eq(socialAccounts.platform, platform as any)));

    if (existing.length > 0) {
      await db.delete(socialAccounts).where(eq(socialAccounts.id, existing[0].id));
    }

    await db.insert(socialAccounts).values({
      userId: internalUserId,
      platform: platform as any,
      accessToken,
      refreshToken: refreshToken ?? undefined,
      accountHandle,
      expiresAt: expiresAt ?? undefined,
    });

    const successRedirect = new URL(`/accounts?success=connected`, baseUrl);
    const response = NextResponse.redirect(successRedirect);

    // Clear auth cookies
    response.cookies.delete(`oauth_state_${platform}`);
    response.cookies.delete(`oauth_verifier_${platform}`);

    return response;
  } catch (error) {
    console.error("OAuth callback error:", error);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    return NextResponse.redirect(new URL(`/accounts?error=internal_error`, baseUrl));
  }
}
