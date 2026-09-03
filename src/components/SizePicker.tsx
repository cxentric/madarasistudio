"use client";

import type { SizeOption } from "@/lib/taxonomy";
import { cn } from "@/lib/utils";

export function SizePicker({
  sizes,
  selected,
  onSelect,
}: {
  sizes: SizeOption[];
  selected: SizeOption;
  onSelect: (size: SizeOption) => void;
}) {
  return (
    <div>
      <p className="text-sm text-pine/60">
        Size: <span className="text-pine">{selected.label}</span>{" "}
        <span className="text-pine/40">({selected.dimensions})</span>
      </p>
      <div className="mt-2 flex gap-2">
        {sizes.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s)}
            className={cn(
              "rounded-md border px-3 py-2 text-left text-sm transition-colors",
              selected.id === s.id ? "border-olive bg-olive/10 text-pine" : "border-mist text-pine/70 hover:border-olive"
            )}
          >
            <span className="block font-medium">{s.label}</span>
            <span className="block text-xs text-pine/45">{s.dimensions}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
