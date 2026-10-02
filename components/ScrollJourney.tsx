"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Chapter = {
  index: string; word: string; kicker: string; title: string;
  copy: string; image: string; href: string;
};

export default function ScrollJourney({ chapters }: { chapters: readonly Chapter[] }) {
  const root = useRef<HTMLElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const preference = matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setEnhanced(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = root.current;
    if (!section || !enhanced) return;
    const panels = Array.from(section.querySelectorAll<HTMLElement>(".chapter-list article"));
    const tabs = Array.from(section.querySelectorAll<HTMLElement>(".chapter-tabs button"));
    let frame = 0;
    let previous = -1;
    const clamp = (n: number) => Math.max(0, Math.min(1, n));
    const paint = () => {
      const bounds = section.getBoundingClientRect();
      const progress = clamp(-bounds.top / Math.max(1, bounds.height - innerHeight));
      const chapter = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
      if (chapter !== previous) { previous = chapter; setActive(chapter); }
      panels.forEach((panel, i) => {
        // Each photograph wipes upward across the transition between chapters.
        const reveal = i === 0 ? 1 : clamp((progress * chapters.length - i + .14) / .28);
        panel.style.setProperty("--chapter-reveal", reveal.toFixed(4));
        tabs[i]?.style.setProperty("--chapter-fill", clamp(progress * chapters.length - i).toFixed(4));
      });
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    paint();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [enhanced, chapters.length]);

  function jump(index: number) {
    const section = root.current;
    if (!section) return;
    const distance = section.offsetHeight - innerHeight;
    const start = section.getBoundingClientRect().top + scrollY;
    window.scrollTo({ top: start + distance * (index + .35) / chapters.length, behavior: "smooth" });
  }

  return <section className="chapter-journey" id="three-paths" ref={root} data-enhanced={enhanced} aria-label="The three Do Well paths">
    <div className="chapter-stage">
      <div className="chapter-heading"><p className="eyebrow light-text">Three practices. One connected life.</p><h2>Your rhythm,<br/>in three chapters.</h2></div>
      <div className="chapter-list">
        {chapters.map((chapter, i) => <article key={chapter.index} data-active={active === i} aria-hidden={enhanced && active !== i} inert={enhanced && active !== i}>
          <div className="chapter-photo"><Image src={chapter.image} alt={`${chapter.word.toLowerCase()} inspiration`} fill sizes="(max-width:900px) 100vw, 48vw"/></div>
          <div className="chapter-copy">
            <span className="chapter-numbers">{chapter.index} / 03 — {chapter.word}</span>
            <p className="eyebrow">{chapter.kicker}</p><h3>{chapter.title}</h3><p>{chapter.copy}</p>
            <Link href={chapter.href}>Explore {chapter.word.toLowerCase()} <b aria-hidden="true">↗</b></Link>
          </div>
        </article>)}
      </div>
      <div className="chapter-tabs" role="group" aria-label="Choose a wellness path">
        {chapters.map((chapter, i) => <button key={chapter.index} type="button" onClick={() => jump(i)} aria-pressed={active === i}>{chapter.word}</button>)}
      </div>
    </div>
  </section>;
}
