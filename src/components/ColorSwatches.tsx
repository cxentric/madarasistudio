"use client";

import type { ColorOption } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ColorSwatches({
  colors,
  selected,
  onSelect,
}: {
  colors: ColorOption[];
  selected: ColorOption;
  onSelect: (color: ColorOption) => void;
}) {
  return (
    <div>
      <p className="text-sm text-pine/60">
        Cover: <span className="text-pine">{selected.name}</span>
      </p>
      <div className="mt-2 flex gap-2">
        {colors.map((c) => (
          <button
            key={c.hex}
            type="button"
            title={c.name}
            onClick={() => onSelect(c)}
            className={cn(
              "h-9 w-9 rounded-full border-2 transition-transform hover:scale-105",
              selected.hex === c.hex ? "border-olive" : "border-transparent"
            )}
            style={{ backgroundColor: c.hex }}
            aria-label={c.name}
            aria-pressed={selected.hex === c.hex}
          />
        ))}
      </div>
    </div>
  );
}
