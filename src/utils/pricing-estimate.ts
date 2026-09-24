import { pricingTiers, overageRates } from "../data/pricing.ts";

/** Dollars are calculated in integer cents; inputs are already billable units. */
export function estimatePlans(minutes: number, smsSegments: number) {
  if (![minutes, smsSegments].every((value) => Number.isSafeInteger(value) && value >= 0 && value <= 1_000_000)) {
    throw new RangeError("Enter whole usage amounts from 0 to 1,000,000.");
  }
  return pricingTiers.map((tier) => {
    const rate = overageRates.find((item) => item.tier === tier.name);
    if (!rate) throw new Error(`Missing published rates for ${tier.name}`);
    const baseCents = Math.round(Number(tier.price.slice(1)) * 100);
    const minuteCents = Math.max(0, minutes - tier.includedMinutes) * Math.round(rate.ratePerMinute * 100);
    const smsCents = Math.max(0, smsSegments - tier.includedSmsSegments) * Math.round(rate.ratePerSmsSegment * 100);
    return { name: tier.name, baseCents, minuteCents, smsCents, totalCents: baseCents + minuteCents + smsCents };
  });
}

export const formatCost = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
