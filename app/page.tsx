"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StudioNavigation } from "../components/SubpageShell";

const whatsappNumber = "918688217765";

const experiences = [
  { id: "01", name: "DO PULSE", type: "Dance Fitness", level: "All levels", tone: "terra", blurb: "Move with rhythm, build stamina and leave energised." },
  { id: "02", name: "DO FLOW", type: "Yoga", level: "All levels", tone: "sand", blurb: "Breath, balance and movement for a quieter mind." },
  { id: "03", name: "DO TRANSFORM", type: "Functional Training", level: "Beginner + moderate", tone: "olive", blurb: "Strength and mobility that carry into everyday life." },
  { id: "04", name: "DO BUILD", type: "Strength Training", level: "All levels", tone: "plum", blurb: "Guided training for strength, posture and confidence." },
  { id: "05", name: "DO GROW", type: "Kids Strength", level: "Beginner + intermediate", tone: "sage", blurb: "Safe movement that develops strong, confident kids." },
  { id: "06", name: "DO FLY", type: "Aerial Yoga", level: "All levels", tone: "clay", blurb: "Stretch deeper, move freely and discover a new balance." },
  { id: "07", name: "DO RESET", type: "Recovery", level: "All levels", tone: "deep", blurb: "Sauna, cold plunge and red light in one calm ritual." },
  { id: "08", name: "DO COMPLETE", type: "Unlimited Sessions", level: "Integrated wellness", tone: "linen", blurb: "The complete path through movement and recovery." },
];

const whatsappMessages = [
  ["Book a studio visit", "Hi Do Well Studio, I would like to book a studio visit."],
  ["Explore membership", "Hi Do Well Studio, I would like to learn about membership options."],
  ["Ask about classes", "Hi Do Well Studio, I would like to know more about your classes."],
  ["Discover recovery", "Hi Do Well Studio, I am interested in the Do Reset recovery experience."],
];

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [activeExperience, setActiveExperience] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!chatOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setChatOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [chatOpen]);

  const openWhatsApp = (message: string) => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");

  return <main>
    <StudioNavigation home scrolled={scrolled} />

    <section className="hero" id="top">
      <Image className="hero-image" src="/do-well-hero.png" alt="A calm premium wellness studio interior" fill priority sizes="100vw" />
      <div className="hero-shade" />
      <div className="hero-copy"><p className="eyebrow light-text"><span />Jubilee Hills · Hyderabad</p><h1>Find your way<br/>to <em>live well.</em></h1><p className="lead">Strength, mindfulness and recovery in one considered space—designed around the way real life feels.</p><div className="hero-actions"><a className="button button-light" href="/classes">Explore the studio <b>↗</b></a><button className="text-link light-text" onClick={() => setChatOpen(true)}>Book a visit <b>→</b></button></div></div>
      <div className="hero-side-note"><span>DO WELL</span><i/><span>BEYOND FITNESS</span></div><a className="scroll-cue" href="#philosophy"><span>Scroll to discover</span><i>↓</i></a>
    </section>

    <div className="ticker" aria-hidden="true"><div>STRENGTH <i>✦</i> MINDFULNESS <i>✦</i> RECOVERY <i>✦</i> MOVE BETTER <i>✦</i> FEEL STRONGER <i>✦</i> LIVE WELL <i>✦</i> STRENGTH <i>✦</i> MINDFULNESS <i>✦</i> RECOVERY</div></div>

    <section className="philosophy" id="philosophy">
      <div className="section-mark">01</div>
      <div className="philosophy-intro"><p className="eyebrow">The Do Well philosophy</p><h2>A wellness club<br/>for the whole <em>you.</em></h2></div>
      <div className="philosophy-copy"><p>Fitness is only one part of feeling well. At Do Well, purposeful movement, mindful practice and premium recovery work together to help you become stronger, more balanced and better restored.</p><a className="line-link" href="/story">The story behind our name <span>↗</span></a></div>
      <div className="pillar-grid"><article><span>01</span><h3>Strength</h3><p>Build power, mobility and body confidence with expert-led training.</p><a href="/classes">Discover movement →</a></article><article><span>02</span><h3>Mindfulness</h3><p>Reconnect through breath, balance, yoga and aerial movement.</p><a href="/classes">Find your flow →</a></article><article><span>03</span><h3>Recovery</h3><p>Reset with premium rituals for relaxation, restoration and return.</p><a href="/recovery">Enter recovery →</a></article></div>
    </section>

    <section className="class-explorer" id="classes">
      <div className="class-copy"><p className="eyebrow light-text">Choose your Do</p><h2>What do you<br/>want to do?</h2><p>Eight pathways. One connected approach to living well. Explore each experience to discover your next move.</p><div className={`experience-preview ${experiences[activeExperience].tone}`}><div><span>{experiences[activeExperience].id}</span><small>{activeExperience === 7 ? "FLEXIBLE" : "50 MINUTES"}</small></div><strong>{experiences[activeExperience].name}</strong><p>{experiences[activeExperience].blurb}</p><small>{experiences[activeExperience].level.toUpperCase()}</small></div></div>
      <div className="experience-list">{experiences.map((item, index) => <Link className={`experience-link ${activeExperience === index ? "active" : ""}`} href={`/classes/${item.name.toLowerCase().replaceAll(" ", "-")}`} onMouseEnter={() => setActiveExperience(index)} onFocus={() => setActiveExperience(index)} key={item.name}><span>{item.id}</span><strong>{item.name}</strong><small>{item.type}</small><b aria-hidden="true">↗</b></Link>)}</div>
    </section>

    <section className="story-section" id="story">
      <div className="story-visual"><Image src="/do-well-hero.png" alt="Do Well's considered wellness environment" fill sizes="(max-width: 800px) 100vw, 50vw" /><div className="story-stamp">THE WAY<br/>TO LIVE<br/>WELL</div></div>
      <div className="story-content"><p className="eyebrow">The meaning of Do Well</p><h2><em>DO</em> is the way.<br/><em>WELL</em> is how<br/>you live.</h2><p>The name draws from the Japanese idea of “Do”—a way or path. Paired with wellness, it becomes a daily practice: a path towards the best version of yourself.</p><div className="story-stats"><div><strong>03</strong><span>connected pillars</span></div><div><strong>08</strong><span>studio experiences</span></div><div><strong>01</strong><span>complete journey</span></div></div></div>
    </section>

    <section className="recovery" id="recovery">
      <header><div><p className="eyebrow">Do Reset / Recovery</p><h2>Train. Recover.<br/><em>Return stronger.</em></h2></div><p>Recovery is where the work settles in. Enter a calm, sensory space designed to help the body relax, reset and restore.</p></header>
      <div className="recovery-grid"><article className="sauna"><span>01</span><div><p className="eyebrow">Heat ritual</p><h3>Sauna</h3></div><Link className="ritual-card-link" href="/recovery#heat" aria-label="Explore the sauna ritual">Explore <span aria-hidden="true">↗</span></Link></article><article className="plunge"><span>02</span><div><p className="eyebrow">Cold ritual</p><h3>Cold Plunge</h3></div><Link className="ritual-card-link" href="/recovery#cold" aria-label="Explore the cold plunge ritual">Explore <span aria-hidden="true">↗</span></Link></article><article className="redlight"><span>03</span><div><p className="eyebrow">Light ritual</p><h3>Red Light</h3></div><Link className="ritual-card-link" href="/recovery#light" aria-label="Explore the red light ritual">Explore <span aria-hidden="true">↗</span></Link></article></div>
    </section>

    <section className="values"><p className="eyebrow">Designed around real life</p><div className="value-row"><span>01</span><h3>Considered</h3><p>Every detail has purpose—from the mood of the room to the way each session is guided.</p></div><div className="value-row"><span>02</span><h3>Personal</h3><p>Move at your level, follow your goals and find the mix of experiences that feels right.</p></div><div className="value-row"><span>03</span><h3>Complete</h3><p>Training, mindful movement and recovery come together under one roof.</p></div></section>

    <section className="visit" id="visit">
      <div className="visit-copy"><p className="eyebrow light-text">Visit the studio</p><h2>Your journey<br/>starts here.</h2><p>Come experience a more complete way to feel well. Tell our studio team what you’re looking for and we’ll help you find your place.</p><div><button className="button button-light" onClick={() => openWhatsApp(whatsappMessages[0][1])}>Book through WhatsApp <b>↗</b></button><a href="tel:+918688217765" className="text-link light-text">Call 86882 17765</a></div></div>
      <div className="visit-card"><p className="eyebrow">Do Well Studio</p><h3>Jubilee Hills</h3><p>2nd Floor, Plot No. 39, Road No. 5,<br/>opposite Metro Pillar 1571,<br/>Hyderabad, Telangana 500033</p><a href="https://maps.google.com/?q=Do+Well+Studio+Jubilee+Hills+Hyderabad" target="_blank" rel="noreferrer">Get directions <span>↗</span></a></div>
    </section>

    <footer><div className="footer-brand"><Image src="/do-well-logo.png" alt="Do Well Studio" width={360} height={150}/><p>Strength. Mindfulness. Recovery.<br/>Beyond Fitness.</p></div><div><p className="eyebrow">Explore</p><Link href="/classes">Classes</Link><Link href="/recovery">Recovery</Link><Link href="/story">Our story</Link><Link href="/visit">Visit us</Link></div><div><p className="eyebrow">Connect</p><button onClick={() => setChatOpen(true)}>WhatsApp</button><a href="tel:+918688217765">86882 17765</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Do Well Studio</span><span>Jubilee Hills · Hyderabad</span><span>Beyond fitness.</span></div></footer>

    {chatOpen && <aside className="concierge" id="whatsapp-concierge" aria-live="polite"><button className="close" onClick={() => setChatOpen(false)} aria-label="Close WhatsApp menu">×</button><p className="eyebrow">DO WELL CONCIERGE</p><h3>How can we help?</h3><p>Choose a topic to continue with the studio team.</p>{whatsappMessages.map(([label, message]) => <button key={label} onClick={() => openWhatsApp(message)}><span>{label}</span><b>↗</b></button>)}</aside>}
    <button className="chat-toggle" onClick={() => setChatOpen(!chatOpen)} aria-expanded={chatOpen} aria-controls="whatsapp-concierge"><span>✦</span>Talk to Do Well</button>
  </main>;
}
