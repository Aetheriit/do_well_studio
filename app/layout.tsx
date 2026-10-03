import type { Metadata } from "next";
import RevealObserver from "../components/RevealObserver";
import LogoIntro from "../components/LogoIntro";
import "./globals.css";
import "./motion.css";
import "./refinements.css";
import "./product-pages.css";
import "./logo-motion.css";
import "./side-text-motion.css";
import "./glass-actions.css";
import "./reference-upgrades.css";
import "./typography-polish.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3010"),
  title: "Do Well Studio | Beyond Fitness",
  description: "Strength, mindfulness and recovery in Jubilee Hills, Hyderabad.",
  openGraph: { type: "website", siteName: "Do Well Studio", title: "Do Well Studio | Beyond Fitness", description: "Strength, mindfulness and recovery in Jubilee Hills, Hyderabad.", images: ["/do-well-hero.png"] },
  robots: process.env.NODE_ENV === "production" && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production") ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><LogoIntro /><RevealObserver />{children}</body></html>;
}
