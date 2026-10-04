import Image from "next/image";
import Link from "next/link";
import SubpageShell from "../../components/SubpageShell";

export const metadata = {
  title: "Do Complete Membership | Do Well Studio",
  description: "Explore a connected Do Well practice across strength, mindfulness and recovery. Ask our Jubilee Hills team about current membership options.",
};

const pathways = [
  { number: "01", name: "Move", detail: "Choose from guided strength, functional training and dance fitness.", href: "/classes" },
  { number: "02", name: "Breathe", detail: "Make space for yoga and supported aerial movement.", href: "/classes/do-flow" },
  { number: "03", name: "Recover", detail: "Explore the heat, cold and light experiences within Do Reset.", href: "/recovery" },
] as const;

export default function MembershipPage() {
  return <SubpageShell><main className="sub-main dw-membership">
    <section className="dw-membership-hero">
      <div className="dw-membership-title"><p className="eyebrow light-text">Do Complete / Membership</p><h1>More than<br/>one way to<br/><em>feel well.</em></h1><p>A connected practice through movement, mindfulness and recovery. Find the parts that fit your life and let them grow together.</p><Link href="/visit?interest=membership">Explore membership <b aria-hidden="true">↗</b></Link></div>
      <div className="dw-membership-photo"><Image src="/story-interior-editorial.webp" alt="Illustrative calm studio interior with natural materials" fill priority sizes="(max-width: 900px) 100vw, 55vw"/><span>THE WAY TO LIVE WELL</span></div>
    </section>

    <section className="dw-membership-path"><div className="dw-membership-path-heading"><p className="eyebrow">One practice / many possibilities</p><h2>Build a rhythm<br/><em>that feels like yours.</em></h2><p>Do Complete connects the experiences you can explore at the studio. The order and pace are yours to discuss with the team.</p></div>
      <div className="dw-membership-steps">{pathways.map(item => <Link href={item.href} key={item.name}><span>{item.number} / DO WELL</span><strong>{item.name}</strong><p>{item.detail}</p><b aria-hidden="true">↗</b></Link>)}</div>
    </section>

    <section className="dw-membership-details"><div><span>THE DETAILS / CURRENT OPTIONS</span><h2>Let&apos;s make it<br/>personal.</h2></div><div><p>Membership access, class and recovery inclusions, prices and trial options are confirmed directly by the studio. Tell us what you would like from a membership and we will help you explore what is available now.</p><Link href="/visit?interest=membership">Request a membership conversation <b aria-hidden="true">↗</b></Link><a href="https://wa.me/918688217765?text=Hi%20Do%20Well%20Studio%2C%20I%20would%20like%20to%20learn%20about%20current%20Do%20Complete%20membership%20options." target="_blank" rel="noopener noreferrer">Ask the front desk on WhatsApp <b aria-hidden="true">↗</b></a></div></section>
  </main></SubpageShell>;
}
