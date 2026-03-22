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
    price: "$99",
    period: "/mo",
    description: "For solo operators who need every call covered.",
    includedMinutes: 400,
    features: [
      "400 AI minutes included",
      "Post-call briefings",
      "Full transcripts",
      "Custom greeting & instructions",
      "Email notifications",
    ],
    cta: "Get Early Access",
    badge: "Early Access",
  },
  {
    name: "Growth",
    price: "$299",
    period: "/mo",
    description: "For busy teams that need the complete call record.",
    includedMinutes: 1500,
    features: [
      "1,500 AI minutes included",
      "Everything in Starter",
      "Call recordings",
      "SMS + email notifications",
    ],
    cta: "Get Early Access",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Scale",
    price: "$799",
    period: "/mo",
    description: "For high-volume businesses where every call counts.",
    includedMinutes: 4800,
    features: [
      "4,800 AI minutes included",
      "Everything in Growth",
      "Priority support",
      "API access",
    ],
    cta: "Get Early Access",
    badge: "Early Access",
  },
];

// Overage rates per Standard AI Minute - not shown on the pricing page
// but available for internal reference and other surfaces (e.g. docs, terms)
export interface OverageRate {
  tier: string;
  ratePerMinute: number;
}

export const overageRates: OverageRate[] = [
  { tier: "Starter", ratePerMinute: 0.25 },
  { tier: "Growth", ratePerMinute: 0.2 },
  { tier: "Scale", ratePerMinute: 0.17 },
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
      "ViFi keeps answering. Your callers will never hit a dead end. Additional minutes are billed at an overage rate based on your plan, and we'll alert you as you get close to your limit.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. Upgrade or downgrade anytime from your dashboard. Changes take effect on your next billing cycle.",
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
