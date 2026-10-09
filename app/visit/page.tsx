"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import SubpageShell from "../../components/SubpageShell";
import { experiences } from "../../lib/experiences";
import { enquiryUrl, visitEnquiryUrl } from "../../lib/whatsapp";

export default function VisitPage() {
  const [whatsappHref, setWhatsappHref] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [interest, setInterest] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("interest");
    if (selected && (selected === "membership" || experiences.some(item => item.slug === selected))) {
      setInterest(selected === "do-complete" ? "membership" : selected);
    }
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "");
    if (field("firstName").trim().length < 2 || !/^\+?[\d\s().-]+$/.test(field("phone")) || field("phone").replace(/\D/g, "").length < 8) {
      setErrorMessage("Please enter your name and a valid phone number.");
      return;
    }
    const href = visitEnquiryUrl({
      firstName: field("firstName"), lastName: field("lastName"),
      phone: field("phone"), email: field("email"), interest: field("interest"),
      preferredDay: field("preferredDay"), preferredTime: field("preferredTime"),
      message: field("message"),
    });
    setWhatsappHref(href);
    window.location.assign(href);
  }

  function detailsChanged() {
    setWhatsappHref("");
    setErrorMessage("");
  }
  const faqs = [
    ["Can I visit before choosing a class?", "Yes. A studio visit is the best place to begin. Tell us how you want to feel and our team will introduce the spaces and suggest a starting point."],
    ["Do I need previous experience?", "No. Most experiences welcome all levels, and coaches provide clear options throughout the session."],
    ["What should I bring?", "Comfortable movement clothing and water are a good start. For recovery, our team will share preparation details before your visit."],
  ];
  return <SubpageShell><main className="sub-main visit-new-page">
    <section className="visit-opener">
      <div className="visit-opener-copy"><p className="eyebrow light-text">Visit Do Well / 05</p><h1>Come in<br/>with a <em>question.</em></h1><p>Leave with a clearer path through movement, mindfulness and recovery.</p><a href="#request">Plan your visit <span>↓</span></a></div>
      <div className="visit-opener-photo" data-mask><Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1700&q=88" alt="A light-filled interior with warm natural materials" fill priority sizes="(max-width:900px) 100vw, 54vw" data-parallax="0.06"/><div className="visit-photo-stamp">JUBILEE<br/>HILLS</div></div>
    </section>

    <section className="arrival-strip"><div><span>01</span><strong>Tell us what you need</strong></div><i>→</i><div><span>02</span><strong>Meet the studio</strong></div><i>→</i><div><span>03</span><strong>Find your first Do</strong></div></section>

    <section className="visit-contact">
      <div className="visit-address" data-reveal><p className="eyebrow">Find us</p><h2>In the heart of<br/>Jubilee Hills.</h2><p>2nd Floor, Plot No. 39, Road No. 5,<br/>opposite Metro Pillar 1571,<br/>Hyderabad, Telangana 500033</p><div><a href="https://maps.google.com/?q=Do+Well+Studio+Jubilee+Hills+Hyderabad" target="_blank" rel="noreferrer">Open in maps <span>↗</span></a><a href={enquiryUrl("Studio visit", "I would like to speak with the Do Well Studio team about an enquiry.")} target="_blank" rel="noopener noreferrer">WhatsApp 86882 17765 <span>↗</span></a><a href={enquiryUrl("Studio visit", "I would like to book a visit.")} target="_blank" rel="noreferrer">Chat on WhatsApp <span>↗</span></a></div></div>
      <div className="visit-map" aria-label="Stylised map showing the Do Well Studio location"><div className="map-road road-a">ROAD NO. 5</div><div className="map-road road-b">JUBILEE HILLS</div><span className="map-pin"><i/>DO WELL<br/>STUDIO</span><small>Opp. Metro Pillar 1571</small></div>
    </section>

    <section className="request-section" id="request">
      <div className="request-intro"><p className="eyebrow light-text">Enquire on WhatsApp</p><h2>We will help you<br/><em>find your way in.</em></h2><p>Share what you have in mind. Your details open in a WhatsApp message to the studio. Review the message and tap Send to make your enquiry.</p><div><span>Prefer a quick question?</span><a href={enquiryUrl("Studio visit", "I would like to plan a visit. Please share availability and how to prepare.")} target="_blank" rel="noopener noreferrer">Continue on WhatsApp ↗</a></div></div>
      <form className="visit-form new-visit-form" onSubmit={submit} onChange={detailsChanged}>
        <label>First name *<input name="firstName" autoComplete="given-name" minLength={2} maxLength={80} required placeholder="Your first name" /></label><label>Last name<input name="lastName" autoComplete="family-name" maxLength={80} placeholder="Your last name" /></label>
        <label>Phone *<input name="phone" autoComplete="tel" type="tel" minLength={8} maxLength={30} required placeholder="+91" /></label><label>Email<input name="email" autoComplete="email" type="email" maxLength={254} placeholder="you@email.com" /></label>
        <label className="wide">What brings you here? *<select name="interest" required value={interest} onChange={event => setInterest(event.target.value)}><option value="" disabled>Select an experience</option><option value="help-choosing">I need help choosing</option><option value="membership">Membership — DO COMPLETE</option>{experiences.filter(item => item.slug !== "do-complete").map(item=><option key={item.slug} value={item.slug}>{item.name} — {item.type}</option>)}</select></label>
        <label>Preferred day<input name="preferredDay" type="date" /></label><label>Preferred time<select name="preferredTime" defaultValue=""><option value="">Choose a time (optional)</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
        <label className="wide">Anything we should know?<textarea name="message" rows={4} maxLength={2500} placeholder="Goals, questions or anything that helps us prepare."/></label>
        <label className="consent wide"><input type="checkbox" required name="consent" /> I agree to share these details with Do Well Studio on WhatsApp.</label>
        <button className="button form-submit">Continue enquiry on WhatsApp <b aria-hidden="true">↗</b></button>
        {whatsappHref && <div className="form-message success" role="status"><strong>Your WhatsApp message is ready.</strong><span>Tap Send in WhatsApp to deliver it. If WhatsApp did not open, <a href={whatsappHref}>open your enquiry here ↗</a>.</span></div>}
        {errorMessage && <div className="form-message" role="alert"><strong>Your enquiry needs attention.</strong><span>{errorMessage}</span></div>}
      </form>
    </section>

    <section className="visit-faq"><p className="eyebrow">Before your first visit</p><div>{faqs.map(([question,answer],index)=><article className={openFaq===index?"open":""} key={question}><button type="button" id={`faq-question-${index}`} aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} onClick={()=>setOpenFaq(openFaq===index?-1:index)}><span>0{index+1}</span><strong>{question}</strong><i aria-hidden="true">{openFaq===index?"−":"+"}</i></button><p id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={openFaq !== index}>{answer}</p></article>)}</div></section>
  </main></SubpageShell>;
}
