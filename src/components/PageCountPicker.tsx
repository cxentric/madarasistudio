"use client";

import type { PageCountOption } from "@/lib/taxonomy";
import { cn } from "@/lib/utils";

export function PageCountPicker({
  options,
  selected,
  onSelect,
}: {
  options: PageCountOption[];
  selected: PageCountOption;
  onSelect: (option: PageCountOption) => void;
}) {
  return (
    <div>
      <p className="text-sm text-pine/60">
        Pages: <span className="text-pine">{selected.label}</span>
      </p>
      <div className="mt-2 flex gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onSelect(o)}
            className={cn(
              "rounded-md border px-3 py-2 text-sm transition-colors",
              selected.id === o.id ? "border-olive bg-olive/10 text-pine" : "border-mist text-pine/70 hover:border-olive"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
