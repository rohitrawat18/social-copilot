import { Link2, PenSquare, Zap } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Connect Accounts",
    description:
      "Link all your social media accounts in minutes using secure OAuth. Instagram, YouTube, TikTok, LinkedIn, Twitter/X, Facebook, Pinterest, Discord, and Slack.",
    highlight: "9 platforms supported",
    color: "violet",
    gradient: "from-violet-600 to-purple-700",
    glow: "rgba(124,58,237,0.3)",
  },
  {
    number: "02",
    icon: PenSquare,
    title: "Compose & Schedule",
    description:
      "Write your post once in the unified composer. Let Gemini AI generate the caption, pick your platforms, set a schedule, and hit publish.",
    highlight: "AI-assisted writing",
    color: "blue",
    gradient: "from-blue-600 to-indigo-700",
    glow: "rgba(59,130,246,0.3)",
  },
  {
    number: "03",
    icon: Zap,
    title: "Engage Automatically",
    description:
      "Auto-reply rules kick in the moment comments arrive. Keyword matching or Gemini AI crafts natural, contextual replies — your audience stays engaged 24/7.",
    highlight: "Zero manual effort",
    color: "emerald",
    gradient: "from-emerald-600 to-teal-700",
    glow: "rgba(16,185,129,0.3)",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-6 relative"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, rgba(124,58,237,0.03) 50%, transparent 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-violet-400 mb-3">
          How It Works
        </p>
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-white mb-4">
          Up and Running in Minutes
        </h2>
        <p className="text-center text-slate-400 text-lg max-w-xl mx-auto mb-20">
          Three simple steps to transform how you manage social media — from
          content creation to automated engagement.
        </p>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="absolute top-16 left-1/2 -translate-x-1/2 hidden lg:block"
            aria-hidden="true"
            style={{
              width: "calc(66.666% + 2px)",
              height: "2px",
              background:
                "linear-gradient(90deg, rgba(124,58,237,0.5), rgba(59,130,246,0.5), rgba(16,185,129,0.5))",
              top: "2rem",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  id={`step-${i + 1}`}
                  className="relative flex flex-col items-center text-center lg:items-center"
                >
                  {/* Step circle */}
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl z-10 relative`}
                      style={{
                        boxShadow: `0 0 30px ${step.glow}`,
                      }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#07070f] border border-white/10 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-slate-400">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-sm">
                    {step.description}
                  </p>

                  {/* Highlight badge */}
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                      color:
                        step.color === "violet"
                          ? "#c4b5fd"
                          : step.color === "blue"
                          ? "#93c5fd"
                          : "#6ee7b7",
                      borderColor:
                        step.color === "violet"
                          ? "rgba(139,92,246,0.3)"
                          : step.color === "blue"
                          ? "rgba(59,130,246,0.3)"
                          : "rgba(16,185,129,0.3)",
                      background:
                        step.color === "violet"
                          ? "rgba(124,58,237,0.1)"
                          : step.color === "blue"
                          ? "rgba(59,130,246,0.1)"
                          : "rgba(16,185,129,0.1)",
                    }}
                  >
                    ✓ {step.highlight}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
