import { notFound } from "next/navigation";
import InfoPage from "../../../components/InfoPage";

const services = {
  sauna: {
    title: "Sauna",
    description: "A warm, unhurried part of the Do Reset recovery experience. Ask the studio team about session flow and preparation before your visit.",
    sections: [
      { title: "The experience", body: "Make room to pause in a considered studio setting. Sauna is one of the recovery rituals available as part of Do Reset; the team can explain how it fits into your visit." },
      { title: "Before your visit", body: "Session duration, preparation guidance and suitability information should be confirmed with the studio before booking. If you have a health concern, speak with a qualified professional before using heat-based recovery." },
    ],
  },
  "cold-plunge": {
    title: "Cold plunge",
    description: "A guided cold-water recovery experience. The studio team can share current session details and preparation guidance.",
    sections: [
      { title: "The session journey", body: "Do Reset brings recovery rituals together with guidance from the studio. Ask the team about the current cold-plunge session flow before your first visit." },
      { title: "Preparation and safety", body: "Operating temperatures, protocols, session duration and contraindications must be confirmed by qualified studio staff. If you have a health concern, consult a qualified professional before participating." },
    ],
  },
  "red-light-therapy": {
    title: "Red light therapy",
    description: "A calm light-based recovery experience within Do Reset. Contact the studio for current session information and safety guidance.",
    sections: [
      { title: "What to expect", body: "The studio includes red-light therapy among its recovery experiences. Team members can explain the setting and what a visit involves." },
      { title: "Duration and safety", body: "Session duration, preparation and suitability information should be supplied by qualified studio staff. This page makes no medical or treatment claims." },
    ],
  },
} as const;

export function generateStaticParams() { return Object.keys(services).map(slug => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];
  if (!service) return { title: "Recovery | Do Well Studio" };
  return { title: `${service.title} | Do Well Studio`, description: service.description };
}

export default async function RecoveryServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];
  if (!service) notFound();
  return <InfoPage eyebrow={`Do Reset / ${service.title}`} title="Make space to" accent="reset." intro={service.description} sections={[...service.sections, { title: "Ask the studio", body: "For current availability, session details and safety information, contact the Do Well team before planning your visit." }]} cta={`Enquire about ${service.title}`} href={`https://wa.me/918688217765?text=${encodeURIComponent(`Hi Do Well Studio, I'm interested in the ${service.title} recovery experience.`)}`} />;
}
