import type { Metadata } from "next";
import { LandingNav } from "@/components/landing/nav";
import { HeroSection } from "@/components/landing/hero";
import { FeaturesSection } from "@/components/landing/features";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { PricingSection } from "@/components/landing/pricing";
import { TestimonialsSection } from "@/components/landing/testimonials";
import { FAQSection } from "@/components/landing/faq";
import { LandingFooter } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "SocialCopilot — AI-Powered Social Media Management",
  description:
    "Create, schedule, and auto-engage across Instagram, YouTube, TikTok, LinkedIn, and 5 more — powered by Gemini AI. Manage all your social platforms in one place.",
  keywords: [
    "social media management",
    "AI social media",
    "post scheduler",
    "auto reply",
    "social media analytics",
  ],
  openGraph: {
    title: "SocialCopilot — AI-Powered Social Media Management",
    description:
      "Create, schedule, and auto-engage across Instagram, YouTube, TikTok, LinkedIn, and 5 more — powered by Gemini AI.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#07070f] text-white overflow-x-hidden">
      <LandingNav />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <LandingFooter />
    </div>
  );
}