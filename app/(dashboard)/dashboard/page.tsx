"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calendar,
  Users,
  Percent,
  ArrowUpRight,
  Plus,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface StatItem {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
}

const stats: StatItem[] = [
  {
    title: "Total Posts",
    value: "142",
    change: "+12% this week",
    trend: "up",
    icon: FileText,
  },
  {
    title: "Scheduled Posts",
    value: "18",
    change: "+3 new today",
    trend: "up",
    icon: Calendar,
  },
  {
    title: "Connected Accounts",
    value: "7",
    change: "+1 added recently",
    trend: "up",
    icon: Users,
  },
  {
    title: "Engagement Rate",
    value: "4.8%",
    change: "+0.3% vs last week",
    trend: "up",
    icon: Percent,
  },
];

interface RecentPost {
  id: string;
  title: string;
  platforms: string[];
  scheduledFor: string;
  status: "published" | "scheduled" | "failed";
}

const recentPosts: RecentPost[] = [
  {
    id: "1",
    title: "New product launch announcement! Exciting times ahead 🚀",
    platforms: ["Instagram", "LinkedIn"],
    scheduledFor: "2h ago",
    status: "published",
  },
  {
    id: "2",
    title: "Behind the scenes: How we built our automated comment watcher",
    platforms: ["YouTube", "TikTok"],
    scheduledFor: "Tomorrow at 9:00 AM",
    status: "scheduled",
  },
  {
    id: "3",
    title: "10 game-changing productivity tips for software developer creators",
    platforms: ["Twitter"],
    scheduledFor: "Yesterday",
    status: "published",
  },
  {
    id: "4",
    title: "Platform-wide community sync and feedback updates",
    platforms: ["Discord", "Slack"],
    scheduledFor: "Failed to publish",
    status: "failed",
  },
];

interface ConnectedAccount {
  name: string;
  handle: string;
  platform: string;
  avatarText: string;
  status: "active" | "error";
}

const connectedAccounts: ConnectedAccount[] = [
  {
    name: "Instagram Professional",
    handle: "@rohit.creates",
    platform: "Instagram",
    avatarText: "RC",
    status: "active",
  },
  {
    name: "YouTube Channel",
    handle: "Rohit Rawat YT",
    platform: "YouTube",
    avatarText: "RR",
    status: "active",
  },
  {
    name: "LinkedIn Professional",
    handle: "Rohit Rawat",
    platform: "LinkedIn",
    avatarText: "RR",
    status: "active",
  },
  {
    name: "Twitter / X Profile",
    handle: "@rohit_dev",
    platform: "Twitter",
    avatarText: "RD",
    status: "active",
  },
];

export default function DashboardOverviewPage() {
  const router = useRouter();

  const handleComposeClick = () => {
    router.push("/compose");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome / Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Welcome back, Rohit!
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your social campaigns today.
          </p>
        </div>
        <Button
          onClick={handleComposeClick}
          className="bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-md shadow-violet-500/10 transition-all duration-200 active:scale-95 gap-2 md:self-start"
        >
          <Plus className="h-4 w-4" />
          <span>New Post</span>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border border-border/60 dark:bg-zinc-900/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:border-violet-500/30 hover:shadow-md hover:shadow-violet-500/5 hover:-translate-y-1 group"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="p-2 rounded-xl bg-violet-600/5 text-violet-600 dark:text-violet-400 group-hover:bg-violet-600/10 transition-colors">
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <TrendingUp className="h-3 w-3" />
                <span>{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lists / Tables Layout */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Recent Activity Table */}
        <Card className="col-span-2 border-border/60 dark:bg-zinc-900/50 backdrop-blur-sm shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/40">
            <div>
              <CardTitle className="text-base font-bold">Recent Posts</CardTitle>
              <CardDescription>A list of your latest published or scheduled posts.</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/calendar")}
              className="text-xs border-border/80 text-muted-foreground hover:text-foreground font-semibold gap-1.5"
            >
              <span>View Calendar</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 hover:bg-muted/30 transition-colors duration-200"
                >
                  <div className="space-y-1.5 max-w-md">
                    <p className="text-sm font-semibold leading-tight text-foreground line-clamp-1">
                      {post.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>{post.scheduledFor}</span>
                      <span className="text-border">•</span>
                      <div className="flex gap-1.5">
                        {post.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="bg-accent px-1.5 py-0.5 rounded text-[10px] font-semibold text-muted-foreground border border-border/40"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 self-start sm:self-center">
                    {post.status === "published" && (
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/15 gap-1 font-semibold rounded-lg">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Published</span>
                      </Badge>
                    )}
                    {post.status === "scheduled" && (
                      <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/15 gap-1 font-semibold rounded-lg">
                        <Clock className="h-3 w-3" />
                        <span>Scheduled</span>
                      </Badge>
                    )}
                    {post.status === "failed" && (
                      <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500/15 gap-1 font-semibold rounded-lg">
                        <AlertCircle className="h-3 w-3" />
                        <span>Failed</span>
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Connected Accounts sidebar list */}
        <Card className="border-border/60 dark:bg-zinc-900/50 backdrop-blur-sm shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/40">
            <div>
              <CardTitle className="text-base font-bold">Connected Channels</CardTitle>
              <CardDescription>Active social accounts synced.</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/accounts")}
              className="text-xs border-border/80 text-muted-foreground hover:text-foreground font-semibold gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Connect</span>
            </Button>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {connectedAccounts.map((account) => (
              <div
                key={account.handle}
                className="flex items-center justify-between p-3 rounded-xl border border-border/40 bg-background/40 hover:border-violet-500/30 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-violet-600/5 flex items-center justify-center font-bold text-xs text-violet-600 dark:text-violet-400 group-hover:bg-violet-600/10 transition-colors">
                    {account.avatarText}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate text-foreground">
                      {account.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {account.handle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
