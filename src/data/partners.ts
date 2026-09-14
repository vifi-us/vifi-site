import { pricingTiers } from "./pricing";

/**
 * Partner (affiliate) program facts shown on /partners and its documents.
 * The program runs on Tolt; the portal is the custom domain below. Keep these
 * in step with the Tolt program settings and the Affiliate Program Terms.
 */
export const partnerProgram = {
  portalUrl: "https://partners.vifi.us",
  signupUrl: "https://partners.vifi.us/signup",
  loginUrl: "https://partners.vifi.us/login",
  email: "partners@vifi.us",
  /** Share of each net payment paid to the referring partner. */
  commissionRate: 0.2,
  commissionLabel: "20%",
  /** Days a referral link is tracked before attribution lapses. */
  trackingDays: 90,
  payoutTerms: "Monthly, net-30",
  payoutMethods: ["PayPal", "Wise", "Bank wire"],
  minimumPayout: "None",
  countries: ["the United States", "the United Kingdom", "Canada"],
  termsUrl: "/legal/affiliate-terms",
  /**
   * Customer-side offer (first invoice only). Applied automatically at checkout
   * when the business signs up through a partner link; a personal partner code
   * is the fallback for deals closed in person.
   */
  customerOffer: "50% off their first month",
  customerOfferShort: "50% off the first month",
} as const;

export interface PartnerEarning {
  plan: string;
  price: string;
  perCustomer: string;
}

const usd = (n: number) => `$${n.toFixed(2)}`;

/** Commission per referred customer per month, derived from the live pricing tiers. */
export const partnerEarnings: PartnerEarning[] = pricingTiers.map((tier) => ({
  plan: tier.name,
  price: `${tier.price}${tier.period}`,
  perCustomer: usd(Number(tier.price.replace(/[^0-9.]/g, "")) * partnerProgram.commissionRate),
}));

/** Ten customers on the highlighted plan, the example used on the program page. */
export const partnerExample = (() => {
  const tier = pricingTiers.find((t) => t.highlighted) ?? pricingTiers[0];
  const monthly = Number(tier.price.replace(/[^0-9.]/g, "")) * partnerProgram.commissionRate * 10;
  return { plan: tier.name, count: 10, monthly: `$${Math.round(monthly)}` };
})();
