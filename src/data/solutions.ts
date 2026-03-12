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
      "Plumbers, electricians, HVAC techs, and contractors miss calls while they're on the job. ViFi answers for you, captures the details, and briefs you after every conversation so you can call back with context.",
    painPoints: [
      {
        title: "Calls come in while you're on a job",
        description:
          "You can't pick up when you're under a sink or on a roof. Every missed call is a potential job going to a competitor.",
      },
      {
        title: "Voicemail doesn't capture what you need",
        description:
          "Callers leave vague messages — or don't leave one at all. You're left guessing who called and what they need.",
      },
      {
        title: "Calling back blind wastes time",
        description:
          "Without context, you spend the first minutes of every callback figuring out what the customer needs instead of booking the job.",
      },
    ],
    relevantFeatures: [
      "Post-Call Briefings",
      "Instant Notifications",
      "Full Transcripts",
      "Natural AI Voice",
    ],
  },
  {
    slug: "medical-practices",
    industry: "Medical Practices",
    headline: "Never let a patient call go unanswered",
    description:
      "Medical offices handle high call volumes with limited staff. ViFi answers overflow and after-hours calls professionally, captures patient needs, and delivers a full briefing so your team can follow up efficiently.",
    painPoints: [
      {
        title: "Staff can't keep up with call volume",
        description:
          "Front desk teams juggle check-ins, scheduling, and phones. When call volume spikes, patients hear busy signals or endless ringing.",
      },
      {
        title: "After-hours calls get lost",
        description:
          "Patients call evenings and weekends. Voicemail captures some, but many hang up — and urgent needs may go unaddressed until morning.",
      },
      {
        title: "No record of what was discussed",
        description:
          "When staff take messages by hand, details get missed or misunderstood. There's no reliable record of the conversation.",
      },
    ],
    relevantFeatures: [
      "Post-Call Briefings",
      "Full Transcripts",
      "Call Recordings",
      "Natural AI Voice",
    ],
  },
  {
    slug: "legal",
    industry: "Legal",
    headline: "Capture every potential client's call",
    description:
      "Law firms depend on intake calls to drive revenue. ViFi ensures every prospective client reaches a professional voice, captures their situation, and delivers a complete briefing so attorneys can prioritize follow-up.",
    painPoints: [
      {
        title: "Missed intake calls cost thousands",
        description:
          "A single missed call from a prospective client can represent significant lost revenue. Most callers won't leave a voicemail — they'll call the next firm.",
      },
      {
        title: "Receptionists can't screen effectively",
        description:
          "Intake calls require nuance. Generic answering services miss important details that help attorneys prioritize which calls to return first.",
      },
      {
        title: "No documentation of initial contact",
        description:
          "Without a transcript or recording of the first call, attorneys rely on secondhand notes that may miss critical details about the prospective case.",
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
      "Real estate agents are constantly on the move — at showings, open houses, and closings. ViFi answers your calls, engages prospects naturally, and briefs you with everything you need to follow up and close.",
    painPoints: [
      {
        title: "Leads call while you're at showings",
        description:
          "You can't answer the phone during a showing or open house. By the time you check voicemail, the buyer has already called another agent.",
      },
      {
        title: "Speed-to-lead determines who wins",
        description:
          "The first agent to respond gets the client. Without instant notification of what the caller needs, you can't prioritize hot leads.",
      },
      {
        title: "Juggling multiple clients is overwhelming",
        description:
          "With dozens of active leads, it's impossible to remember every conversation. Details slip through the cracks and deals fall apart.",
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
