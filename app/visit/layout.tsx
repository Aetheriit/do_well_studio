import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visit Do Well Studio | Jubilee Hills",
  description: "Plan your first visit to Do Well Studio in Jubilee Hills, Hyderabad.",
};

export default function VisitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
