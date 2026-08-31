import Link from "next/link";
import { ICONS, type IconName } from "@/components/Icons";

export function CategoryTile({ name, icon, href }: { name: string; icon: IconName; href: string }) {
  const Icon = ICONS[icon];
  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-3 rounded-xl border border-mist bg-cloud/50 px-4 py-8 text-center transition-colors hover:border-olive/50"
    >
      <Icon className="h-9 w-9 text-olive transition-transform group-hover:scale-110" />
      <span className="font-display text-sm text-pine">{name}</span>
    </Link>
  );
}
