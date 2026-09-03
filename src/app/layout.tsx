import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIAssistantWidget } from "@/components/AIAssistantWidget";
import { AuthProvider } from "@/components/AuthProvider";
import { CartProvider } from "@/components/CartProvider";
import { CulturalAccents } from "@/components/CulturalAccents";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Madarasi Studio — Personalised photobooks, journals & planners",
  description:
    "Personalised photobooks, journals, planners and notebooks inspired by Madras — Marina mornings, Mylapore evenings, and filter kaapi rituals, bound your way.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <CulturalAccents />
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-[60vh]">{children}</main>
            <Footer />
            <AIAssistantWidget />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
