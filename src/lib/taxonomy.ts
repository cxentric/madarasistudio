// Canonical taxonomy for Madarasi Studio's catalog. Every product's tags
// should be drawn from these lists so the shop's filters and the "Ask your
// Madarasi!" gift finder both stay in sync with what's actually sellable.
// Add a new value here first, then use it in src/lib/products.ts.

export const COLLECTIONS = ["Birthday", "Anniversary", "Us", "Our Story", "Goa", "First Trip"] as const;
export type Collection = (typeof COLLECTIONS)[number];

export const RECIPIENTS = ["Partner", "Wife", "Husband", "Friend", "Parent", "Child", "Colleague"] as const;
export type Recipient = (typeof RECIPIENTS)[number];

export const OCCASIONS = ["Birthday", "Anniversary", "Wedding", "Valentine's Day"] as const;
export type Occasion = (typeof OCCASIONS)[number];

export const PLACES = ["Goa", "Kerala", "Bengaluru", "Chennai", "Europe", "Mountains", "Beaches"] as const;
export type Place = (typeof PLACES)[number];

export const MEMORY_TYPES = ["Relationship", "Travel", "Family", "Friendship", "Childhood"] as const;
export type MemoryType = (typeof MEMORY_TYPES)[number];

export type PriceRange = { id: string; label: string; min: number; max: number };

export const PRICE_RANGES: PriceRange[] = [
  { id: "under-500", label: "Under ₹500", min: 0, max: 499 },
  { id: "500-1000", label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { id: "1000-2000", label: "₹1,000 – ₹2,000", min: 1001, max: 2000 },
  { id: "2000-plus", label: "₹2,000+", min: 2001, max: Number.POSITIVE_INFINITY },
];

export const PERSONALISATION_OPTIONS = ["Name", "Photo", "Message", "Date", "Location"] as const;
export type PersonalisationOption = (typeof PERSONALISATION_OPTIONS)[number];

export const STYLES = ["Romantic", "Minimal", "Premium", "Emotional", "Fun", "Artistic"] as const;
export type Style = (typeof STYLES)[number];

export function getPriceRange(price: number): PriceRange | undefined {
  return PRICE_RANGES.find((r) => price >= r.min && price <= r.max);
}
