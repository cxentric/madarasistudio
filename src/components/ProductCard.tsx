import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatRupees } from "@/lib/utils";
import { ProductVisual } from "@/components/ProductVisual";

export function ProductCard({ product, span }: { product: Product; span?: "wide" }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group block ${span === "wide" ? "sm:col-span-2" : ""}`}
    >
      <ProductVisual icon={product.icon} colorHex={product.colors[0]?.hex} wide={span === "wide"} />

      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-base text-pine group-hover:text-olive">{product.name}</h3>
          <p className="text-sm text-pine/50">{product.kind}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm text-pine">{formatRupees(product.price)}</p>
          {product.compareAt && (
            <p className="text-xs text-pine/40 line-through">{formatRupees(product.compareAt)}</p>
          )}
        </div>
      </div>

      <div className="mt-2 flex gap-1.5">
        {product.colors.map((c) => (
          <span
            key={c.hex}
            title={c.name}
            className="h-3.5 w-3.5 rounded-full border border-mist"
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </Link>
  );
}
