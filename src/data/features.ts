export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    title: "Post-Call Briefings",
    description:
      "After every call, you get a short recap: who called, what they need, and what to do next. Read it in 30 seconds.",
  },
  {
    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
    title: "Full Transcripts",
    description:
      "Every call is transcribed word for word. Search it, reference it, or share it with your team. Nothing gets lost.",
  },
  {
    icon: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3",
    title: "Call Recordings",
    description:
      "Listen back to any call on demand. Hear the tone, the urgency, and the details that text alone can't capture.",
  },
  {
    icon: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
    title: "Instant Notifications",
    description:
      "Get a text or email the moment a call wraps up. You'll know what happened before you even check your phone.",
  },
  {
    icon: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3 M8 22h8",
    title: "Professional AI Voice",
    description:
      "Callers hear a warm, professional greeting. No robotic menus, no hold music. Just a real conversation.",
  },
  {
    icon: "M13 2 3 14h9l-1 10 10-12h-9l1-10z",
    title: "Ready in Minutes",
    description:
      "Forward your calls to ViFi and you're live. No hardware, no IT team, no complicated setup.",
  },
];
