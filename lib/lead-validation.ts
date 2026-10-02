import { experiences } from "./experiences";

export type LeadDetails = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  interest: string;
  preferredDay: string;
  preferredTime: string;
  message: string;
  consent: true;
};

type ValidationResult =
  | { success: true; requestId: string; details: LeadDetails }
  | { success: false; message: string };

const interests = new Set<string>(["membership", ...experiences.map(({ slug }) => slug)]);
const requestIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateLead(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { success: false, message: "Please check the request details." };
  }

  const body = input as Record<string, unknown>;
  const field = (name: string) => typeof body[name] === "string" ? body[name].trim() : "";
  const firstName = field("firstName");
  const lastName = field("lastName");
  const phone = field("phone");
  const email = field("email");
  const interest = field("interest");
  const preferredDay = field("preferredDay");
  const preferredTime = field("preferredTime");
  const message = field("message");
  const requestId = field("requestId");

  if (!requestIdPattern.test(requestId)) {
    return { success: false, message: "Please refresh the page and try again." };
  }
  if (firstName.length < 2 || firstName.length > 80 || lastName.length > 80) {
    return { success: false, message: "Please enter your first name (2–80 characters)." };
  }
  const phoneDigits = phone.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]+$/.test(phone) || phone.length > 30 || phoneDigits.length < 8 || phoneDigits.length > 15) {
    return { success: false, message: "Please enter a valid phone number, including your country code if needed." };
  }
  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return { success: false, message: "Please check your email address." };
  }
  if (!interests.has(interest)) {
    return { success: false, message: "Please choose an experience." };
  }
  if (preferredDay) {
    const parsedDay = new Date(`${preferredDay}T00:00:00.000Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDay) || Number.isNaN(parsedDay.getTime()) || parsedDay.toISOString().slice(0, 10) !== preferredDay) {
      return { success: false, message: "Please choose a valid preferred day." };
    }
  }
  if (preferredTime && !["Morning", "Afternoon", "Evening"].includes(preferredTime)) {
    return { success: false, message: "Please choose a preferred time." };
  }
  if (message.length > 2500) {
    return { success: false, message: "Please keep your message within 2,500 characters." };
  }
  if (body.consent !== true && body.consent !== "on") {
    return { success: false, message: "Please agree to be contacted before saving your request." };
  }

  return {
    success: true,
    requestId: requestId.toLowerCase(),
    details: { firstName, lastName, phone, email, interest, preferredDay, preferredTime, message, consent: true },
  };
}
