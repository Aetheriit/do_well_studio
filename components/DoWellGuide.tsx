"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { experienceHref, experiences } from "../lib/experiences";

const intentions = [
  { prompt: "Feel stronger", slug: "do-build", second: "do-transform", image: "/pillar-strength.webp", portrait: true, note: "Start with guided strength, then explore functional movement." },
  { prompt: "Find some quiet", slug: "do-flow", second: "do-fly", image: "/pillar-mindfulness.webp", portrait: false, note: "Begin with breath and movement, or discover balance in the hammock." },
  { prompt: "Move with energy", slug: "do-pulse", second: "do-build", image: "/do-pulse-editorial.webp", portrait: true, note: "Follow the rhythm in dance fitness, then build on it with strength." },
  { prompt: "Make room to recover", slug: "do-reset", second: "do-flow", image: "/pillar-recovery.webp", portrait: false, note: "Ask about the heat, cold and light rituals, then keep moving gently." },
] as const;

export default function DoWellGuide() {
  const [selected, setSelected] = useState(0);
  const intention = intentions[selected];
  const primary = experiences.find(item => item.slug === intention.slug)!;
  const secondary = experiences.find(item => item.slug === intention.second)!;
  const destination = experienceHref(primary.slug);

  return <section className="dw-guide" id="find-your-do" aria-labelledby="dw-guide-title">
    <div className="dw-guide-head">
      <p className="eyebrow">A place to begin / The Do Well edit</p>
      <h2 id="dw-guide-title">Come as you are.<br/><em>Choose how you want to feel.</em></h2>
      <p>Your practice can change from one day to the next. Follow a feeling and find a Do Well experience to explore.</p>
    </div>
    <div className="dw-guide-body">
      <div className="dw-guide-choices" role="group" aria-label="Choose what you want from your practice">
        {intentions.map((item, index) => <button key={item.slug} type="button" className={selected === index ? "is-active" : ""} aria-pressed={selected === index} onClick={() => setSelected(index)}>
          <span>{String(index + 1).padStart(2, "0")}</span><strong>{item.prompt}</strong><i aria-hidden="true">↗</i>
        </button>)}
        <p>Every route can be adapted in conversation with the studio team.</p>
      </div>
      <div className="dw-guide-result" aria-live="polite">
        <div className={`dw-guide-image${intention.portrait ? " dw-guide-image--portrait" : ""}`}><Image key={primary.slug} src={intention.image} alt={`Illustrative scene for ${primary.type}`} fill sizes="(max-width: 900px) 100vw, 50vw"/><span>THE WAY TO LIVE WELL / {String(selected + 1).padStart(2, "0")}</span></div>
        <div className="dw-guide-result-copy">
          <div><small>BEGIN WITH</small><h3>{primary.name}</h3><p>{primary.intro}</p></div>
          <div className="dw-guide-pair"><small>MAKE IT YOUR OWN</small><p>{intention.note}</p><span>Also explore <Link href={experienceHref(secondary.slug)}>{secondary.name} ↗</Link></span></div>
          <Link className="dw-guide-main-link" href={destination}>Explore {primary.name}<span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </div>
  </section>;
}
