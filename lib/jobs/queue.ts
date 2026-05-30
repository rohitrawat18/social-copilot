import { Queue } from "bullmq";

export const TOKEN_REFRESHER_QUEUE = "token-refresher";

export const tokenRefresherQueue = new Queue(TOKEN_REFRESHER_QUEUE, {
  connection: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },
});
