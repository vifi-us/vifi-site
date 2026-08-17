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
  searchTitle?: string;
  searchDescription?: string;
  workflow?: {
    title: string;
    description: string;
  }[];
  callScenarios?: {
    title: string;
    description: string;
    intake: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
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
    searchTitle: "AI Receptionist for Home Services | ViFi",
    searchDescription:
      "ViFi is an AI receptionist for plumbers, HVAC teams, electricians, roofers, and contractors. Answer overflow and after-hours calls, capture service details, and follow up with context.",
    workflow: [
      {
        title: "Answer when the team cannot",
        description:
          "Use ViFi for overflow or after-hours coverage so a caller can explain the job instead of reaching a generic voicemail greeting.",
      },
      {
        title: "Capture the service request",
        description:
          "Configure the questions that matter to your business, such as the caller's issue, location, timing, and preferred next step.",
      },
      {
        title: "Review the call briefing",
        description:
          "After the call, use the summary, transcript, and recording to decide what needs attention and return the call with context.",
      },
    ],
    callScenarios: [
      {
        title: "New service request",
        description:
          "A homeowner calls while the crew is working and explains the job they need help with.",
        intake:
          "Capture the caller, location, service category, timing, and the next step your team has approved.",
      },
      {
        title: "After-hours call",
        description:
          "A caller reaches the business after the office has closed and needs to know what happens next.",
        intake:
          "Follow the written after-hours policy, collect the request, and flag situations that require a person.",
      },
      {
        title: "Existing customer follow-up",
        description:
          "A customer calls about previous work, an arrival window, or a question for the office.",
        intake:
          "Record the reason for the call and the details the team needs to return it with context.",
      },
    ],
    faqs: [
      {
        question: "What is an AI receptionist for home services?",
        answer:
          "It is a voice assistant configured to answer business calls, ask approved intake questions, capture the caller's request, and hand the conversation record to the service team for follow-up.",
      },
      {
        question: "Can ViFi cover calls only when I am busy or after hours?",
        answer:
          "Yes. You decide how calls reach ViFi, so you can use it for overflow, after-hours coverage, or a dedicated business line.",
      },
      {
        question: "What details can a home-service business collect?",
        answer:
          "You can configure ViFi around the intake details your team needs, such as the caller's contact information, service issue, location, urgency, and requested next step.",
      },
      {
        question: "What happens after a call?",
        answer:
          "ViFi provides a call summary, transcript, recording, and notification so your team can review the request and follow up with context.",
      },
    ],
  },
  {
    slug: "hvac",
    industry: "HVAC Companies",
    headline: "Keep HVAC calls moving while your team is in the field",
    description:
      "ViFi answers overflow and after-hours calls, captures the equipment issue and service request, and sends your team a clear briefing for the next step.",
    painPoints: [
      {
        title: "Peak-season calls arrive all at once",
        description:
          "When temperatures spike, the office can be helping one customer while several more callers are trying to get through.",
      },
      {
        title: "Technicians cannot stop mid-job",
        description:
          "A technician diagnosing a system or working in an attic cannot safely answer every new lead that reaches the business.",
      },
      {
        title: "After-hours messages lack useful context",
        description:
          "A vague voicemail rarely tells the team which system is affected, what changed, or how quickly the caller needs a response.",
      },
    ],
    relevantFeatures: [
      "Post-Call Briefings",
      "Instant Notifications",
      "Full Transcripts",
      "Professional AI Voice",
    ],
    searchTitle: "AI Receptionist for HVAC Companies | ViFi",
    searchDescription:
      "ViFi answers HVAC overflow and after-hours calls, captures system and service details, and sends a clear briefing so your team can follow up with context.",
    workflow: [
      {
        title: "Cover overflow and after-hours calls",
        description:
          "Forward calls when the office is busy, the team is on a job, or the business is closed.",
      },
      {
        title: "Collect the HVAC service request",
        description:
          "Ask approved intake questions about the caller, property, system, symptoms, and preferred timing without attempting a technical diagnosis.",
      },
      {
        title: "Brief the right person",
        description:
          "Send the summary, transcript, and recording to the team so a dispatcher, owner, or technician can decide the next step.",
      },
    ],
    callScenarios: [
      {
        title: "No heating or cooling",
        description:
          "A caller reports that a system stopped working and needs to explain the situation without waiting on hold.",
        intake:
          "Capture the property location, system type, observed symptoms, timing, and any safety concern for human review.",
      },
      {
        title: "Maintenance request",
        description:
          "A customer wants seasonal maintenance or a follow-up on previous service.",
        intake:
          "Collect the system and customer details plus the preferred callback window so the office can respond efficiently.",
      },
      {
        title: "Replacement or estimate inquiry",
        description:
          "A property owner wants to discuss replacing equipment or planning a larger project.",
        intake:
          "Record the project goal, property type, current equipment when known, and the best next conversation.",
      },
    ],
    faqs: [
      {
        question: "What can an AI receptionist collect for an HVAC call?",
        answer:
          "You can configure questions for the caller's contact information, service address, system type, observed issue, timing, and preferred next step. Keep technical diagnosis and safety decisions with qualified people.",
      },
      {
        question: "Can ViFi answer only when the HVAC office is busy?",
        answer:
          "Yes. You control call forwarding, so ViFi can cover overflow, after-hours periods, or a dedicated line without replacing the number customers already know.",
      },
      {
        question: "How should an HVAC business handle urgent or safety-related calls?",
        answer:
          "Define a written escalation policy before going live. ViFi can collect the request and follow approved wording, while situations involving safety or professional judgment should be routed to the appropriate person or emergency resource.",
      },
      {
        question: "What does the HVAC team receive after the call?",
        answer:
          "ViFi provides a summary, transcript, recording when enabled, and notification so the team can review the request and follow up with context.",
      },
    ],
  },
  {
    slug: "plumbing",
    industry: "Plumbing Companies",
    headline: "Answer plumbing leads even when your hands are full",
    description:
      "ViFi talks with callers while your plumbers are driving or on a job, captures the request and location, and delivers a briefing for fast, informed follow-up.",
    painPoints: [
      {
        title: "Calls arrive during active jobs",
        description:
          "A plumber working under a sink or handling equipment cannot pause safely every time a new customer calls.",
      },
      {
        title: "Urgent and routine requests sound alike in voicemail",
        description:
          "A short message may not explain whether the caller has an active leak, a slow drain, or a future project.",
      },
      {
        title: "Returning calls starts with repeated questions",
        description:
          "Without a structured intake, the team has to rediscover the address, issue, and timing before it can decide what to do.",
      },
    ],
    relevantFeatures: [
      "Post-Call Briefings",
      "Instant Notifications",
      "Full Transcripts",
      "Call Recordings",
    ],
    searchTitle: "AI Receptionist for Plumbers | ViFi",
    searchDescription:
      "ViFi answers plumbing overflow and after-hours calls, captures service details and location, and sends summaries so your team can follow up with context.",
    workflow: [
      {
        title: "Forward calls when the team cannot answer",
        description:
          "Use ViFi during jobs, driving time, overflow, or after hours instead of sending every caller to voicemail.",
      },
      {
        title: "Capture the plumbing request",
        description:
          "Collect approved details such as contact information, service address, visible problem, timing, and access notes.",
      },
      {
        title: "Review before calling back",
        description:
          "Use the briefing and full conversation record to prioritize the request and return the call without starting from zero.",
      },
    ],
    callScenarios: [
      {
        title: "Active leak or water issue",
        description:
          "A caller needs to describe what they can see and when the problem began.",
        intake:
          "Record the location, visible symptoms, affected fixture or area, and any stated safety concern for prompt human review.",
      },
      {
        title: "Drain or fixture service",
        description:
          "A customer wants help with a blocked drain, fixture, water heater, or another defined service request.",
        intake:
          "Capture the service category, property details, prior work when relevant, and preferred callback time.",
      },
      {
        title: "Project estimate",
        description:
          "A homeowner or property manager is planning an installation, replacement, or remodel.",
        intake:
          "Collect the project type, property, desired timeframe, and the information your estimator needs for the first conversation.",
      },
    ],
    faqs: [
      {
        question: "What can an AI receptionist ask a plumbing customer?",
        answer:
          "You choose the intake questions. Common fields include the caller's contact details, service address, affected fixture or area, a plain-language description, timing, and preferred next step.",
      },
      {
        question: "Can a plumbing company keep its current phone number?",
        answer:
          "Yes. The business can forward calls to ViFi for overflow, after-hours coverage, or another controlled call path while keeping its established number.",
      },
      {
        question: "Does ViFi diagnose plumbing problems or quote work?",
        answer:
          "ViFi should follow the business information and instructions you approve. Keep diagnosis, safety advice, and pricing decisions with qualified people unless your business has explicitly defined a safe, accurate response.",
      },
      {
        question: "How does the plumber know what happened on the call?",
        answer:
          "After the conversation, ViFi provides a summary, transcript, recording when enabled, and notification for review and follow-up.",
      },
    ],
  },
  {
    slug: "electricians",
    industry: "Electrical Contractors",
    headline: "Capture electrical service calls without interrupting the job",
    description:
      "ViFi answers when your electricians or office team cannot, collects the service request within your rules, and sends a detailed briefing for safe human follow-up.",
    painPoints: [
      {
        title: "The phone rings during hands-on work",
        description:
          "Electricians working at a panel, on a ladder, or inside a job site cannot safely stop for every incoming lead.",
      },
      {
        title: "Safety-sensitive calls need boundaries",
        description:
          "Some callers describe sparks, odors, outages, or damaged equipment that should follow a clear escalation policy instead of improvised advice.",
      },
      {
        title: "Estimate requests arrive with missing details",
        description:
          "A vague message about a panel, charger, or lighting project leaves the estimator without the context needed for a useful callback.",
      },
    ],
    relevantFeatures: [
      "Post-Call Briefings",
      "Full Transcripts",
      "Call Recordings",
      "Instant Notifications",
    ],
    searchTitle: "AI Receptionist for Electricians | ViFi",
    searchDescription:
      "ViFi answers electrician overflow and after-hours calls, captures service and project details, and sends a complete briefing for informed human follow-up.",
    workflow: [
      {
        title: "Cover calls during jobs and after hours",
        description:
          "Forward the call paths your team cannot answer consistently while preserving a clear route to a person.",
      },
      {
        title: "Use an approved electrical intake",
        description:
          "Collect contact, location, property, service category, visible symptoms, and timing without attempting remote troubleshooting.",
      },
      {
        title: "Send the conversation record",
        description:
          "Give the office or on-call electrician a concise briefing plus the transcript and recording needed to review the request.",
      },
    ],
    callScenarios: [
      {
        title: "Power or safety concern",
        description:
          "A caller reports an outage, sparking, an unusual odor, heat, or damaged electrical equipment.",
        intake:
          "Follow the business's safety and escalation wording, capture the location and observation, and avoid remote diagnosis.",
      },
      {
        title: "Panel, circuit, or repair request",
        description:
          "A customer needs service for a recurring issue, failed device, circuit, or electrical panel.",
        intake:
          "Record the affected area, visible behavior, property type, prior work, and callback availability.",
      },
      {
        title: "Installation or estimate inquiry",
        description:
          "A property owner calls about an EV charger, lighting, panel upgrade, generator, or planned improvement.",
        intake:
          "Capture the project type, property, desired timing, and the details your estimator wants before the first conversation.",
      },
    ],
    faqs: [
      {
        question: "How can an AI receptionist help an electrical contractor?",
        answer:
          "It can answer when the field or office team is unavailable, collect approved service-request details, and create a conversation record for an electrician or dispatcher to review.",
      },
      {
        question: "Can ViFi give electrical troubleshooting or safety advice?",
        answer:
          "Keep diagnosis and safety decisions with qualified people. Configure clear wording for safety-sensitive calls, including when the caller should contact emergency services or wait for an electrician.",
      },
      {
        question: "Can an electrical company use ViFi only after hours?",
        answer:
          "Yes. You control how calls are forwarded, so the assistant can cover after-hours, overflow, or a dedicated line while the normal office workflow remains in place.",
      },
      {
        question: "What information is available after an electrical service call?",
        answer:
          "The team can review a summary, transcript, recording when enabled, and notification before deciding how to respond.",
      },
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
