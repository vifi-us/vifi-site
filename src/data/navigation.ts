export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "mailto:hello@vifi.us" },
];
