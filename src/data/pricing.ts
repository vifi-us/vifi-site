export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  includedMinutes: number;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "For solo operators who need every call covered.",
    includedMinutes: 100,
    features: [
      "100 AI minutes + 100 texts included",
      "Post-call summaries & transcripts",
      "Caller memory",
      "Knowledge base",
      "Custom greeting & instructions",
    ],
    cta: "Start free — no card",
  },
  {
    name: "Growth",
    price: "$149",
    period: "/mo",
    description: "For busy teams that need room to grow.",
    includedMinutes: 500,
    features: [
      "500 AI minutes + 500 texts included",
      "Everything in Starter",
      "Lower overage rates",
    ],
    cta: "Start free — no card",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Business",
    price: "$349",
    period: "/mo",
    description: "For high-volume businesses where every call counts.",
    includedMinutes: 2000,
    features: [
      "2,000 AI minutes + 2,000 texts included",
      "Everything in Growth",
      "Our lowest overage rates",
    ],
    cta: "Start free — no card",
  },
];

// Overage rates - not shown on the pricing page but available for
// internal reference and other surfaces (e.g. docs, terms)
export interface OverageRate {
  tier: string;
  ratePerMinute: number;
  ratePerSmsSegment: number;
}

export const overageRates: OverageRate[] = [
  { tier: "Starter", ratePerMinute: 0.15, ratePerSmsSegment: 0.03 },
  { tier: "Growth", ratePerMinute: 0.12, ratePerSmsSegment: 0.03 },
  { tier: "Business", ratePerMinute: 0.1, ratePerSmsSegment: 0.02 },
];

export interface PricingFAQ {
  question: string;
  answer: string;
}

export const pricingFAQs: PricingFAQ[] = [
  {
    question: "What are AI minutes?",
    answer:
      "AI minutes measure the time ViFi spends actively on your calls. Each plan includes a set number per month. If you need more, you can add minutes at a per-minute rate based on your plan.",
  },
  {
    question: "What happens if I use all my included minutes?",
    answer:
      "By default, ViFi keeps answering — additional minutes are billed at an overage rate based on your plan. You can also set usage alerts or a hard spending limit from your dashboard.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. Upgrade anytime from your dashboard, and the charge is prorated automatically. To downgrade, contact support and we'll take care of it.",
  },
  {
    question: "Do I need a new phone number?",
    answer:
      "No. You keep your existing business number and forward calls to ViFi. Your callers won't notice a thing.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. No long-term contracts, no cancellation fees. Cancel from your dashboard whenever you want.",
  },
];
