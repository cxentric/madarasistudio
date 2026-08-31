import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/products";
import { cn } from "@/lib/utils";

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const active = searchParams.category;
  const list = active ? products.filter((p) => p.category === active) : products;

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-pine">Shop</h1>
      <p className="mt-2 text-pine/60">Every design ships blank until you personalise it.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/shop"
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm transition-colors",
            !active ? "border-olive bg-olive/10 text-olive" : "border-mist text-pine/70 hover:border-olive"
          )}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/shop?category=${encodeURIComponent(cat)}`}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              active === cat ? "border-olive bg-olive/10 text-olive" : "border-mist text-pine/70 hover:border-olive"
            )}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {list.length === 0 && <p className="mt-10 text-pine/50">Nothing in this category yet.</p>}
    </div>
  );
}
