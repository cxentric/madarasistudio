import Link from "next/link";
import { KolamIcon, GopuramIcon } from "@/components/Icons";

export function Hero() {
  return (
    <section className="container-page grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="flex gap-6">
        <div className="hidden w-6 shrink-0 sm:block">
          <KolamColumn />
        </div>
        <div>
          <h1 className="max-w-xl font-display text-4xl leading-[1.1] text-pine sm:text-5xl">
            Your Madras, bound in paper.
          </h1>
          <p className="mt-5 max-w-md text-pine/65">
            Photobooks, journals and planners built around the city that shaped you — Marina walks,
            Mylapore evenings, filter kaapi at seven. Personalise every cover and page yourself.
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
        <BookMockup />
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

function BookMockup() {
  return (
    <div className="relative h-72 w-56 rotate-[4deg] rounded-lg border border-olive/30 bg-gradient-to-br from-cloud to-ivory p-6 shadow-2xl sm:h-80 sm:w-64">
      <div className="absolute inset-3 rounded-md border border-mist" />
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <GopuramIcon className="h-14 w-14 text-olive" />
        <div>
          <p className="font-display text-lg text-pine">Marina Mornings</p>
          <p className="mt-1 text-xs text-pine/40">A Madarasi photobook</p>
        </div>
      </div>
      <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rotate-[-6deg] rounded-lg bg-rust/40" />
    </div>
  );
}
