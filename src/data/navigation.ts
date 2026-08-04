import { siteConfig } from "./site";

export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export interface FooterLink {
  label: string;
  href: string;
  /** Optional analytics placement id, rendered as data-cta. */
  cta?: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerNavigation: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Alternatives", href: "/alternatives" },
      { label: "FAQ", href: "/faq" },
      { label: "Log in", href: siteConfig.loginUrl, cta: "footer-login" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
    ],
  },
];
