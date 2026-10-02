"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { experiences } from "../lib/experiences";

const filters = ["All", "Strength", "Mindfulness", "Movement", "Recovery"] as const;

export default function ClassAtlas() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [active, setActive] = useState<(typeof experiences)[number]["slug"]>(experiences[0].slug);
  const visible = useMemo(() => experiences.filter(item => filter === "All" || item.pillar === filter), [filter]);
  const featured = experiences.find(item => item.slug === active) || visible[0] || experiences[0];

  return <>
    <section className="atlas-opener">
      <div><p className="eyebrow">Classes and experiences / 02</p><h1>Find the practice<br/>that fits <em>today.</em></h1></div>
      <p>Eight distinct ways to move, breathe and recover. Browse slowly, follow your curiosity, then come try it in the studio.</p>
      <div className="atlas-marquee" aria-hidden="true"><span>MOVE · BUILD · BREATHE · FLY · RESET · REPEAT · MOVE · BUILD · BREATHE · FLY · RESET · REPEAT · </span></div>
    </section>

    <section className="atlas-browser">
      <div className="atlas-preview">
        <div className="atlas-photo" data-mask><Image key={featured.image} src={featured.image} alt={featured.type} fill priority sizes="(max-width: 900px) 100vw, 48vw"/><span>{featured.cue}</span></div>
        <div className="atlas-preview-meta"><p>{featured.pillar}</p><strong>{featured.type}</strong><span>{featured.duration}</span></div>
      </div>
      <div className="atlas-index">
        <div className="atlas-filters" role="group" aria-label="Filter experiences">{filters.map(item=><button type="button" aria-pressed={filter===item} className={filter===item?"active":""} key={item} onClick={()=>{setFilter(item); const next=experiences.find(x=>item==="All"||x.pillar===item); if(next) setActive(next.slug);}}>{item}</button>)}</div>
        <p className="atlas-count" aria-live="polite">{String(visible.length).padStart(2,"0")} experiences</p>
        <div className="atlas-list">{visible.map((item,index)=><Link href={`/classes/${item.slug}`} key={item.slug} onMouseEnter={()=>setActive(item.slug)} onFocus={()=>setActive(item.slug)} className={featured.slug===item.slug?"active":""}>
          <span>{String(index+1).padStart(2,"0")}</span><div><h2>{item.name}</h2><p>{item.type}</p></div><small>{item.level}</small><b>↗</b>
        </Link>)}</div>
      </div>
    </section>

    <section className="class-method">
      <div className="method-sticky"><p className="eyebrow light-text">Inside every session</p><h2>Clear guidance.<br/><em>Room to grow.</em></h2><p>Every format has its own energy, but the experience stays unmistakably Do Well.</p></div>
      <div className="method-steps">
        <article data-reveal><span>01</span><h3>Meet you where you are</h3><p>Your coach offers context, options and a way into the session—whether it is your first class or your fiftieth.</p></article>
        <article data-reveal><span>02</span><h3>Move with attention</h3><p>Technique comes before intensity. You understand what you are doing and why it matters.</p></article>
        <article data-reveal><span>03</span><h3>Leave with more</h3><p>Energy, confidence, calm or clarity. Every session is designed to carry into the rest of your day.</p></article>
      </div>
    </section>

    <section className="class-question" data-reveal><p className="eyebrow">Still choosing?</p><h2>Tell us how you want<br/>to feel when you leave.</h2><Link href="/visit">Let the studio guide you <span>↗</span></Link></section>
  </>;
}
