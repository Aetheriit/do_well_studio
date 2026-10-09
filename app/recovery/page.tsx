import { experienceEnquiryUrl } from "../../lib/whatsapp";
import { enquiryUrl } from "../../lib/whatsapp";
import Image from "next/image";
import Link from "next/link";
import SubpageShell from "../../components/SubpageShell";

export const metadata = { title: "Do Reset Recovery | Do Well Studio", description: "An immersive heat, cold and light recovery ritual at Do Well Studio." };

const rituals = [
  { number:"01", name:"HEAT", title:"Sauna", phrase:"Soften into warmth.", copy:"An unhurried heat ritual that creates space to pause after movement and transition out of effort.", note:"Warm · Rest · Release", image:"https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1800&q=88", href:"/recovery/sauna" },
  { number:"02", name:"COLD", title:"Cold plunge", phrase:"Meet the moment.", copy:"A deliberate cold-water experience centred on breath and presence. Ask the team about the current setup and suitability before taking part.", note:"Breathe · Focus · Emerge", image:"https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=1800&q=88", href:"/recovery/cold-plunge" },
  { number:"03", name:"LIGHT", title:"Red light", phrase:"Rest in the glow.", copy:"A quiet light-based experience that makes space for stillness. The team can explain current session details and preparation.", note:"Pause · Receive · Restore", image:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=88", href:"/recovery/red-light-therapy" },
] as const;

export default function RecoveryPage() {
  return <SubpageShell><main className="sub-main reset-page">
    <section className="reset-opener">
      <Image src="/pillar-recovery.webp" alt="Illustrative warm recovery space with sauna and plunge pool" fill priority sizes="100vw" data-parallax="0.05"/>
      <div className="reset-shade"/><div className="reset-grain"/>
      <div className="reset-title"><p className="eyebrow light-text">Do Reset / 03</p><h1>Recovery,<br/><em>made ritual.</em></h1><p>Heat. Cold. Light. Three sensory moments that turn slowing down into a practice.</p></div>
      <div className="breath-ring" aria-hidden="true"><i/><span>BREATHE WITH IT</span></div>
    </section>

    <section className="reset-statement" data-reveal><span>01 / 03</span><h2>Give effort a pause.<br/>Make room for <em>recovery.</em></h2><p>Do Reset brings heat, cold and light into the Do Well story. Ask the studio which experiences and combinations are available for your visit.</p></section>

    <section className="ritual-scenes">
      {rituals.map((ritual)=><article className="ritual-scene" id={ritual.name.toLowerCase()} key={ritual.name} data-scene>
        <div className="ritual-photo" data-mask><Image src={ritual.image} alt={`Illustrative ${ritual.title.toLowerCase()} recovery scene`} fill sizes="(max-width: 900px) 100vw, 56vw" data-parallax="0.07"/><div/></div>
        <div className="ritual-story" data-reveal><span>{ritual.number} / {ritual.name}</span><p className="eyebrow">The ritual</p><h2>{ritual.title}</h2><h3>{ritual.phrase}</h3><p>{ritual.copy}</p><small>{ritual.note}</small><Link className="dw-ritual-link" href={ritual.href}>Explore {ritual.title} <b aria-hidden="true">↗</b></Link></div>
        <strong aria-hidden="true">{ritual.name}</strong>
      </article>)}
    </section>

    <section className="reset-sequence">
      <div className="sequence-wheel" aria-hidden="true"><span>HEAT</span><span>COLD</span><span>LIGHT</span><i/></div>
      <div data-reveal><p className="eyebrow light-text">The complete reset</p><h2>One intention.<br/>Different ways<br/>to pause.</h2><p>Speak with the team about the current recovery options, their sequence and the preparation that is right for you.</p><Link className="button button-light" href={experienceEnquiryUrl("do-reset", "Recovery enquiry")} target="_blank" rel="noopener noreferrer">Ask about Do Reset <b>↗</b></Link></div>
    </section>

    <section className="recovery-care"><p className="eyebrow">Before you arrive</p><h2>Recovery is personal.</h2><div><p>Ask the studio for the latest session duration, what to bring and how to prepare. Details differ across the heat, cold and light experiences.</p><p>If you have a health condition, are pregnant or have concerns about heat, cold or light exposure, speak with a qualified health professional before booking.</p></div><a href={enquiryUrl("Recovery enquiry", "I have a question about Do Reset.")} target="_blank" rel="noreferrer">Ask the recovery team <span>↗</span></a></section>
  </main></SubpageShell>;
}
