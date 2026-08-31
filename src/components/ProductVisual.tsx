import { ICONS, type IconName } from "@/components/Icons";

export function ProductVisual({
  icon,
  colorHex = "#5C6B3E",
  wide = false,
  large = false,
}: {
  icon: IconName;
  colorHex?: string;
  wide?: boolean;
  large?: boolean;
}) {
  const Icon = ICONS[icon];
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-mist ${
        large ? "aspect-[4/5]" : wide ? "aspect-[16/9]" : "aspect-[4/5]"
      }`}
      style={{
        background: `radial-gradient(120% 120% at 20% 15%, ${colorHex}40, transparent 65%), linear-gradient(160deg, #FFFFFF, #F8F5EC)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(59,66,41,0.8) 1px, transparent 0)",
          backgroundSize: "16px 16px",
        }}
      />
      <Icon className={large ? "h-24 w-24" : "h-16 w-16"} style={{ color: colorHex }} />
    </div>
  );
}
