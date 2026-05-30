"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "faq-1",
    question: "Which social platforms does SocialCopilot support?",
    answer:
      "SocialCopilot currently supports 9 platforms: Instagram, Facebook, YouTube, TikTok, LinkedIn, Pinterest, Twitter/X, Discord, and Slack. We're constantly adding new integrations based on user feedback. All platforms support posting and scheduling; Instagram, Facebook, YouTube, LinkedIn, Twitter/X, and Discord also support Auto-Reply.",
  },
  {
    id: "faq-2",
    question: "How does the AI caption generation work?",
    answer:
      "Our AI caption generator is powered by Google Gemini. Simply describe your post topic (or paste a URL), select your desired tone (Professional, Casual, Funny, Inspiring), and choose which platforms you're targeting. Gemini generates platform-optimized captions with relevant hashtags in seconds. You get 10 generations/month on Free, 200 on Pro, and unlimited on Agency.",
  },
  {
    id: "faq-3",
    question: "Can I cancel or change my plan at any time?",
    answer:
      "Absolutely. SocialCopilot uses Clerk Billing, which means you can upgrade, downgrade, or cancel your subscription at any time from the Billing page in your dashboard. There are no long-term contracts or cancellation fees. If you downgrade, you'll retain access to paid features until the end of your billing cycle.",
  },
  {
    id: "faq-4",
    question: "Is my social media account data safe?",
    answer:
      "Security is our top priority. OAuth tokens are stored encrypted in our NeonDB database. We never store your social platform passwords. All data is transmitted over HTTPS. We follow OAuth 2.0 best practices for every platform integration. You can revoke SocialCopilot's access to any connected account at any time from both our app and the platform itself.",
  },
  {
    id: "faq-5",
    question: "What happens if a scheduled post fails to publish?",
    answer:
      "Our BullMQ-based job system automatically retries failed posts up to 3 times with exponential backoff. If a post still fails, you'll receive an in-app notification and email alert with the specific error reason (e.g., expired token, API rate limit). Failed posts are clearly marked in your content calendar and can be rescheduled with one click.",
  },
  {
    id: "faq-6",
    question: "Does SocialCopilot offer a free trial for paid plans?",
    answer:
      "Yes! All paid plans include a 14-day free trial with no credit card required. You'll have full access to all Pro features during the trial period. If you decide to upgrade at the end of your trial, your scheduled posts and settings are preserved. Agency plan trials are also available — reach out to our sales team for custom pricing on large teams.",
  },
];

export function FAQSection() {
  return (
    <section
      id="faq"
      className="py-24 px-6"
      style={{
        background: "rgba(0,0,0,0.2)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-violet-400 mb-3">
          FAQ
        </p>
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-slate-400 text-lg mb-16">
          Can&apos;t find your answer?{" "}
          <a
            href="#"
            className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
          >
            Chat with our team
          </a>
          .
        </p>

        {/* Accordion */}
        <div id="faq-accordion">
          <Accordion
            className="space-y-3"
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                id={faq.id}
                className="rounded-xl border border-white/8 bg-white/2 hover:bg-white/3 transition-colors px-2 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-sm font-medium text-slate-200 hover:text-white py-5 px-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5">
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
