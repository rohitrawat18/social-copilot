"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@base-ui/react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#", label: "Blog" },
  { href: "#", label: "Docs" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
const {isSignedIn}=useUser();
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#07070f]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" id="nav-logo">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-400 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
            SocialCopilot
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!isSignedIn ?<>
          <Link
            href="/sign-in"
            id="nav-sign-in"
            className="px-4 py-2 text-sm font-medium text-violet-300 border border-violet-500/50 rounded-lg hover:bg-violet-500/10 transition-all duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            id="nav-get-started"
            className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200"
          >
            Get Started Free
          </Link>
          </>:
          <Link href="/dashboard">
            <Button className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200">
              Dashboard
            </Button>
          </Link>
}
        </div>

        {/* Mobile Menu Button */}
        <button
          id="nav-mobile-menu"
          className="md:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f0f1e]/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              {!isSignedIn ? <>
              <Link
                href="/sign-in"
                className="text-center px-4 py-2.5 text-sm font-medium text-violet-300 border border-violet-500/50 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="text-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                Get Started Free
              </Link>
            </>
            : <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                <Button className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200">
                  Dashboard
                </Button>
              </Link>
              }  
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
