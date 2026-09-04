export const siteConfig = {
  name: "ViFi",
  tagline: "Answer every call. Know every conversation.",
  description:
    "ViFi is the AI phone assistant that answers your calls and sends you a recap of every conversation. Built for small businesses that run on the phone.",
  email: "hello@vifi.us",

  appUrl: "https://app.vifi.us",
  registerUrl: "https://app.vifi.us/register",
  loginUrl: "https://app.vifi.us/login",
} as const;

export const socialLinks = [
  {
    platform: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/ViFiUS/",
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/vifi.us/",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/vifi-us",
  },
] as const;
