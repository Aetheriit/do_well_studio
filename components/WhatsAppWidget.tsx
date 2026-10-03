"use client";

import { useEffect, useRef, useState } from "react";

const intents = [
  ["Book a visit", "I'd like to book a visit and learn more about the studio."],
  ["Membership", "I'd like to understand the membership options and visit the studio."],
  ["Ask about classes", "I'd like to know more about the available classes."],
  ["Recovery", "I'm interested in the Do Reset recovery experience."],
  ["Speak to front desk", "Could I speak with someone at the front desk?"],
] as const;

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); };
  }, [open]);

  return <>
    {open && <div className="whatsapp-panel" id="whatsapp-panel" ref={panelRef} aria-label="Contact Do Well on WhatsApp">
      <p className="eyebrow">A note to the studio</p><h2>Welcome to Do Well.</h2><p>How can we help?</p>
      <div>{intents.map(([label,message])=><a key={label} href={`https://wa.me/918688217765?text=${encodeURIComponent(`Hi Do Well Studio,\n\n${message}`)}`} target="_blank" rel="noopener noreferrer" onClick={()=>setOpen(false)}>{label}<span aria-hidden="true">↗</span></a>)}</div>
    </div>}
    <button ref={buttonRef} className="studio-whatsapp" type="button" aria-expanded={open} aria-controls="whatsapp-panel" onClick={()=>setOpen(value=>!value)}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.6a8 8 0 0 1-11.9 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="m8.5 7.5 1.2 2-1 1.1c.8 1.7 1.7 2.6 3.4 3.4l1.1-1 2 1.2c.1 1.4-.8 2.1-2 1.8-3.4-.7-6.1-3.4-6.8-6.8-.3-1.2.7-2.2 2.1-1.7Z" fill="currentColor"/></svg>
      <span>{open ? "Close" : "Talk to Do Well"}</span><span className="studio-whatsapp-arrow" aria-hidden="true">{open ? "−" : "↗"}</span>
    </button>
  </>;
}
