import { Worker, Job } from "bullmq";
import { db } from "../db";
import { socialAccounts } from "../db/schema";
import { lt } from "drizzle-orm";
import { TOKEN_REFRESHER_QUEUE } from "./queue";

export const worker = new Worker(
  TOKEN_REFRESHER_QUEUE,
  async (job: Job) => {
    console.log(`Starting token refresh job ${job.id}`);
    
    // Find accounts where expiresAt is less than 7 days from now
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    try {
      const accountsToRefresh = await db
        .select()
        .from(socialAccounts)
        .where(lt(socialAccounts.expiresAt, sevenDaysFromNow));

      console.log(`Found ${accountsToRefresh.length} accounts to refresh.`);

      for (const account of accountsToRefresh) {
        try {
          console.log(`Refreshing token for account ${account.id} on ${account.platform}`);
          
          // TODO: Call platform-specific refresh token endpoint here
          // Example:
          // const res = await fetch('...', { method: 'POST', body: ... });
          // const newTokens = await res.json();
          
          // Simulated delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // Update db with new tokens
          // await db.update(socialAccounts).set({ 
          //   accessToken: newTokens.access_token, 
          //   expiresAt: new Date(Date.now() + newTokens.expires_in * 1000) 
          // }).where(eq(socialAccounts.id, account.id));

          console.log(`Successfully refreshed token for account ${account.id}`);
        } catch (error) {
          console.error(`Failed to refresh token for account ${account.id}:`, error);
        }
      }

      console.log(`Completed token refresh job ${job.id}`);
    } catch (error) {
      console.error("Error querying accounts to refresh:", error);
      throw error;
    }
  },
  { 
    connection: { 
      url: process.env.REDIS_URL || "redis://localhost:6379" 
    } 
  }
);

worker.on("completed", (job) => {
  console.log(`${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
  console.error(`${job?.id} has failed with ${err.message}`);
});

console.log("Token Refresher Worker started.");
