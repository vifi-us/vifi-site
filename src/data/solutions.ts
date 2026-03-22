export interface Solution {
  slug: string;
  industry: string;
  headline: string;
  description: string;
  painPoints: {
    title: string;
    description: string;
  }[];
  relevantFeatures: string[];
}

export const solutions: Solution[] = [
  {
    slug: "home-services",
    industry: "Home Services",
    headline: "Win more jobs by answering every call",
    description:
      "Plumbers, electricians, HVAC techs, and contractors miss calls on the job site. ViFi picks up, captures the details, and sends you a briefing so you can call back ready to book.",
    painPoints: [
      {
        title: "Calls come in while you're on a job",
        description:
          "You can't pick up when you're under a sink or on a roof. Every missed call is a potential job walking to a competitor.",
      },
      {
        title: "Voicemail doesn't capture what you need",
        description:
          "Callers leave vague messages, or don't leave one at all. You're stuck guessing who called and what they wanted.",
      },
      {
        title: "Callbacks without context waste time",
        description:
          "Without details, you spend the first few minutes of every callback figuring out what the customer needs instead of booking the job.",
      },
    ],
    relevantFeatures: [
      "Post-Call Briefings",
      "Instant Notifications",
      "Full Transcripts",
      "Professional AI Voice",
    ],
  },
  {
    slug: "medical-practices",
    industry: "Medical Practices",
    headline: "Never let a patient call go unanswered",
    description:
      "Medical offices field high call volumes with limited front desk staff. ViFi handles overflow and after-hours calls, captures what the patient needs, and sends your team a full briefing to act on.",
    painPoints: [
      {
        title: "Staff can't keep up with call volume",
        description:
          "Front desk teams juggle check-ins, scheduling, and phones at the same time. When call volume spikes, patients get busy signals or endless ringing.",
      },
      {
        title: "After-hours calls disappear",
        description:
          "Patients call evenings and weekends. Voicemail catches some, but many hang up. Urgent needs can sit unaddressed until morning.",
      },
      {
        title: "No reliable record of the conversation",
        description:
          "When staff take messages by hand, details get missed or garbled. There's no dependable record of what was actually said.",
      },
    ],
    relevantFeatures: [
      "Post-Call Briefings",
      "Full Transcripts",
      "Call Recordings",
      "Professional AI Voice",
    ],
  },
  {
    slug: "legal",
    industry: "Legal",
    headline: "Capture every potential client's call",
    description:
      "Law firms depend on intake calls for revenue. ViFi makes sure every prospective client reaches a professional voice, captures their situation, and delivers a briefing so attorneys can prioritize follow-up.",
    painPoints: [
      {
        title: "Missed intake calls cost thousands",
        description:
          "One missed call from a prospective client can mean thousands in lost revenue. Most callers won't leave a voicemail. They'll call the next firm.",
      },
      {
        title: "Receptionists can't screen effectively",
        description:
          "Intake calls require nuance. Generic answering services miss important details that help attorneys decide which calls to return first.",
      },
      {
        title: "No documentation of initial contact",
        description:
          "Without a transcript or recording, attorneys rely on secondhand notes that may miss critical details about the prospective case.",
      },
    ],
    relevantFeatures: [
      "Post-Call Briefings",
      "Full Transcripts",
      "Call Recordings",
      "Instant Notifications",
    ],
  },
  {
    slug: "real-estate",
    industry: "Real Estate",
    headline: "Never miss a lead when you're showing homes",
    description:
      "Real estate agents live in their cars, at showings, and at open houses. ViFi answers your calls, talks with prospects, and sends you everything you need to follow up fast.",
    painPoints: [
      {
        title: "Leads call while you're at showings",
        description:
          "You can't answer the phone during a showing or open house. By the time you check voicemail, the buyer has already called another agent.",
      },
      {
        title: "Speed-to-lead determines who wins",
        description:
          "The first agent to respond gets the client. Without an instant heads-up on what the caller needs, you can't prioritize the hot leads.",
      },
      {
        title: "Juggling multiple clients is overwhelming",
        description:
          "With dozens of active leads, you can't remember every conversation. Details slip through the cracks and deals fall apart.",
      },
    ],
    relevantFeatures: [
      "Instant Notifications",
      "Post-Call Briefings",
      "Full Transcripts",
      "Ready in Minutes",
    ],
  },
];
