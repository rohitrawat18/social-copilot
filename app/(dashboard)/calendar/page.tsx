"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Content Calendar</h2>
        <p className="text-muted-foreground">Plan and organize your publishing schedule visually.</p>
      </div>
      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-600/5 text-violet-600">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Schedule Calendar</CardTitle>
            <CardDescription>Drag and drop scheduled posts to reorganize.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">The calendar visual dashboard is being initialized. Track your multi-platform post timeline efficiently.</p>
        </CardContent>
      </Card>
    </div>
  );
}
