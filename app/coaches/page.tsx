import { enquiryUrl } from "../../lib/whatsapp";
import Image from "next/image";
import Link from "next/link";
import SubpageShell from "../../components/SubpageShell";

export const metadata = {
  title: "Coaching at Do Well Studio | Jubilee Hills",
  description: "Discover the Do Well approach to guided strength, mindful movement and recovery. Ask the team about current coaches and classes.",
};

const practices = [
  { number: "01", title: "Start where you are", copy: "Share your experience, questions and what you would like from a session. Guidance begins with understanding your starting point." },
  { number: "02", title: "Learn the movement", copy: "In strength, yoga, dance and aerial work, technique and attention matter as much as effort. Ask for an option that works for you." },
  { number: "03", title: "Keep finding your way", copy: "As your interests change, the studio team can help you explore another Do Well practice and build a more connected routine." },
] as const;

export default function CoachesPage() {
  return <SubpageShell><main className="sub-main dw-coaches">
    <section className="dw-coaches-hero"><div><p className="eyebrow">The people in the practice / Coaching</p><h1>Good guidance<br/>changes <em>everything.</em></h1><p>Do Well is built around guided movement: room to ask, room to learn and room to move at your own pace.</p><Link href="/classes">Find a practice <b aria-hidden="true">↗</b></Link></div><div className="dw-coaches-image"><Image src="/pillar-strength.webp" alt="Illustrative strength practice in a warm studio setting" fill priority sizes="(max-width: 900px) 100vw, 48vw"/><span>GUIDED MOVEMENT / DO WELL</span></div></section>
    <section className="dw-coaches-method"><div><p className="eyebrow">The Do Well approach</p><h2>A practice<br/><em>with a person in it.</em></h2></div><div>{practices.map(item => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></section>
    <section className="dw-coaches-end"><span>MEET YOUR GUIDE</span><h2>Find the right class,<br/>then ask who leads it.</h2><p>Coach names, current class assignments and qualifications are confirmed by the studio team. Tell them the experience you are interested in and they will introduce the right person.</p><a href={enquiryUrl("Coach enquiry", "Could you tell me about the coaches for your current classes?")} target="_blank" rel="noopener noreferrer">Ask about the coaches <b aria-hidden="true">↗</b></a></section>
  </main></SubpageShell>;
}
