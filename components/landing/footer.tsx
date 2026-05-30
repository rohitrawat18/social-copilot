import Link from "next/link";
import { Zap } from "lucide-react";

// Social brand icons as SVG (lucide-react v1.17.0 doesn't include brand icons)
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  Support: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Status", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

const socialLinks = [
  { icon: XIcon, label: "Twitter / X", href: "#" },
  { icon: GithubIcon, label: "GitHub", href: "#" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { icon: YoutubeIcon, label: "YouTube", href: "#" },
];


export function LandingFooter() {
  return (
    <footer
      id="footer"
      className="border-t border-white/6"
      style={{
        background: "rgba(0,0,0,0.4)",
      }}
    >
      {/* CTA Banner */}
      <div className="py-16 px-6">
        <div
          className="max-w-4xl mx-auto rounded-3xl p-10 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(168,85,247,0.08) 100%)",
            border: "1px solid rgba(124,58,237,0.25)",
            boxShadow: "0 0 80px rgba(124,58,237,0.1)",
          }}
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to take control of your social presence?
            </h2>
            <p className="text-slate-400 mb-8 text-lg max-w-xl mx-auto">
              Join 12,000+ creators and teams already using SocialCopilot. Start
              free — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                id="footer-cta-primary"
                className="px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:from-violet-500 hover:to-purple-500 transition-all duration-200"
              >
                Start for Free →
              </Link>
              <Link
                href="/sign-in"
                id="footer-cta-signin"
                className="px-8 py-4 text-base font-medium text-slate-300 border border-white/15 rounded-xl hover:bg-white/5 hover:border-white/25 transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer links */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo + tagline */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-400 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-base font-bold bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                SocialCopilot
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              AI-powered social media management for modern creators and teams.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold tracking-[0.12em] uppercase text-slate-500 mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          © {new Date().getFullYear()} SocialCopilot. All rights reserved.
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                id={`footer-social-${social.label.toLowerCase().replace(/\s|\/|\./g, "-")}`}
                className="w-8 h-8 rounded-lg border border-white/8 bg-white/3 flex items-center justify-center text-slate-500 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
