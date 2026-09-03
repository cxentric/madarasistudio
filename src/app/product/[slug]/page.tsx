"use client";

import { useMemo, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { SIZES } from "@/lib/taxonomy";
import { formatRupees } from "@/lib/utils";
import { ProductVisual } from "@/components/ProductVisual";
import { ColorSwatches } from "@/components/ColorSwatches";
import { SizePicker } from "@/components/SizePicker";
import { PhotoTemplatePicker, type PhotoSlot } from "@/components/PhotoTemplatePicker";
import { AIAssistantWidget } from "@/components/AIAssistantWidget";
import { useCart } from "@/components/CartProvider";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const router = useRouter();
  const { addItem } = useCart();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(SIZES[1]);
  const [photos, setPhotos] = useState<PhotoSlot[]>([]);
  const [personalisation, setPersonalisation] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showAssistant, setShowAssistant] = useState(false);
  const [added, setAdded] = useState(false);

  const effectivePrice = product.price + size.priceDelta;
  const readyPhotoCount = useMemo(() => photos.filter((p) => p.status === "ready").length, [photos]);
  const hasUploadInProgress = photos.some((p) => p.status === "uploading");

  return (
    <div className="container-page py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductVisual icon={product.icon} colorHex={color.hex} large />
        </div>

        <div>
          <p className="text-sm text-pine/50">{product.category}</p>
          <h1 className="mt-1 font-display text-3xl text-pine">{product.name}</h1>
          <p className="mt-1 text-pine/50">{product.kind}</p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-xl text-pine">{formatRupees(effectivePrice)}</span>
            {product.compareAt && (
              <span className="text-sm text-pine/40 line-through">
                {formatRupees(product.compareAt + size.priceDelta)}
              </span>
            )}
          </div>

          <p className="mt-5 max-w-md text-pine/70">{product.description}</p>

          <div className="mt-6">
            <ColorSwatches colors={product.colors} selected={color} onSelect={setColor} />
          </div>

          <div className="mt-6">
            <SizePicker sizes={SIZES} selected={size} onSelect={setSize} />
          </div>

          <div className="mt-6 max-w-md">
            <PhotoTemplatePicker sizeId={size.id} onChange={setPhotos} />
          </div>

          <div className="mt-6 max-w-md">
            <label className="text-sm text-pine/60" htmlFor="personalisation">
              Cover dedication (optional)
            </label>
            <input
              id="personalisation"
              value={personalisation}
              onChange={(e) => setPersonalisation(e.target.value)}
              placeholder="For Paati, with love"
              maxLength={60}
              className="mt-2 w-full rounded-md border border-mist bg-cloud px-3 py-2 text-sm text-pine placeholder:text-pine/35 focus:border-olive"
            />
            <button
              type="button"
              onClick={() => setShowAssistant((v) => !v)}
              className="mt-2 text-xs text-olive hover:underline"
            >
              {showAssistant ? "Hide personalisation ideas" : "Need an idea? Ask your Madarasi!"}
            </button>
          </div>

          {showAssistant && (
            <div className="mt-4 max-w-md">
              <AIAssistantWidget variant="inline" productContext={{ name: product.name, kind: product.kind }} />
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-md border border-mist">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-pine/70 hover:text-pine"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-pine">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-pine/70 hover:text-pine"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              disabled={hasUploadInProgress}
              onClick={() => {
                addItem({
                  slug: product.slug,
                  name: product.name,
                  kind: product.kind,
                  price: effectivePrice,
                  color: color.name,
                  size: `${size.label} (${size.dimensions})`,
                  photos: photos.filter((p) => p.status === "ready").map((p) => p.url as string),
                  personalisation: personalisation || undefined,
                  quantity,
                });
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
              }}
              className="flex-1 rounded-md bg-olive px-5 py-3 text-sm font-medium text-ivory transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {hasUploadInProgress ? "Photos still uploading…" : added ? "Added to bag" : "Add to bag"}
            </button>
          </div>

          {readyPhotoCount > 0 && (
            <p className="mt-2 text-xs text-pine/40">{readyPhotoCount} photo(s) ready to include with this order.</p>
          )}

          <button onClick={() => router.push("/cart")} className="mt-3 text-sm text-pine/60 hover:text-olive">
            View bag
          </button>
        </div>
      </div>
    </div>
  );
}
