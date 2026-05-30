import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred during signature verification", {
      status: 400,
    });
  }

  // Handle the event
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses } = evt.data;
    const email = email_addresses?.[0]?.email_address || "";

    if (!id) {
      return new Response("Error occurred -- missing user ID in payload", {
        status: 400,
      });
    }

    try {
      await db.insert(users).values({
        clerkId: id,
        email,
        plan: "free",
        aiUsageCount: 0,
      }).onConflictDoUpdate({
        target: users.clerkId,
        set: { email },
      });
      return new Response("User successfully synchronized in DB", { status: 201 });
    } catch (dbError) {
      console.error("Database error synchronizing user:", dbError);
      return new Response("Database synchronization failed", { status: 500 });
    }
  }

  if (eventType === "session.created") {
    const { user_id } = evt.data;
    if (!user_id) {
      return new Response("Error occurred -- missing user ID in payload", {
        status: 400,
      });
    }
    
    // We need to fetch the user's email from Clerk to insert them if they don't exist
    try {
      // First check if they already exist to avoid unnecessary API calls
      const existingUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.clerkId, user_id),
      });

      if (!existingUser) {
        // Import clerkClient dynamically to avoid top-level issues if not needed
        const { clerkClient } = await import("@clerk/nextjs/server");
        
        // Next.js Clerk SDK v5+ uses an async await clerkClient() pattern in some cases,
        // but typically it's an object. Let's use the standard method.
        const client = await clerkClient();
        const clerkUser = await client.users.getUser(user_id);
        const email = clerkUser.emailAddresses[0]?.emailAddress || "";

        await db.insert(users).values({
          clerkId: user_id,
          email,
          plan: "free",
          aiUsageCount: 0,
        }).onConflictDoNothing();
      }
      return new Response("Session created and user synced", { status: 200 });
    } catch (dbError) {
      console.error("Database error synchronizing user on session.created:", dbError);
      return new Response("Database synchronization failed", { status: 500 });
    }
  }

  return new Response("Webhook received and processed", { status: 200 });
}
