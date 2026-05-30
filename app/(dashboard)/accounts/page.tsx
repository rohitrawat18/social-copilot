"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link2, AlertCircle, RefreshCw, Unplug, Plus, Music2 } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const SUPPORTED_PLATFORMS = [
  { id: "instagram", name: "Instagram", icon: <InstagramIcon className="w-6 h-6" />, color: "bg-pink-600/10 text-pink-600" },
  { id: "facebook", name: "Facebook", icon: <FacebookIcon className="w-6 h-6" />, color: "bg-blue-600/10 text-blue-600" },
  { id: "twitter", name: "Twitter / X", icon: <TwitterIcon className="w-6 h-6" />, color: "bg-blue-400/10 text-blue-400" },
  { id: "youtube", name: "YouTube", icon: <YoutubeIcon className="w-6 h-6" />, color: "bg-red-600/10 text-red-600" },
  { id: "tiktok", name: "TikTok", icon: <Music2 className="w-6 h-6" />, color: "bg-stone-600/10 text-stone-600 dark:bg-stone-300/10 dark:text-stone-300" },
  { id: "linkedin", name: "LinkedIn", icon: <LinkedinIcon className="w-6 h-6" />, color: "bg-blue-800/10 text-blue-800" },
];

interface Account {
  id: string;
  platform: string;
  accountHandle: string;
  expiresAt: string | null;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch("/api/accounts");
        if (res.ok) {
          const data = await res.json();
          setAccounts(data.accounts);
        }
      } catch (error) {
        console.error("Failed to fetch accounts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    const success = searchParams.get("success");
    const error = searchParams.get("error");
    if (success === "connected") {
      toast.success("Account connected successfully!");
    } else if (error) {
      toast.error(`Connection failed: ${error}`);
    }
  }, [searchParams]);

  const handleConnect = (platform: string) => {
    window.location.href = `/api/oauth/${platform}/connect`;
  };

  const handleDisconnect = async (accountId: string, platformName: string) => {
    if (!confirm(`Are you sure you want to disconnect ${platformName}?`)) return;
    
    try {
      const res = await fetch(`/api/accounts/${accountId}`, { method: "DELETE" });
      if (res.ok) {
        setAccounts((prev) => prev.filter((a) => a.id !== accountId));
        toast.success(`${platformName} disconnected.`);
      } else {
        toast.error(`Failed to disconnect ${platformName}.`);
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  const isExpiringSoon = (dateString: string | null) => {
    if (!dateString) return false;
    const expiry = new Date(dateString);
    const in7Days = new Date();
    in7Days.setDate(in7Days.getDate() + 7);
    return expiry < in7Days;
  };

  if (loading) {
    return <div className="p-8">Loading accounts...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Connected Accounts</h2>
        <p className="text-muted-foreground">Manage your linked social media channels.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SUPPORTED_PLATFORMS.map((platform) => {
          const connectedAccount = accounts.find((a) => a.platform === platform.id);
          const expiring = connectedAccount ? isExpiringSoon(connectedAccount.expiresAt) : false;

          return (
            <Card key={platform.id} className="border-border/60 flex flex-col transition-all hover:border-border">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className={`p-3 rounded-xl ${platform.color} text-xl flex items-center justify-center w-12 h-12`}>
                  {platform.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{platform.name}</CardTitle>
                  <CardDescription>
                    {connectedAccount ? (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 mt-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Connected
                      </span>
                    ) : (
                      <span className="text-muted-foreground mt-1 block">Not connected</span>
                    )}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pb-2">
                {connectedAccount ? (
                  <div className="space-y-3 mt-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Handle</p>
                      <p className="font-semibold">@{connectedAccount.accountHandle}</p>
                    </div>
                    {expiring && (
                      <div className="flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-500/10 p-2 rounded-md">
                        <AlertCircle className="w-4 h-4" />
                        Token expiring soon!
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-2">
                    Connect your {platform.name} account to schedule posts and enable AI auto-replies.
                  </p>
                )}
              </CardContent>
              <CardFooter className="pt-4 border-t border-border/40 mt-auto flex gap-2">
                {connectedAccount ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleConnect(platform.id)}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reconnect
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="flex-none px-3"
                      onClick={() => handleDisconnect(connectedAccount.id, platform.name)}
                      title="Disconnect"
                    >
                      <Unplug className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button 
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white" 
                    onClick={() => handleConnect(platform.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Connect {platform.name}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
