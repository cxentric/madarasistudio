import Link from "next/link";
import { notFound } from "next/navigation";
import { OCCASIONS, PLACES, MEMORIES, PRICE_RANGES, PERSONALISATION_OPTIONS, STYLES } from "@/lib/taxonomy";
import { slugify } from "@/lib/utils";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const LISTS: Record<string, readonly string[]> = { occasion: OCCASIONS, place: PLACES, memory: MEMORIES };
const TITLES: Record<string, string> = { occasion: "Occasion", place: "Place", memory: "Memory" };

const LEGACY_OCCASION_SLUGS: Record<string, string> = {
  birthday: "birthday",
  anniversary: "anniversary",
  housewarming: "housewarming",
  farewell: "farewell",
  graduation: "graduation",
  "new-year": "newyear",
  "just-because": "justbecause",
};

export default function CollectionPage({ params }: { params: { type: string; value: string } }) {
  const list = LISTS[params.type];
  if (!list) notFound();

  const label = list.find((item) => slugify(item) === params.value);
  if (!label) notFound();

  const legacyTag = params.type === "occasion" ? LEGACY_OCCASION_SLUGS[params.value] : undefined;
  const matches = legacyTag ? products.filter((p) => p.occasions.includes(legacyTag)) : [];

  return (
    <div className="container-page py-12">
      <p className="text-sm text-pine/50">{TITLES[params.type]}</p>
      <h1 className="mt-1 font-display text-3xl text-pine">{label}</h1>

      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <FilterGroup title="Budget" options={PRICE_RANGES.map((r) => r.label)} />
        <FilterGroup title="Personalise with" options={[...PERSONALISATION_OPTIONS]} />
        <FilterGroup title="Style" options={[...STYLES]} />
      </div>
      <p className="mt-3 text-xs text-pine/40">
        These will become tap-to-filter chips once every product carries the full taxonomy — for now they show what
        this collection will support.
      </p>

      <div className="mt-10">
        {matches.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {matches.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-mist bg-cloud p-8 text-center">
            <p className="text-pine/70">We're still building out the {label} collection.</p>
            <Link href="/shop" className="mt-3 inline-block text-sm text-olive hover:underline">
              Browse the full shop instead
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <div>
      <h3 className="font-display text-sm text-pine">{title}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <span key={o} className="rounded-full border border-mist px-3 py-1 text-xs text-pine/60">
            {o}
          </span>
        ))}
      </div>
    </div>
  );
}
