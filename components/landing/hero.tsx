"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";

const platforms = [
  { name: "Instagram", icon: "📸", color: "#E1306C" },
  { name: "YouTube", icon: "▶️", color: "#FF0000" },
  { name: "TikTok", icon: "🎵", color: "#000000" },
  { name: "LinkedIn", icon: "💼", color: "#0077B5" },
  { name: "Twitter / X", icon: "𝕏", color: "#1DA1F2" },
  { name: "Facebook", icon: "👍", color: "#1877F2" },
  { name: "Pinterest", icon: "📌", color: "#E60023" },
  { name: "Discord", icon: "💬", color: "#5865F2" },
  { name: "Slack", icon: "⚡", color: "#4A154B" },
];

export function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.18) 0%, transparent 60%)",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(124,58,237,0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pill-in {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-violet-300 border border-violet-500/30 bg-violet-500/5 mb-8"
          style={{
            animation: visible ? "badge-pulse 3s ease-in-out infinite, slide-up 0.6s ease-out forwards" : "none",
            opacity: 0,
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered Social Media Management
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6"
          style={{
            animation: visible ? "slide-up 0.7s 0.1s ease-out forwards" : "none",
            opacity: 0,
            background: "linear-gradient(135deg, #ffffff 30%, #c4b5fd 60%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Manage All Your Social
          <br />
          <span className="text-violet-300">Platforms</span> in One Place
        </h1>

        {/* Sub-headline */}
        <p
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{
            animation: visible ? "slide-up 0.7s 0.2s ease-out forwards" : "none",
            opacity: 0,
          }}
        >
          Create, schedule, and auto-engage across Instagram, YouTube, TikTok,
          LinkedIn, and 5 more — powered by Gemini AI. One composer, every
          platform, zero effort.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          style={{
            animation: visible ? "slide-up 0.7s 0.3s ease-out forwards" : "none",
            opacity: 0,
          }}
        >
          <Link
            href="/sign-up"
            id="hero-cta-primary"
            className="group flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:from-violet-500 hover:to-purple-500 transition-all duration-200"
          >
            Start for Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            id="hero-cta-demo"
            className="flex items-center gap-3 px-8 py-4 text-base font-medium text-slate-300 border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all duration-200"
          >
            <div className="w-7 h-7 rounded-full bg-violet-500/20 flex items-center justify-center">
              <Play className="w-3 h-3 text-violet-400 fill-violet-400 ml-0.5" />
            </div>
            Watch Demo
          </button>
        </div>

        {/* Platform pills */}
        <div
          className="flex flex-wrap items-center justify-center gap-3"
          style={{
            animation: visible ? "slide-up 0.7s 0.4s ease-out forwards" : "none",
            opacity: 0,
          }}
        >
          <span className="text-xs text-slate-500 font-medium mr-1">Works with:</span>
          {platforms.map((platform, i) => (
            <div
              key={platform.name}
              id={`platform-pill-${platform.name.toLowerCase().replace(/\s|\/|\./g, "-")}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-slate-400 border border-white/8 bg-white/3 hover:border-violet-500/40 hover:text-violet-300 hover:bg-violet-500/5 transition-all duration-200 cursor-default"
              style={{
                animation: visible
                  ? `pill-in 0.5s ${0.5 + i * 0.05}s ease-out forwards`
                  : "none",
                opacity: 0,
              }}
            >
              <span className="text-base leading-none">{platform.icon}</span>
              {platform.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
