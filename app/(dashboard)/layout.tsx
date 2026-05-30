"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Link2,
  PenSquare,
  Calendar as CalendarIcon,
  MessageSquare,
  TrendingUp,
  CreditCard,
  Settings,
  Plus,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: SidebarItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Accounts", href: "/accounts", icon: Link2 },
  { name: "Compose", href: "/compose", icon: PenSquare },
  { name: "Calendar", href: "/calendar", icon: CalendarIcon },
  { name: "Auto-Reply", href: "/auto-reply", icon: MessageSquare },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNewPostClick = () => {
    router.push("/compose");
    setMobileOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-border bg-sidebar text-sidebar-foreground transition-colors duration-300">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-sidebar-border gap-2">
            <Sparkles className="h-6 w-6 text-violet-500 animate-pulse" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              SocialCopilot
            </span>
          </div>

          {/* New Post Button (Below Logo) */}
          <div className="px-4 py-4 border-b border-sidebar-border">
            <Button
              onClick={handleNewPostClick}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-md shadow-violet-500/20 transition-all duration-200 active:scale-95 group gap-2"
            >
              <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
              <span>Add New Post</span>
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group gap-3 ${
                    isActive
                      ? "bg-violet-600/10 text-violet-600 dark:text-violet-400 font-semibold"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 transition-colors ${
                      isActive
                        ? "text-violet-600 dark:text-violet-400"
                        : "text-muted-foreground group-hover:text-accent-foreground"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile Pill at Bottom */}
          <div className="flex-shrink-0 p-4 border-t border-sidebar-border bg-sidebar-accent/30">
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl border border-transparent hover:border-sidebar-border hover:bg-sidebar-accent transition-all duration-200">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 border border-violet-500/30",
                  },
                }}
              />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-semibold truncate text-foreground">
                  {isLoaded && user ? user.fullName || "Rohit Rawat" : "Loading..."}
                </span>
                <span className="text-[10px] text-violet-600 dark:text-violet-400 font-bold tracking-wide uppercase">
                  Pro Creator
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer (Overlay) */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
        />
      )}

      {/* Mobile Sidebar Content */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-border transition-transform duration-300 ease-in-out md:hidden flex ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-violet-500" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              SocialCopilot
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 rounded-lg"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* New Post Button */}
        <div className="px-4 py-4 border-b border-sidebar-border">
          <Button
            onClick={handleNewPostClick}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-md transition-all active:scale-95 gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Post</span>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 gap-3 ${
                  isActive
                    ? "bg-violet-600/10 text-violet-600 dark:text-violet-400 font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User profile at bottom */}
        <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/30">
          <div className="flex items-center gap-3">
            <UserButton />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold truncate">
                {isLoaded && user ? user.fullName || "Rohit Rawat" : "Loading..."}
              </span>
              <span className="text-[10px] text-violet-500 font-bold uppercase">
                Pro Creator
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 md:pl-64 min-w-0">
        {/* Topbar / Header */}
        <header className="flex items-center justify-between h-16 px-6 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 transition-colors duration-300">
          {/* Left Side: Mobile Menu Button & Page Title */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-9 h-9 rounded-lg border border-border"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>
            <h1 className="text-lg font-bold tracking-tight capitalize">
              {pathname === "/dashboard" ? "Overview" : pathname?.replace("/", "") || "Dashboard"}
            </h1>
          </div>

          {/* Right Side: Header Actions & Theme Toggle */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle (Light / Dark Switch) */}
            <div className="flex items-center gap-2 px-3 py-1 bg-accent/40 rounded-xl border border-border">
              <span className="text-xs font-semibold text-muted-foreground hidden sm:inline-block">Theme:</span>
              <ThemeToggle />
            </div>

            {/* Clerk User Profile */}
            <div className="md:hidden">
              <UserButton />
            </div>
          </div>
        </header>

        {/* Main Content Scroll Container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-background/50 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
