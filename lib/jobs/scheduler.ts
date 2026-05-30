import { tokenRefresherQueue } from "./queue";

async function scheduleJobs() {
  console.log("Adding repeatable token refresh job...");
  
  await tokenRefresherQueue.add(
    "refresh-tokens",
    {},
    {
      repeat: {
        pattern: "0 0 * * *", // Run daily at midnight
      },
      jobId: "daily-token-refresh", // Prevent duplicates
    }
  );

  console.log("Repeatable job scheduled.");
  process.exit(0);
}

scheduleJobs().catch((error) => {
  console.error("Failed to schedule jobs:", error);
  process.exit(1);
});
