import { enquiryUrl } from "../../lib/whatsapp";
import Link from "next/link";
import SubpageShell from "../../components/SubpageShell";
import { experiences } from "../../lib/experiences";

export const metadata = {
  title: "Class Schedule | Do Well Studio, Jubilee Hills",
  description: "Explore Do Well's strength, movement, mindfulness and recovery experiences, then ask the studio for current class times and availability.",
};

const groups = [
  { name: "Strength & movement", note: "Build, move and find your energy.", slugs: ["do-build", "do-transform", "do-pulse", "do-grow"] },
  { name: "Mindfulness", note: "Make room for breath and balance.", slugs: ["do-flow", "do-fly"] },
  { name: "Recovery", note: "Give rest a place in the routine.", slugs: ["do-reset"] },
] as const;

export default function SchedulePage() {
  return <SubpageShell><main className="sub-main dw-schedule">
    <section className="dw-schedule-hero">
      <div><p className="eyebrow">The studio rhythm / Schedule</p><h1>Find your place<br/><em>in the week.</em></h1></div>
      <div className="dw-schedule-intro"><span>DO WELL / JUBILEE HILLS</span><p>Start with the practice that speaks to you. Our team will share the current timetable, coach and availability for your preferred experience.</p><a href={enquiryUrl("Class schedule", "Could you share the current class schedule?")} target="_blank" rel="noopener noreferrer">Ask for live times <b aria-hidden="true">↗</b></a></div>
    </section>

    <div className="dw-schedule-notice"><span>01 / HOW THIS WORKS</span><p>Session times change. The experiences below are the studio programme guide; contact the team for a confirmed day and time before you visit.</p></div>

    {groups.map((group, groupIndex) => <section className="dw-schedule-group" key={group.name} aria-labelledby={`schedule-group-${groupIndex}`}>
      <div className="dw-schedule-group-intro"><span>0{groupIndex + 1} / THE PRACTICE</span><h2 id={`schedule-group-${groupIndex}`}>{group.name}</h2><p>{group.note}</p></div>
      <div className="dw-schedule-rows">{group.slugs.map(slug => {
        const item = experiences.find(entry => entry.slug === slug)!;
        const detailHref = slug === "do-reset" ? "/recovery" : `/classes/${slug}`;
        const messageHref = enquiryUrl("Class schedule and availability", "Please share the current times, coach and availability.", `${item.name} — ${item.type}`);
        return <article key={slug}>
          <div><small>{item.type}</small><h3><Link href={detailHref}>{item.name}</Link></h3><p>{item.forYou}</p></div>
          <div className="dw-schedule-meta"><span>{item.duration}</span><span>{item.level}</span></div>
          <a href={messageHref} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${item.name} times`}>Ask for times <b aria-hidden="true">↗</b></a>
        </article>;
      })}</div>
    </section>)}

    <section className="dw-schedule-close"><span>YOUR FIRST STEP / 02</span><h2>Not sure where<br/>to begin?</h2><p>Tell the team what you are looking for. They can help you choose an experience and plan your first visit.</p><Link href={enquiryUrl("Studio visit", "I would like help choosing an experience and planning my visit.")} target="_blank" rel="noopener noreferrer">Plan a studio visit <b aria-hidden="true">↗</b></Link></section>
  </main></SubpageShell>;
}
