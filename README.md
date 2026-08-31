# Madarasi Studio

A personalised photobooks, journals, planners & notebooks shop, themed around Madras/Chennai —
built with Next.js 14 (App Router), Tailwind CSS, NextAuth, Prisma, and an AI ordering assistant
powered by the Anthropic API.

This is a **template**, not a finished production store: the product catalog, copy, and visuals
are original placeholder content you should replace with your own photography, pricing, and legal
pages before launch. It's wired up so every real feature (sign-in, AI assistant, payments) works
as soon as you add your own credentials.

## What's inside

- **Storefront** — home, shop with category filters, product detail pages with color/personalisation
  options, cart, and checkout.
- **Ask your Madarasi!** — an AI assistant (floating widget + inline on product/checkout pages) that
  suggests products, cover colours, and personalisation ideas, backed by the Anthropic API.
- **Sign-in** — Google, Apple, email magic link, and phone number (OTP via SMS), all through
  [NextAuth](https://next-auth.js.org/).
- **Checkout** — a Razorpay integration stub (swap for Stripe if you ship outside India).
- **Design** — a bright, pastel palette (olive green, half-white, light grey) and original
  line-art icons (no stock photography, so there's nothing to license or replace before you go
  live with your own visuals).

## 1. Local setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` as you complete the steps below, then:

```bash
npx prisma migrate dev --name init   # creates the database tables
npm run dev                          # http://localhost:3000
```

The site runs with **zero configuration** beyond a database: sign-in providers, the AI assistant,
and payments each quietly disable themselves (with a console warning) until their env vars are
set, so you can build the frontend before wiring up every backend service.

## 2. Database (required)

Sign-in (all four methods) and phone OTP storage need Postgres.

- Easiest: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or
  [Neon](https://neon.tech) (both have a free tier) — copy the connection string into
  `DATABASE_URL`.
- Then run `npx prisma migrate dev --name init` locally, and add a `prisma migrate deploy` step to
  your Vercel build (see step 7).

## 3. Sign-in providers

You don't need all four before launch — each one activates independently once its env vars exist.

### Google

1. [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials →
   **Create Credentials → OAuth client ID** → Web application.
2. Authorized redirect URI: `https://YOUR_DOMAIN/api/auth/callback/google` (and
   `http://localhost:3000/api/auth/callback/google` for local dev).
3. Copy the client ID/secret into `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`.

### Apple

1. [Apple Developer](https://developer.apple.com/account) → Certificates, Identifiers & Profiles:
   - Create an **App ID** (if you don't have one) with "Sign in with Apple" enabled.
   - Create a **Services ID** — this is your `APPLE_CLIENT_ID` (e.g. `com.madarasistudio.web`).
     Configure it with return URL `https://YOUR_DOMAIN/api/auth/callback/apple`.
   - Create a **Sign in with Apple key**, download the `.p8` file, and note the Key ID and Team ID.
2. Apple doesn't hand you a client secret — you generate a short-lived JWT yourself:
   ```bash
   npm install jsonwebtoken --no-save
   node scripts/generate-apple-client-secret.mjs
   ```
   (Fill in your Team ID, Services ID, Key ID, and the path to your `.p8` file at the top of that
   script first.) Paste the output into `APPLE_CLIENT_SECRET`.
3. This secret **expires after 6 months** — set a reminder to regenerate it.

### Email (magic link)

Uses SMTP, so any provider works — [Resend](https://resend.com), Postmark, or your own mailbox.

```
EMAIL_SERVER_HOST=smtp.resend.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=resend
EMAIL_SERVER_PASSWORD=your_resend_api_key
EMAIL_FROM="Madarasi Studio <hello@yourdomain.com>"
```

### Phone (OTP)

The sign-in page collects a phone number, sends a 6-digit code, and verifies it against a hash
stored in your database — no third party sees the raw code except the SMS gateway delivering it.

- **Twilio** (default in `/api/phone/send-otp`): create an account, buy a number or set up a
  [Messaging Service](https://www.twilio.com/docs/messaging/services), and set
  `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_VERIFY_SERVICE_SID` (the Messaging Service
  SID).
- **Shipping to Indian numbers?** SMS with promotional/transactional sender IDs in India needs
  [DLT registration](https://www.trai.gov.in/) — most teams find
  [MSG91](https://msg91.com) or [Kaleyra](https://www.kaleyra.com/) easier to get DLT-approved
  quickly than Twilio. Swap the fetch call in `src/app/api/phone/send-otp/route.ts` for your
  provider's API; the OTP generation/hashing/storage logic doesn't need to change.
- No SMS provider configured yet? The OTP is logged to your server console instead, so you can
  test the full flow locally before signing up for anything.

## 4. AI ordering assistant

1. Get an API key from the [Anthropic Console](https://console.anthropic.com/).
2. Set `ANTHROPIC_API_KEY`.
3. That's it — "Ask your Madarasi!" (the floating button, and the inline assistant on product and
   checkout pages) will start responding. The model is set in
   `src/app/api/assistant/route.ts` (`claude-haiku-4-5-20251001` by default, for speed and low
   cost); swap in a different Claude model there if you want more elaborate suggestions. The
   system prompt only lets it recommend products that actually exist in `src/lib/products.ts` —
   update that file and the assistant's knowledge updates with it.

## 5. Payments

The checkout page uses [Razorpay](https://razorpay.com) (common for Indian businesses — UPI,
cards, India GST invoicing, etc.). Get `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` from your
Razorpay dashboard's API Keys section.

Shipping outside India, or prefer Stripe? Replace `src/app/api/checkout/route.ts` (order creation)
and the `window.Razorpay(...)` call in `src/app/checkout/page.tsx` with Stripe's Checkout Session
flow — the rest of the page (cart summary, address form, AI assistant) doesn't need to change.

**Before going live**, add order persistence (the `Order` model is already in
`prisma/schema.prisma` but isn't written to yet — save the order in `/api/checkout` once payment
succeeds) and a webhook to confirm payment status server-side rather than trusting the client's
`handler` callback alone.

## 6. Replacing the placeholder visuals

Every image on this site is hand-drawn SVG (see `src/components/Icons.tsx` and
`ProductVisual.tsx`) rather than stock photography — that was a deliberate choice so the template
ships with nothing to re-license. When you have real product photography:

1. Add your image host to `remotePatterns` in `next.config.mjs`.
2. Swap `<ProductVisual icon={...} />` in `ProductCard.tsx` and the product page for a Next.js
   `<Image />` pointing at your photo.
3. Keep the icons if you like the illustrated look for category tiles and empty states — they're
   plain React components (`<GopuramIcon className="h-6 w-6 text-olive" />`) you can drop anywhere.

## 7. Deploying

### Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/madarasi-studio.git
git push -u origin main
```

### Deploy on Vercel

1. [vercel.com/new](https://vercel.com/new) → import the GitHub repo.
2. Framework preset: Next.js (auto-detected).
3. Add every variable from `.env.example` under **Settings → Environment Variables** (use your
   real values, and set `NEXTAUTH_URL` to your production URL, e.g. `https://madarasistudio.com`).
4. Under **Settings → Build & Development Settings**, set the build command to:
   ```
   npx prisma migrate deploy && next build
   ```
   so your database schema stays in sync on every deploy.
5. Deploy. Update each provider's redirect URI (Google, Apple) to your production domain once you
   have it.

## Project structure

```
src/
  app/
    page.tsx                 Home
    shop/page.tsx             Shop with category filter
    product/[slug]/page.tsx   Product detail
    cart/page.tsx             Cart
    checkout/page.tsx         Checkout + Razorpay + AI assistant
    about/page.tsx            Brand story
    auth/signin/page.tsx      Google / Apple / email / phone sign-in
    api/
      auth/[...nextauth]/     NextAuth route
      assistant/               AI assistant endpoint (Anthropic API)
      phone/send-otp/          Sends & stores phone OTP
      checkout/                Creates a Razorpay order
  components/                 Navbar, Footer, product cards, icons, AI widget, cart context
  lib/                        auth config, product catalog, OTP helpers, utils
prisma/schema.prisma          Users, accounts, sessions, phone OTP, orders
```

## License

This template is provided as a starting point for your own store — customize freely.
