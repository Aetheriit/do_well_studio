import { NextResponse } from "next/server";
import { enquiryUrl } from "../../../lib/whatsapp";

export function POST() {
  return NextResponse.json({
    success: false,
    message: "Please refresh the page. Enquiries now open directly in WhatsApp, where you can review your message and tap Send.",
    whatsappUrl: enquiryUrl("General enquiry", "I would like to enquire about Do Well Studio."),
  }, { status: 410 });
}
