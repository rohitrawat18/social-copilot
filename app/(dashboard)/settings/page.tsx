"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Adjust your profile and application preferences.</p>
      </div>
      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-600/5 text-violet-600">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Configure credentials and notifications.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">The settings page is being initialized. You can configure credentials for your Meta, TikTok, and Twitter integration.</p>
        </CardContent>
      </Card>
    </div>
  );
}
