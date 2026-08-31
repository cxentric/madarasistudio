export type ColorOption = { name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  category: "Photobooks" | "Journals" | "Planners" | "Notebooks";
  kind: string; // e.g. "Medium Photobook"
  price: number; // in rupees
  compareAt?: number;
  blurb: string;
  description: string;
  colors: ColorOption[];
  icon: "gopuram" | "davara" | "bell" | "kolam" | "auto";
};

export const BRAND_COLORS: ColorOption[] = [
  { name: "Olive Grove", hex: "#5C6B3E" },
  { name: "Marigold", hex: "#E2A93D" },
  { name: "Blush Terracotta", hex: "#D98B72" },
  { name: "Sage Leaf", hex: "#8FA876" },
  { name: "Half White", hex: "#F8F5EC" },
  { name: "Misty Grey", hex: "#DBD7C9" },
];

export const products: Product[] = [
  {
    slug: "marina-mornings",
    name: "Marina Mornings",
    category: "Photobooks",
    kind: "Medium Photobook",
    price: 1799,
    compareAt: 2099,
    blurb: "For the walks that started before the city woke up.",
    description:
      "A 60-page layflat photobook sized for a shelf, not a drawer. Lay out your own frames against a Marina-dawn palette, add captions in your own hand-picked font, and pick a cover finish in olive or marigold.",
    colors: [BRAND_COLORS[0], BRAND_COLORS[1], BRAND_COLORS[4]],
    icon: "gopuram",
  },
  {
    slug: "mylapore-memories",
    name: "Mylapore Memories",
    category: "Photobooks",
    kind: "Large Photobook",
    price: 2299,
    compareAt: 2599,
    blurb: "A big book for a neighbourhood that never does anything small.",
    description:
      "100 pages, thick matte stock, and room for the whole story — from the temple tank at dawn to the last kutcheri of the season. Built for families who keep adding chapters.",
    colors: [BRAND_COLORS[2], BRAND_COLORS[0], BRAND_COLORS[5]],
    icon: "bell",
  },
  {
    slug: "kolam-diaries",
    name: "Kolam Diaries",
    category: "Photobooks",
    kind: "Mini Photobook",
    price: 1599,
    compareAt: 1799,
    blurb: "Small enough to slip into a festival gift bag.",
    description:
      "A pocket-sized photobook that reads like a keepsake. Twenty pages, a kolam-dot pattern debossed on the cover, and space for a short dedication on the first page.",
    colors: [BRAND_COLORS[1], BRAND_COLORS[4], BRAND_COLORS[3]],
    icon: "kolam",
  },
  {
    slug: "pondy-bazaar-postcards",
    name: "Pondy Bazaar Postcards",
    category: "Photobooks",
    kind: "Mini Photobook",
    price: 1599,
    blurb: "Every trip has a Pondy Bazaar moment. Frame it.",
    description:
      "A travel-format mini photobook with postcard-style layouts — one photo, one line, one page. Good for a single trip or a whole year of Saturday errands.",
    colors: [BRAND_COLORS[5], BRAND_COLORS[2], BRAND_COLORS[1]],
    icon: "auto",
  },
  {
    slug: "filter-kaapi-rituals",
    name: "Filter Kaapi Rituals",
    category: "Planners",
    kind: "Undated Daily Planner",
    price: 999,
    compareAt: 1199,
    blurb: "Start whenever. The first page is always today.",
    description:
      "An undated daily planner with a davara-and-tumbler motif running along the footer of every page. Monthly overviews, daily blocks, and a habit tracker sized for one small, good habit at a time.",
    colors: [BRAND_COLORS[0], BRAND_COLORS[1]],
    icon: "davara",
  },
  {
    slug: "kutcheri-season",
    name: "Kutcheri Season",
    category: "Planners",
    kind: "Weekly Desk Planner",
    price: 1099,
    blurb: "For calendars that fill up every December.",
    description:
      "A desk planner built around the December music season — weekly spreads with room for sabha names, timings, and the friends you're meeting there.",
    colors: [BRAND_COLORS[2], BRAND_COLORS[4]],
    icon: "bell",
  },
  {
    slug: "kanjeevaram-threads",
    name: "Kanjeevaram Threads",
    category: "Journals",
    kind: "Gratitude Journal",
    price: 899,
    compareAt: 999,
    blurb: "A page a day, woven like a good silk border.",
    description:
      "A guided gratitude journal with prompts inspired by the patience of a Kanjeevaram weave — small, daily entries that add up to something you didn't notice being built.",
    colors: [BRAND_COLORS[2], BRAND_COLORS[1]],
    icon: "kolam",
  },
  {
    slug: "kapaleeshwarar-evenings",
    name: "Kapaleeshwarar Evenings",
    category: "Journals",
    kind: "Wellness Journal",
    price: 899,
    blurb: "For the walk around the tank, after the lamps are lit.",
    description:
      "A wellness journal with evening-check-in prompts — how the day went, what to let go of, what to carry into tomorrow. Cover debossed with a temple-lamp line drawing.",
    colors: [BRAND_COLORS[0], BRAND_COLORS[5]],
    icon: "bell",
  },
  {
    slug: "kolam-grid",
    name: "Kolam Grid",
    category: "Notebooks",
    kind: "Dotted Notebook",
    price: 699,
    compareAt: 799,
    blurb: "Dots that already know how to become a pattern.",
    description:
      "A dot-grid notebook for planning, sketching, or actually drawing your own kolam. 120 pages of thick, fountain-pen-friendly paper.",
    colors: [BRAND_COLORS[3], BRAND_COLORS[0], BRAND_COLORS[4]],
    icon: "kolam",
  },
  {
    slug: "kacheri-notes",
    name: "Kacheri Notes",
    category: "Notebooks",
    kind: "Lined Notebook",
    price: 699,
    blurb: "For lyrics, ragas, and the odd grocery list.",
    description:
      "A lined notebook sized for a concert programme in one pocket. Ribbon marker, elastic closure, and a brass-foil title panel you get to fill in yourself.",
    colors: [BRAND_COLORS[1], BRAND_COLORS[2]],
    icon: "davara",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const categories = ["Photobooks", "Planners", "Journals", "Notebooks"] as const;
