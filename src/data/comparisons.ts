export interface ComparisonCategory {
  name: string;
  description: string;
}

export const comparisonCategories: ComparisonCategory[] = [
  {
    name: "ViFi",
    description: "AI phone assistant with call recaps and transcripts",
  },
  {
    name: "Basic AI Receptionists",
    description: "Answer and route calls with scripted responses",
  },
  {
    name: "Traditional Voicemail",
    description: "Record messages for later playback",
  },
  {
    name: "Human Answering Services",
    description: "Live operators answer on your behalf",
  },
];

export interface ComparisonFeature {
  feature: string;
  values: Record<string, boolean | string>;
}

export const comparisonFeatures: ComparisonFeature[] = [
  {
    feature: "Answers every call 24/7",
    values: {
      ViFi: true,
      "Basic AI Receptionists": true,
      "Traditional Voicemail": true,
      "Human Answering Services": "Limited hours",
    },
  },
  {
    feature: "Natural AI conversation",
    values: {
      ViFi: true,
      "Basic AI Receptionists": "Scripted only",
      "Traditional Voicemail": false,
      "Human Answering Services": false,
    },
  },
  {
    feature: "Post-call briefing",
    values: {
      ViFi: true,
      "Basic AI Receptionists": false,
      "Traditional Voicemail": false,
      "Human Answering Services": "Basic notes",
    },
  },
  {
    feature: "Full transcript",
    values: {
      ViFi: true,
      "Basic AI Receptionists": false,
      "Traditional Voicemail": false,
      "Human Answering Services": false,
    },
  },
  {
    feature: "Call recording",
    values: {
      ViFi: true,
      "Basic AI Receptionists": "Some",
      "Traditional Voicemail": true,
      "Human Answering Services": "Rarely",
    },
  },
  {
    feature: "Instant notifications",
    values: {
      ViFi: true,
      "Basic AI Receptionists": "Some",
      "Traditional Voicemail": "Delayed",
      "Human Answering Services": "Varies",
    },
  },
  {
    feature: "Setup in minutes",
    values: {
      ViFi: true,
      "Basic AI Receptionists": "Hours/days",
      "Traditional Voicemail": true,
      "Human Answering Services": "Days/weeks",
    },
  },
  {
    feature: "No per-minute fees",
    values: {
      ViFi: true,
      "Basic AI Receptionists": false,
      "Traditional Voicemail": true,
      "Human Answering Services": false,
    },
  },
];
