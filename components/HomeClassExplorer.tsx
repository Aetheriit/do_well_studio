"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { experienceHref, experiences } from "../lib/experiences";

export default function HomeClassExplorer() {
  const initialExperience = experiences.find((item) => item.slug === "do-flow") ?? experiences[0];
  const [activeSlug, setActiveSlug] = useState<(typeof experiences)[number]["slug"]>(initialExperience.slug);
  const featured = experiences.find((item) => item.slug === activeSlug) ?? experiences[0];

  return (
    <section className="class-explorer" aria-labelledby="home-classes-title">
      <div className="home-experience-stage">
        <div className="class-copy">
          <p className="eyebrow light-text" data-slide-text="from-left">Choose your Do</p>
          <h2 id="home-classes-title" data-slide-text="from-left" data-slide-delay="1">What do you<br/><em>want to do?</em></h2>
          <p data-slide-text="from-left" data-slide-delay="2">Eight distinct ways to move, breathe and recover. Start with curiosity; the studio can help you find your rhythm.</p>
          <Link className="button button-light" href="/classes">Explore all experiences <b aria-hidden="true">↗</b></Link>
        </div>

        <Link className="home-experience-preview" href={experienceHref(featured.slug)} aria-label={`Explore ${featured.name}, ${featured.type}`}>
          <Image key={featured.slug} src={featured.image} alt={`Illustrative movement scene for ${featured.name}`} fill sizes="(max-width: 900px) 100vw, 42vw" />
          <span className="home-preview-index">{String(experiences.findIndex((item) => item.slug === featured.slug) + 1).padStart(2, "0")} / 08</span>
          <span className="home-preview-copy"><strong>{featured.name}</strong><small>{featured.cue}</small></span>
          <span className="home-preview-arrow" aria-hidden="true">↗</span>
        </Link>
      </div>

      <nav className="experience-list" aria-label="Explore studio experiences">
        {experiences.map((item, index) => (
          <Link
            href={experienceHref(item.slug)}
            key={item.slug}
            className={`experience-link${featured.slug === item.slug ? " active" : ""}`}
            data-featured={featured.slug === item.slug ? "true" : undefined}
            onMouseEnter={() => setActiveSlug(item.slug)}
            onFocus={() => setActiveSlug(item.slug)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.name}</strong>
            <small>{item.type}</small>
            <b aria-hidden="true">↗</b>
          </Link>
        ))}
      </nav>
    </section>
  );
}
