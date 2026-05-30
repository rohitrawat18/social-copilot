import Link from "next/link";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for getting started and exploring the platform.",
    popular: false,
    cta: "Get Started Free",
    ctaHref: "/sign-up",
    ctaVariant: "outline" as const,
    features: [
      "3 Connected Accounts",
      "30 Scheduled Posts / month",
      "1 Auto-Reply Rule",
      "10 AI Captions / month",
      "Basic Analytics",
      "1 Team Member",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For serious creators who want to grow their audience fast.",
    popular: true,
    cta: "Upgrade to Pro",
    ctaHref: "/sign-up?plan=pro",
    ctaVariant: "primary" as const,
    features: [
      "10 Connected Accounts",
      "500 Scheduled Posts / month",
      "20 Auto-Reply Rules",
      "200 AI Captions / month",
      "Advanced Analytics",
      "3 Team Members",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    price: "$49",
    period: "/month",
    description: "For teams and agencies managing multiple clients at scale.",
    popular: false,
    cta: "Contact Sales",
    ctaHref: "/sign-up?plan=agency",
    ctaVariant: "outline" as const,
    features: [
      "Unlimited Accounts",
      "Unlimited Scheduled Posts",
      "Unlimited Auto-Reply Rules",
      "Unlimited AI Captions",
      "Advanced Analytics + CSV Export",
      "10 Team Members",
    ],
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-24 px-6 relative"
      style={{
        background: "rgba(0,0,0,0.3)",
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(124,58,237,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-violet-400 mb-3">
          Pricing
        </p>
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-white mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-center text-slate-400 text-lg max-w-xl mx-auto mb-16">
          Start free, upgrade when you&apos;re ready. No hidden fees, no
          surprises. Cancel anytime.
        </p>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.id}
              id={`pricing-card-${plan.id}`}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                plan.popular
                  ? "border-violet-500/60 bg-gradient-to-b from-violet-500/10 to-violet-500/3"
                  : "border-white/8 bg-white/2 hover:border-white/15"
              }`}
              style={
                plan.popular
                  ? {
                      boxShadow:
                        "0 0 60px rgba(124,58,237,0.2), 0 0 0 1px rgba(124,58,237,0.1) inset",
                    }
                  : undefined
              }
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30">
                    <Zap className="w-3 h-3 fill-white" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan name */}
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-slate-400 mb-2">
                {plan.name}
              </p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-1">
                <span
                  className="text-5xl font-extrabold text-white leading-none"
                  style={
                    plan.popular
                      ? {
                          background:
                            "linear-gradient(135deg, #fff 40%, #c4b5fd)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : undefined
                  }
                >
                  {plan.price}
                </span>
                <span className="text-slate-500 text-sm mb-1.5">
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.popular
                          ? "bg-violet-500/20"
                          : "bg-white/6"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          plan.popular ? "text-violet-400" : "text-slate-400"
                        }`}
                      />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.ctaHref}
                id={`pricing-cta-${plan.id}`}
                className={`block w-full text-center py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  plan.ctaVariant === "primary"
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                    : "border border-white/15 text-slate-300 hover:bg-white/5 hover:border-white/25"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-500 text-sm mt-10">
          All plans include a 14-day free trial. No credit card required.
          Powered by{" "}
          <span className="text-violet-400 font-medium">Clerk Billing</span>.
        </p>
      </div>
    </section>
  );
}
