import { pgTable, uuid, text, integer, timestamp, boolean, jsonb, pgEnum } from "drizzle-orm/pg-core";

// Enums
export const planEnum = pgEnum("plan", ["free", "pro", "agency"]);
export const platformEnum = pgEnum("platform", [
  "instagram",
  "youtube",
  "tiktok",
  "linkedin",
  "pinterest",
  "discord",
  "twitter",
  "slack",
  "facebook"
]);
export const postStatusEnum = pgEnum("post_status", ["draft", "scheduled", "published", "failed"]);
export const triggerTypeEnum = pgEnum("trigger_type", ["keyword", "ai"]);

// 1. Users Table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull(),
  plan: planEnum("plan").default("free").notNull(),
  aiUsageCount: integer("ai_usage_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// 2. Social Accounts Table
export const socialAccounts = pgTable("social_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  platform: platformEnum("platform").notNull(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  accountHandle: text("account_handle").notNull(),
  expiresAt: timestamp("expires_at")
});

// 3. Posts Table
export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content"),
  mediaUrls: jsonb("media_urls").default([]).notNull(),
  platforms: jsonb("platforms").default([]).notNull(),
  status: postStatusEnum("status").default("draft").notNull(),
  scheduledAt: timestamp("scheduled_at"),
  publishedAt: timestamp("published_at")
});

// 4. Post Platform Results Table
export const postPlatformResults = pgTable("post_platform_results", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id")
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
  platform: platformEnum("platform").notNull(),
  platformPostId: text("platform_post_id"),
  status: text("status").notNull(), // e.g. success, failed, pending
  error: text("error")
});

// 5. Auto Reply Rules Table
export const autoReplyRules = pgTable("auto_reply_rules", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  platform: platformEnum("platform").notNull(),
  accountId: uuid("account_id")
    .references(() => socialAccounts.id, { onDelete: "cascade" })
    .notNull(),
  triggerType: triggerTypeEnum("trigger_type").notNull(),
  keywords: jsonb("keywords").default([]).notNull(),
  replyTemplate: text("reply_template"),
  aiPrompt: text("ai_prompt"),
  isActive: boolean("is_active").default(true).notNull()
});

// 6. Comment Logs Table
export const commentLogs = pgTable("comment_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  ruleId: uuid("rule_id")
    .references(() => autoReplyRules.id, { onDelete: "cascade" })
    .notNull(),
  commentId: text("comment_id").notNull(),
  commentText: text("comment_text").notNull(),
  replyText: text("reply_text").notNull(),
  repliedAt: timestamp("replied_at").defaultNow().notNull()
});

// 7. Media Assets Table
export const mediaAssets = pgTable("media_assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  imagekitFileId: text("imagekit_file_id").notNull(),
  url: text("url").notNull(),
  type: text("type").notNull(), // e.g. image, video
  size: integer("size").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
