import type { MetadataRoute } from "next";
import { experiences } from "../lib/experiences";
import { journalEntries } from "../lib/journal";

const routes = ["/", "/experience", "/our-story", "/classes", "/recovery", "/schedule", "/coaches", "/membership", "/visit", "/contact", "/journal", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  if (!origin || process.env.NODE_ENV !== "production") return [];
  const base = origin.replace(/\/$/, "");
  const paths = [
    ...routes,
    ...experiences.filter(item => item.slug !== "do-reset" && item.slug !== "do-complete").map(item => `/classes/${item.slug}`),
    ...journalEntries.map(item => `/journal/${item.slug}`),
    "/recovery/sauna",
    "/recovery/cold-plunge",
    "/recovery/red-light-therapy",
  ];
  return paths.map(path => ({ url: `${base}${path}`, changeFrequency: "weekly", priority: path === "/" ? 1 : path === "/classes" || path === "/recovery" ? 0.9 : 0.65 }));
}
