"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PenSquare } from "lucide-react";

export default function ComposePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create Post</h2>
        <p className="text-muted-foreground">Draft and schedule your content across multiple platforms.</p>
      </div>
      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-600/5 text-violet-600">
            <PenSquare className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Post Composer</CardTitle>
            <CardDescription>Configure accounts and draft your message.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Composer interface is being initialized. You can select channels, upload media via ImageKit, and use Gemini AI for writing captions.</p>
        </CardContent>
      </Card>
    </div>
  );
}
