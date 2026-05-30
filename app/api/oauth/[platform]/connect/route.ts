import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import crypto from "crypto";

const PLATFORM_OAUTH_CONFIGS: Record<string, {
  authUrl: string;
  clientIdEnv: string;
  scopes: string[];
}> = {
  instagram: {
    authUrl: "https://api.instagram.com/oauth/authorize",
    clientIdEnv: "INSTAGRAM_CLIENT_ID",
    scopes: ["instagram_basic", "pages_manage_posts", "instagram_manage_comments"],
  },
  twitter: {
    authUrl: "https://twitter.com/i/oauth2/authorize",
    clientIdEnv: "TWITTER_CLIENT_ID",
    scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"],
  },
  youtube: {
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    clientIdEnv: "YOUTUBE_CLIENT_ID",
    scopes: ["https://www.googleapis.com/auth/youtube.upload", "https://www.googleapis.com/auth/youtube.force-ssl"],
  },
  tiktok: {
    authUrl: "https://www.tiktok.com/v2/auth/authorize/",
    clientIdEnv: "TIKTOK_CLIENT_KEY",
    scopes: ["video.upload", "user.info.basic"],
  },
  linkedin: {
    authUrl: "https://www.linkedin.com/oauth/v2/authorization",
    clientIdEnv: "LINKEDIN_CLIENT_ID",
    scopes: ["w_member_social", "r_basicprofile"],
  },
  pinterest: {
    authUrl: "https://www.pinterest.com/oauth/",
    clientIdEnv: "PINTEREST_CLIENT_ID",
    scopes: ["boards:read", "pins:write"],
  },
  discord: {
    authUrl: "https://discord.com/oauth2/authorize",
    clientIdEnv: "DISCORD_CLIENT_ID",
    scopes: ["bot", "messages.read"],
  },
  slack: {
    authUrl: "https://slack.com/oauth/v2/authorize",
    clientIdEnv: "SLACK_CLIENT_ID",
    scopes: ["chat:write", "channels:read"],
  },
  facebook: {
    authUrl: "https://www.facebook.com/v19.0/dialog/oauth",
    clientIdEnv: "FACEBOOK_CLIENT_ID",
    scopes: ["pages_manage_posts", "pages_read_engagement", "pages_show_list"]
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  try {
    const { userId } = await auth();
    const resolvedParams = await params;
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const platform = resolvedParams.platform.toLowerCase();
    const config = PLATFORM_OAUTH_CONFIGS[platform];

    if (!config) {
      return NextResponse.json({ error: "Unsupported platform" }, { status: 400 });
    }

    const clientId = process.env[config.clientIdEnv];
    
    if (!clientId) {
      console.error(`Missing client ID for ${platform}`);
      return NextResponse.json({ error: `OAuth not configured for ${platform}` }, { status: 500 });
    }

    // Generate state to prevent CSRF
    const state = crypto.randomBytes(32).toString("hex");
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    const redirectUri = `${baseUrl}/api/oauth/${platform}/callback`;

    const authUrl = new URL(config.authUrl);
    authUrl.searchParams.append("client_id", clientId);
    authUrl.searchParams.append("redirect_uri", redirectUri);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", config.scopes.join(" "));
    authUrl.searchParams.append("state", state);

    // Platform specific overrides
    if (platform === "twitter") {
      // Twitter requires code_challenge for PKCE
      const codeVerifier = crypto.randomBytes(32).toString("base64url");
      const codeChallenge = crypto
        .createHash("sha256")
        .update(codeVerifier)
        .digest("base64url");
      
      authUrl.searchParams.append("code_challenge", codeChallenge);
      authUrl.searchParams.append("code_challenge_method", "S256");
      
      // Store both state and verifier in cookie
      const response = NextResponse.redirect(authUrl.toString());
      response.cookies.set(`oauth_state_${platform}`, state, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 10 });
      response.cookies.set(`oauth_verifier_${platform}`, codeVerifier, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 10 });
      return response;
    }

    const response = NextResponse.redirect(authUrl.toString());
    response.cookies.set(`oauth_state_${platform}`, state, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 60 * 10,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error("OAuth connect error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
