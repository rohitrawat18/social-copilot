"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function AutoReplyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Auto-Reply Rules</h2>
        <p className="text-muted-foreground">Automate comment replies using AI or custom keywords.</p>
      </div>
      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-600/5 text-violet-600">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Reply Automations</CardTitle>
            <CardDescription>Setup rules and templates for incoming interactions.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Auto-reply rule settings are being initialized. Define keyword matchers and AI-driven prompt guidelines to keep users engaged.</p>
        </CardContent>
      </Card>
    </div>
  );
}
