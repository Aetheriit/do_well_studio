import type { Metadata } from "next";
import RevealObserver from "../components/RevealObserver";
import "./globals.css";
import "./motion.css";

export const metadata: Metadata = {
  title: "Do Well Studio | Beyond Fitness",
  description: "Strength, mindfulness and recovery in Jubilee Hills, Hyderabad.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><RevealObserver />{children}</body></html>;
}
