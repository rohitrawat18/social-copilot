"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2 } from "lucide-react";

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Connected Accounts</h2>
        <p className="text-muted-foreground">Manage your linked social media channels.</p>
      </div>
      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-600/5 text-violet-600">
            <Link2 className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Social Accounts</CardTitle>
            <CardDescription>Authorize platform connections securely.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Accounts setup is being initialized. Connect your Instagram, YouTube, TikTok, LinkedIn, or Twitter/X profiles.</p>
        </CardContent>
      </Card>
    </div>
  );
}
