export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  includedMinutes: number;
  includedSmsSegments: number;
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
    includedSmsSegments: 100,
    features: [
      "100 AI minutes + 100 eligible ViFi SMS segments included",
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
    includedSmsSegments: 500,
    features: [
      "500 AI minutes + 500 eligible ViFi SMS segments included",
      "Everything in Starter",
      "Lower overage rates",
    ],
    cta: "Start free — no card",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$349",
    period: "/mo",
    description: "For high-volume businesses where every call counts.",
    includedMinutes: 2000,
    includedSmsSegments: 2000,
    features: [
      "2,000 AI minutes + 2,000 eligible ViFi SMS segments included",
      "Everything in Growth",
      "Our lowest overage rates",
    ],
    cta: "Start free — no card",
  },
];

// Published rates shared by the pricing cards and usage estimator.
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
      "AI minutes measure the time your agent spends on a call, rounded up to a whole minute for each call. A 2-minute, 10-second call uses 3 AI minutes. Browser test calls and website widget conversations also count. Time talking to your team after a transfer does not count.",
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
      "You can keep your business number and forward calls to ViFi once your paid service is active and you have tested the setup. During the free trial, keep customer calls on your existing routing and test with approved callers.",
  },
  {
    question: "What can I test before paying?",
    answer:
      "The 7-day trial needs no card and includes 25 AI minutes and 50 eligible text segments. Test your agent and review its call records using up to three approved caller numbers. Transfers to a person are unavailable during the trial. Choose a paid activation option in Billing when you are ready for customer calls.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. No long-term contracts, no cancellation fees. Cancel from your dashboard whenever you want.",
  },
];
