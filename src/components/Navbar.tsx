"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/components/CartProvider";
import { categories } from "@/lib/products";

export function Navbar() {
  const { data: session, status } = useSession();
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-mist bg-ivory/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="shrink-0 font-display text-xl tracking-tight text-pine">
          Madarasi <span className="text-olive">Studio</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-pine/80 md:flex">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/shop?category=${encodeURIComponent(cat)}`}
              className="transition-colors hover:text-olive"
            >
              {cat}
            </Link>
          ))}
          <Link href="/about" className="transition-colors hover:text-olive">
            Our story
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {status === "authenticated" ? (
            <button
              onClick={() => signOut()}
              className="hidden text-sm text-pine/80 transition-colors hover:text-olive sm:inline"
            >
              {session.user?.name?.split(" ")[0] ?? "Account"} · Sign out
            </button>
          ) : (
            <Link href="/auth/signin" className="hidden text-sm text-pine/80 transition-colors hover:text-olive sm:inline">
              Sign in
            </Link>
          )}

          <Link href="/cart" className="relative text-pine transition-colors hover:text-olive" aria-label="Bag">
            <BagIcon className="h-6 w-6" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-olive px-1 text-[10px] font-medium text-ivory">
                {count}
              </span>
            )}
          </Link>

          <button
            className="text-pine md:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-mist bg-ivory md:hidden">
          <nav className="container-page flex flex-col gap-1 py-3 text-sm text-pine/85">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/shop?category=${encodeURIComponent(cat)}`}
                className="rounded px-2 py-2 hover:bg-cloud"
                onClick={() => setMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}
            <Link href="/about" className="rounded px-2 py-2 hover:bg-cloud" onClick={() => setMenuOpen(false)}>
              Our story
            </Link>
            {status === "authenticated" ? (
              <button onClick={() => signOut()} className="rounded px-2 py-2 text-left hover:bg-cloud">
                Sign out
              </button>
            ) : (
              <Link href="/auth/signin" className="rounded px-2 py-2 hover:bg-cloud" onClick={() => setMenuOpen(false)}>
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function BagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 8h12l-1 12.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5L6 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
