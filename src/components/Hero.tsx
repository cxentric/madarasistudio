import Link from "next/link";
import Image from "next/image";
import { KolamIcon } from "@/components/Icons";

export function Hero() {
  return (
    <section className="container-page grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="flex gap-6">
        <div className="hidden w-6 shrink-0 sm:block">
          <KolamColumn />
        </div>
        <div>
          <h1 className="max-w-xl font-display text-4xl leading-[1.1] text-pine sm:text-5xl">
            Your precious memories, bound in paper.
          </h1>
          <p className="mt-5 max-w-md text-pine/65">
            Photobooks, journals and planners built around the moments that shaped you — a trip you
            still talk about, a birthday worth remembering, the everyday mornings you'd live again.
            Personalise every cover and page yourself.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-md bg-olive px-5 py-3 text-sm font-medium text-ivory transition-opacity hover:opacity-90"
            >
              Start your photobook
            </Link>
            <Link
              href="/about"
              className="rounded-md border border-mist px-5 py-3 text-sm font-medium text-pine transition-colors hover:border-olive hover:text-olive"
            >
              Read our story
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center lg:justify-end">
        <div className="relative h-64 w-64 sm:h-80 sm:w-80">
          <Image
            src="/logo-badge.png"
            alt="Madarasi Studio — your precious moments, bound in paper"
            fill
            sizes="(min-width: 640px) 320px, 256px"
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}

function KolamColumn() {
  const dots = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 24 240" className="h-full w-6 text-olive/50" aria-hidden="true">
      {dots.map((i) => (
        <circle key={i} cx="12" cy={20 + i * 40} r="1.6" fill="currentColor" />
      ))}
      <path
        d={dots
          .slice(0, -1)
          .map((i) => {
            const y0 = 20 + i * 40;
            const y1 = y0 + 40;
            return `M 12 ${y0} C 24 ${y0 + 10}, 24 ${y1 - 10}, 12 ${y1}`;
          })
          .join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
