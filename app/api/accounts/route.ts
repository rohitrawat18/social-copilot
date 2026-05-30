import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { socialAccounts, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const { userId: clerkId } = await auth();
    
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userResult = await db.select().from(users).where(eq(users.clerkId, clerkId)).limit(1);
    if (!userResult.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const internalUserId = userResult[0].id;

    const accounts = await db.select().from(socialAccounts).where(eq(socialAccounts.userId, internalUserId));

    return NextResponse.json({ accounts });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
