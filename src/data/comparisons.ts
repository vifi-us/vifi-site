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
    name: "Other AI Receptionists",
    description: "Automated voice products with provider-specific capabilities",
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
    feature: "Two-way conversation",
    values: {
      ViFi: true,
      "Other AI Receptionists": true,
      "Traditional Voicemail": false,
      "Human Answering Services": true,
    },
  },
  {
    feature: "Can ask follow-up questions",
    values: {
      ViFi: true,
      "Other AI Receptionists": "Varies",
      "Traditional Voicemail": false,
      "Human Answering Services": true,
    },
  },
  {
    feature: "Uses your approved business information",
    values: {
      ViFi: true,
      "Other AI Receptionists": "Varies",
      "Traditional Voicemail": false,
      "Human Answering Services": "Depends on training",
    },
  },
  {
    feature: "Post-call summary",
    values: {
      ViFi: "Included",
      "Other AI Receptionists": "Varies",
      "Traditional Voicemail": false,
      "Human Answering Services": "Message notes",
    },
  },
  {
    feature: "Full transcript",
    values: {
      ViFi: "Included",
      "Other AI Receptionists": "Varies",
      "Traditional Voicemail": false,
      "Human Answering Services": "Rarely",
    },
  },
  {
    feature: "Conversation recording",
    values: {
      ViFi: "Optional",
      "Other AI Receptionists": "Varies",
      "Traditional Voicemail": "Message only",
      "Human Answering Services": "Provider-specific",
    },
  },
  {
    feature: "Human judgment for unusual calls",
    values: {
      ViFi: "Escalation needed",
      "Other AI Receptionists": "Escalation needed",
      "Traditional Voicemail": false,
      "Human Answering Services": "Strongest",
    },
  },
  {
    feature: "Common pricing model",
    values: {
      ViFi: "Plan + included minutes",
      "Other AI Receptionists": "Varies",
      "Traditional Voicemail": "Phone-plan feature",
      "Human Answering Services": "Often per call/minute",
    },
  },
];
