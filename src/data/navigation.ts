import { siteConfig } from "./site";

export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: "Home Services", href: "/solutions/home-services" },
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
    title: "Resources",
    links: [
      { label: "Home Services", href: "/solutions/home-services" },
      { label: "Medical Practices", href: "/solutions/medical-practices" },
      { label: "Law Firms", href: "/solutions/legal" },
      { label: "Real Estate", href: "/solutions/real-estate" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
    ],
  },
];
