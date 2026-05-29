"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Billing & Subscriptions</h2>
        <p className="text-muted-foreground">Manage your creator plan and invoices.</p>
      </div>
      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-600/5 text-violet-600">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Clerk Billing Integration</CardTitle>
            <CardDescription>Upgrade your creator level dynamically.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">The billing panel is being initialized. Secure subscription levels (Free → Pro → Agency) are managed via Clerk Billing.</p>
        </CardContent>
      </Card>
    </div>
  );
}
