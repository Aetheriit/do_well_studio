import type { CSSProperties } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import SubpageShell from "../../../components/SubpageShell";
import { experiences } from "../../../lib/experiences";

export function generateStaticParams() { return experiences.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = experiences.find((entry) => entry.slug === slug);
  return item ? { title: `${item.name} | Do Well Studio`, description: item.intro } : {};
}

export default async function ClassDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = experiences.find((entry) => entry.slug === slug); if (!item) notFound();
  const index = experiences.findIndex((entry) => entry.slug === slug);
  const next = experiences[(index + 1) % experiences.length];
  const style = { "--experience-accent": item.accent } as CSSProperties;
  return <SubpageShell><main className="sub-main class-detail-new" style={style}>
    <section className="class-cinematic">
      <Image src={item.image} alt={`${item.name} ${item.type}`} fill priority sizes="100vw" data-parallax="0.06"/>
      <div className="class-cinematic-shade"/>
      <div className="class-cinematic-title"><p className="eyebrow light-text">{item.pillar} / {String(index + 1).padStart(2,"0")}</p><h1>{item.name}</h1><p>{item.type}</p></div>
      <p className="cinematic-cue">{item.cue}</p>
      <div className="cinematic-meta"><span><small>Duration</small>{item.duration}</span><span><small>Experience</small>{item.level}</span></div>
    </section>

    <section className="class-declaration"><p className="eyebrow">The experience</p><h2>{item.intro}</h2><div><p>Guided with care and clear technique, every session balances challenge with support. You can focus on the work because the room, coach and sequence have already considered the rest.</p><Link href={`/visit?interest=${item.slug}`}>Book your first session <span>↗</span></Link></div></section>

    <section className="session-arc">
      <div className="session-arc-heading"><p className="eyebrow light-text">{item.duration === "Flexible" ? "Your weekly rhythm" : "Your session arc"}</p><h2>{item.duration === "Flexible" ? <>Your whole week,<br/>built around<br/>feeling well.</> : <>Fifty minutes,<br/>with a reason<br/>for every one.</>}</h2></div>
      <div className="session-steps">{item.session.map((step,i)=><article key={step} data-reveal><span>0{i+1}</span><strong>{step}</strong><i><b style={{width:`${48+i*21}%`}}/></i><small>{i===0?"ARRIVE":i===1?"EXPLORE":"INTEGRATE"}</small></article>)}</div>
    </section>

    <section className="class-focus-new">
      <div className="focus-photo" data-mask><Image src={item.image} alt="The class in motion" fill sizes="(max-width:900px) 100vw, 50vw" data-parallax="0.08"/></div>
      <div><p className="eyebrow">What it develops</p><h2>Progress you can<br/>feel in real life.</h2><div className="focus-chips">{item.focus.map((focus,i)=><span key={focus}><small>0{i+1}</small>{focus}</span>)}</div><p>Results arrive through regular practice. Your coach can help you choose a frequency and complementary sessions that suit your goals.</p></div>
    </section>

    <section className="first-session"><p className="eyebrow">Your first time</p><div><h2>Come as you are.</h2><p>Arrive ten minutes early in comfortable movement clothing. Let the team know it is your first session and share any injury, condition or concern with your coach before class.</p></div><Link className="button" href={`/visit?interest=${item.slug}`}>Plan your visit <b>↗</b></Link></section>

    <Link className="next-class-cinematic" href={`/classes/${next.slug}`}><Image src={next.image} alt="" fill sizes="100vw"/><div/><small>Continue exploring</small><strong>{next.name}</strong><span>Next ↗</span></Link>
  </main></SubpageShell>;
}
