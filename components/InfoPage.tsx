import Image from "next/image";
import Link from "next/link";
import SubpageShell from "./SubpageShell";

type Section = { eyebrow?: string; title: string; body: string; items?: string[] };

export default function InfoPage({
  eyebrow,
  title,
  accent,
  intro,
  image,
  imageAlt = "",
  sections,
  cta = "Plan a studio visit",
  href = "/visit",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  sections: Section[];
  cta?: string;
  href?: string;
}) {
  return <SubpageShell><main className="sub-main info-page">
    <section className={`info-hero ${image ? "info-hero-with-image" : ""}`}>
      {image && <><Image src={image} alt={imageAlt} fill priority sizes="100vw"/><div className="info-hero-shade"/></>}
      <div className="info-hero-copy"><p className="eyebrow">{eyebrow}</p><h1>{title}{accent && <> <em>{accent}</em></>}</h1><p>{intro}</p><Link className="button button-light" href={href}>{cta} <b aria-hidden="true">↗</b></Link></div>
    </section>
    <div className="info-sections">{sections.map((section,index)=><section className="info-section" key={section.title} data-reveal>
      <span className="info-index">{String(index+1).padStart(2,"0")}</span>
      <div><p className="eyebrow">{section.eyebrow ?? eyebrow}</p><h2>{section.title}</h2><p>{section.body}</p>{section.items && <ul>{section.items.map(item=><li key={item}>{item}</li>)}</ul>}</div>
    </section>)}</div>
    <section className="info-endcap"><p className="eyebrow">A thoughtful place to begin</p><h2>Find your way<br/>to <em>Do Well.</em></h2><Link className="line-link" href={href}>{cta}<span aria-hidden="true">↗</span></Link></section>
  </main></SubpageShell>;
}
