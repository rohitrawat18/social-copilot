import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as dotenv from "dotenv";
import * as schema from "./lib/db/schema";
import { eq } from "drizzle-orm";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function syncUsers() {
  console.log("Fetching users from Clerk...");
  try {
    const res = await fetch("https://api.clerk.com/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`
      }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.statusText}`);
    }
    
    const clerkUsers = await res.json();
    console.log(`Found ${clerkUsers.length} users in Clerk.`);

    for (const user of clerkUsers) {
      const email = user.email_addresses?.[0]?.email_address || "";
      console.log(`Syncing user: ${email} (${user.id})`);

      await db.insert(schema.users).values({
        clerkId: user.id,
        email,
        plan: "free",
        aiUsageCount: 0,
      }).onConflictDoUpdate({
        target: schema.users.clerkId,
        set: { email },
      });
      console.log(`Successfully synced user: ${email}`);
    }
    console.log("All users synced successfully!");
  } catch (error) {
    console.error("Error syncing users:", error);
  }
}

syncUsers();
