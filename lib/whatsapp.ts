import { experiences } from "./experiences";

export const DO_WELL_WHATSAPP_NUMBER = "918688217765";

export function whatsappUrl(message: string) {
  return `https://wa.me/${DO_WELL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function enquiryUrl(topic: string, message: string, regarding?: string) {
  return whatsappUrl([
    "Hi Do Well Studio,",
    "",
    `*Enquiry:* ${topic}`,
    ...(regarding ? [`*Regarding:* ${regarding}`] : []),
    "",
    message,
  ].join("\n"));
}

export function experienceLabel(interest: string) {
  if (interest === "membership") return "DO COMPLETE — Integrated Membership";
  if (interest === "help-choosing") return "Help choosing an experience";
  const experience = experiences.find(item => item.slug === interest);
  return experience ? `${experience.name} — ${experience.type}` : interest;
}

export function experienceEnquiryUrl(interest: string, topic = "Experience enquiry") {
  return enquiryUrl(topic, "Please share the current details, availability and how to get started.", experienceLabel(interest));
}

export function pageEnquiryContext(pathname: string) {
  const slug = pathname.split("/").filter(Boolean).at(-1) ?? "";
  const recovery: Record<string, string> = {
    sauna: "Sauna — Do Reset",
    "cold-plunge": "Cold Plunge — Do Reset",
    "red-light-therapy": "Red Light Therapy — Do Reset",
  };
  if (pathname.startsWith("/classes/") && experiences.some(item => item.slug === slug)) return experienceLabel(slug);
  if (pathname.startsWith("/recovery/") && recovery[slug]) return recovery[slug];
  const pages: Record<string, string> = {
    "/membership": experienceLabel("membership"),
    "/recovery": experienceLabel("do-reset"),
    "/classes": "Studio classes",
    "/schedule": "Class schedule and availability",
    "/coaches": "Studio coaches",
    "/visit": "Studio visit",
    "/contact": "Contact the studio",
    "/experience": "The Do Well experience",
    "/our-story": "About Do Well Studio",
    "/story": "About Do Well Studio",
    "/privacy": "Privacy enquiry",
    "/terms": "Website and booking terms",
  };
  return pages[pathname];
}

export type VisitEnquiry = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  interest: string;
  preferredDay: string;
  preferredTime: string;
  message: string;
};

export function visitEnquiryUrl(details: VisitEnquiry) {
  return whatsappUrl([
    "Hi Do Well Studio,",
    "",
    "*Studio visit enquiry*",
    `*First name:* ${details.firstName}`,
    ...(details.lastName ? [`*Last name:* ${details.lastName}`] : []),
    `*Phone:* ${details.phone}`,
    ...(details.email ? [`*Email:* ${details.email}`] : []),
    `*Experience / interest:* ${experienceLabel(details.interest)}`,
    ...(details.preferredDay ? [`*Preferred day:* ${details.preferredDay}`] : []),
    ...(details.preferredTime ? [`*Preferred time:* ${details.preferredTime}`] : []),
    ...(details.message ? ["", "*Message:*", details.message] : []),
  ].join("\n"));
}
