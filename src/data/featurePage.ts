// Content for the /features page. Marquee spotlights get a full section
// each; secondary features render as a compact grid. Keep claims aligned
// with what the product actually ships — see AGENTS.md content rules.

export interface FeatureSpotlightData {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  icon: string;
}

export const spotlights: FeatureSpotlightData[] = [
  {
    eyebrow: "Caller memory",
    title: "Your agent remembers every caller",
    description:
      "When someone calls back, ViFi already knows who they are. It recognizes repeat callers and uses what it learned on past calls, so your regulars feel like regulars. Callers who feel known come back.",
    bullets: [
      "A profile for every caller, built automatically from your calls",
      "Details accumulate over time: past requests, preferences, follow-ups",
      "Callers sorted by stage: new lead, customer, VIP, churned",
      "Sentiment trend across calls, so you spot trouble early",
    ],
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  },
  {
    eyebrow: "After every call",
    title: "Know what happened without listening back",
    description:
      "The moment a call ends, you get the whole story: what the caller wanted, what was said, and what to do next. Call back ready and win the job. No voicemail to replay, no guessing.",
    bullets: [
      "A summary, the caller's intent, and action items for every call",
      "Full word-for-word transcript, with optional recording",
      "An instant recap by email the moment the call ends",
      "How the call went: sentiment on every conversation",
    ],
    icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  },
  {
    eyebrow: "Knowledge base",
    title: "Answers from your business, not the internet",
    description:
      "Teach your agent what it needs to know: services, hours, pricing, policies. It answers from what you gave it, and it tells you when callers ask something it can't answer, so you always know what to add next.",
    bullets: [
      "Add Q&A articles, upload documents, or point it at your website",
      "Trains itself at setup from your website and Google Business listing",
      "Unanswered topics show what callers asked that it couldn't answer",
      "Built-in guardrails: it never invents prices or hours",
    ],
    icon: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  },
  {
    eyebrow: "Consent-based texting",
    title: "A one-time receipt when a caller asks",
    description:
      "After making a fresh phone-follow-up request, a caller can opt in by texting YES. ViFi sends one opt-in confirmation and one fixed customer-care receipt, then stops.",
    bullets: [
      "No outbound SMS before the caller texts YES",
      "Two messages per YES: opt-in confirmation plus one fixed receipt",
      "No business-authored, free-form, marketing, or recurring texts",
      "HELP is always available and STOP applies across the ViFi program",
    ],
    icon: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
  },
];

export interface SecondaryFeature {
  icon: string;
  title: string;
  description: string;
}

export const secondaryFeatures: SecondaryFeature[] = [
  {
    icon: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
    title: "One-click integrations",
    description:
      "Connect HubSpot, Slack, Gmail, Google Calendar, Calendly, or Square. Call summaries land where your team works, and callers can book through the calendar tools you already use.",
  },
  {
    icon: "M3 3v18h18 M18 17V9 M13 17V5 M8 17v-3",
    title: "Call analytics",
    description:
      "Call volume, answered versus missed, sentiment, and top topics. See when your phone is busiest and what callers actually ask about.",
  },
  {
    icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z",
    title: "Your agent, on your website",
    description:
      "Embed a voice widget with a single script. Visitors talk to the same agent that answers your phone, trained on the same knowledge.",
  },
  {
    icon: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3",
    title: "Sounds like your business",
    description:
      "Pick a voice, write the greeting, tune the personality. Industry presets and custom instructions make the agent yours.",
  },
  {
    icon: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
    title: "Built for teams",
    description:
      "Invite teammates with admin, member, or viewer roles. Every change is tracked in an audit log. Sign in with Google, with MFA available.",
  },
  {
    icon: "M13 2 3 14h9l-1 10 10-12h-9l1-10z",
    title: "Live in minutes",
    description:
      "A guided setup gets you a local number in minutes — or keep your number and forward calls to it. Then hear your agent take a test call right from your browser.",
  },
];
