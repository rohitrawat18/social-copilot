"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Engagement Analytics</h2>
        <p className="text-muted-foreground">Monitor statistics and audience growth trends.</p>
      </div>
      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-600/5 text-violet-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Platform Metrics</CardTitle>
            <CardDescription>Track conversions, impressions, and performance charts.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">The analytics charts are being initialized. Analyze platform stats using recharts components.</p>
        </CardContent>
      </Card>
    </div>
  );
}
