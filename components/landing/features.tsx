"use client";

import {
  PenLine,
  CalendarDays,
  Sparkles,
  MessageCircleReply,
  BarChart3,
  Image,
} from "lucide-react";


const features = [
  {
    icon: PenLine,
    title: "Unified Composer",
    description:
      "Write once, publish everywhere. Craft your content once and distribute it across all 9 platforms simultaneously with platform-specific previews.",
    gradient: "from-violet-500 to-purple-600",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    icon: CalendarDays,
    title: "Smart Scheduling",
    description:
      "Visual calendar with drag-and-drop rescheduling, optimal posting time suggestions powered by engagement data, and BullMQ-backed reliable delivery.",
    gradient: "from-blue-500 to-indigo-600",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    icon: Sparkles,
    title: "AI Captions",
    description:
      "Gemini AI generates platform-optimized captions with relevant hashtags in seconds. Choose tone, style, and length — then publish with one click.",
    gradient: "from-fuchsia-500 to-pink-600",
    glow: "rgba(217,70,239,0.15)",
  },
  {
    icon: MessageCircleReply,
    title: "Auto-Reply",
    description:
      "Keyword or AI-based auto-replies keep your audience engaged 24/7. Set rules once — Gemini handles contextual, human-like responses automatically.",
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Track engagement, reach, and growth across all platforms in one unified dashboard. Visualize trends with recharts, export CSV, and act on insights.",
    gradient: "from-orange-500 to-amber-600",
    glow: "rgba(249,115,22,0.15)",
  },
  {
    icon: Image,
    title: "Media Hub",
    description:
      "Upload, transform, and manage all your media assets with ImageKit CDN. Auto-crop, background removal, format conversion — no Photoshop needed.",
    gradient: "from-rose-500 to-red-600",
    glow: "rgba(244,63,94,0.15)",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 relative">
      {/* Section background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section label */}
        <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-violet-400 mb-3">
          Features
        </p>
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-white mb-4">
          Everything You Need to Grow
        </h2>
        <p className="text-center text-slate-400 text-lg max-w-xl mx-auto mb-16">
          A complete toolkit for social media managers, creators, and agencies —
          powered by AI from end to end.
        </p>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                id={`feature-card-${i + 1}`}
                className="group relative rounded-2xl p-6 border border-white/6 bg-white/2 hover:bg-white/4 hover:border-white/12 transition-all duration-300 cursor-default overflow-hidden"
                style={{
                  boxShadow: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${feature.glow}, 0 1px 0 rgba(255,255,255,0.05) inset`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Card glow top edge */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${feature.glow.replace("0.15", "0.5")}, transparent)`,
                  }}
                />

                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-base font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
