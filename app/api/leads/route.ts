import { NextResponse } from "next/server";
import { validateLead } from "../../../lib/lead-validation";
import { LeadConflictError, saveLead } from "../../../lib/lead-storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 16000) {
      return NextResponse.json({ success: false, message: "Your request is too long. Please shorten your message." }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const validated = validateLead(body);
  if (!validated.success) {
    return NextResponse.json({ success: false, message: validated.message }, { status: 400 });
  }

  try {
    const saved = await saveLead(validated.requestId, validated.details);
    return NextResponse.json({ success: true, requestId: saved.id }, { status: saved.duplicate ? 200 : 201 });
  } catch (error) {
    if (error instanceof LeadConflictError) {
      return NextResponse.json({ success: false, message: "Your previous request was already saved. Please refresh before making a new request." }, { status: 409 });
    }
    console.error("Unable to save a visit request:", (error as NodeJS.ErrnoException).code ?? "STORAGE_ERROR");
    return NextResponse.json({ success: false, message: "We could not save your request. Please try again or contact us on WhatsApp." }, { status: 500 });
  }
}
