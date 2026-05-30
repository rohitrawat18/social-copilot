import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { socialAccounts, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ accountId: string }> }
) {
  try {
    const { userId: clerkId } = await auth();
    const resolvedParams = await params;
    
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { accountId } = resolvedParams;

    if (!accountId) {
      return NextResponse.json({ error: "Account ID is required" }, { status: 400 });
    }

    // Get internal user id
    const userResult = await db.select().from(users).where(eq(users.clerkId, clerkId)).limit(1);
    if (!userResult.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const internalUserId = userResult[0].id;

    // Fetch the account to make sure it belongs to the user
    const account = await db.select().from(socialAccounts).where(eq(socialAccounts.id, accountId)).limit(1);
    
    if (!account.length || account[0].userId !== internalUserId) {
      return NextResponse.json({ error: "Account not found or unauthorized" }, { status: 404 });
    }

    // Delete the account
    await db.delete(socialAccounts).where(eq(socialAccounts.id, accountId));

    // NOTE: In a complete implementation, you would also call the platform's API to revoke the token

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error disconnecting account:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
