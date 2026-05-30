"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Content Creator & YouTuber",
    handle: "@sarahcreates",
    avatarInitials: "SC",
    avatarColor: "from-pink-500 to-rose-600",
    stars: 5,
    quote:
      "SocialCopilot changed my workflow completely. I used to spend 3 hours every morning scheduling posts across 6 platforms. Now it takes 20 minutes, and the AI captions are actually better than what I was writing myself.",
    platform: "YouTube + Instagram",
  },
  {
    id: 2,
    name: "Marcus Webb",
    role: "Digital Marketing Lead",
    handle: "@marcuswebb",
    avatarInitials: "MW",
    avatarColor: "from-blue-500 to-indigo-600",
    stars: 5,
    quote:
      "The auto-reply feature alone is worth the Pro plan. Our engagement rate went up 40% in the first month because no comment goes unanswered. The Gemini AI replies are indistinguishable from human responses.",
    platform: "LinkedIn + Twitter/X",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Agency Owner — PixelPulse",
    handle: "@priyasharma",
    avatarInitials: "PS",
    avatarColor: "from-violet-500 to-purple-600",
    stars: 5,
    quote:
      "We manage 18 client accounts with a team of 4. Before SocialCopilot, we needed 10 people. The Agency plan's unlimited accounts and team collaboration features are a game-changer for our business model.",
    platform: "All 9 platforms",
  },
  {
    id: 4,
    name: "James Thornton",
    role: "E-commerce Brand Manager",
    handle: "@jamesthornton",
    avatarInitials: "JT",
    avatarColor: "from-emerald-500 to-teal-600",
    stars: 5,
    quote:
      "The analytics dashboard gives us a bird's-eye view across all platforms. We identified that our TikTok posts at 7pm get 3x more engagement — that insight alone paid for the subscription many times over.",
    platform: "TikTok + Facebook",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const testimonial = testimonials[current];

  return (
    <section
      id="testimonials"
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-violet-400 mb-3">
          Testimonials
        </p>
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-white mb-16">
          Loved by Creators & Teams
        </h2>

        {/* Carousel */}
        <div
          id="testimonials-carousel"
          className="relative rounded-3xl border border-white/8 bg-white/2 p-8 sm:p-12"
          style={{
            boxShadow: "0 0 80px rgba(124,58,237,0.08)",
          }}
        >
          {/* Quote */}
          <div className="text-5xl text-violet-500/30 font-serif leading-none mb-6 select-none">
            &ldquo;
          </div>

          <blockquote className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-8 min-h-[120px]">
            {testimonial.quote}
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center text-sm font-bold text-white shadow-lg`}
              >
                {testimonial.avatarInitials}
              </div>
              <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-slate-400">{testimonial.role}</p>
                <p className="text-xs text-violet-400 mt-0.5">
                  {testimonial.platform}
                </p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: testimonial.stars }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/6">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  id={`testimonial-dot-${i + 1}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === current
                      ? "w-6 bg-violet-500"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                id="testimonial-prev"
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/4 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="testimonial-next"
                onClick={next}
                aria-label="Next testimonial"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/4 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Social proof stats */}
        <div className="grid grid-cols-3 gap-6 mt-12">
          {[
            { value: "12,000+", label: "Active Users" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "98%", label: "Would Recommend" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
