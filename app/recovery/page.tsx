import Image from "next/image";
import Link from "next/link";
import SubpageShell from "../../components/SubpageShell";

export const metadata = { title: "Do Reset Recovery | Do Well Studio", description: "An immersive heat, cold and light recovery ritual at Do Well Studio." };

const rituals = [
  { number:"01", name:"HEAT", title:"Sauna", phrase:"Soften into warmth.", copy:"An unhurried heat ritual that creates space to pause after movement, settle the senses and transition out of effort.", note:"Warm · Rest · Release", image:"https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1800&q=88" },
  { number:"02", name:"COLD", title:"Cold plunge", phrase:"Meet the moment.", copy:"A deliberate cold immersion centred on breath and presence. Our team explains the setup so you can enter calmly and at your own pace.", note:"Breathe · Focus · Emerge", image:"https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=1800&q=88" },
  { number:"03", name:"LIGHT", title:"Red light", phrase:"Rest in the glow.", copy:"A quiet, comfortable light session designed as the final exhale of your reset—a moment with nothing else to do.", note:"Pause · Receive · Restore", image:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=88" },
] as const;

export default function RecoveryPage() {
  return <SubpageShell><main className="sub-main reset-page">
    <section className="reset-opener">
      <Image src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2200&q=90" alt="A calm premium recovery ritual" fill priority sizes="100vw" data-parallax="0.05"/>
      <div className="reset-shade"/><div className="reset-grain"/>
      <div className="reset-title"><p className="eyebrow light-text">Do Reset / 03</p><h1>Recovery,<br/><em>made ritual.</em></h1><p>Heat. Cold. Light. Three sensory moments that turn slowing down into a practice.</p></div>
      <div className="breath-ring" aria-hidden="true"><i/><span>BREATHE WITH IT</span></div>
    </section>

    <section className="reset-statement" data-reveal><span>01:00</span><h2>The body changes in effort.<br/>It adapts in <em>recovery.</em></h2><p>Do Reset is a calm sequence for shifting state. Take one ritual on its own or move through all three as a complete return.</p></section>

    <section className="ritual-scenes">
      {rituals.map((ritual)=><article className="ritual-scene" id={ritual.name.toLowerCase()} key={ritual.name} data-scene>
        <div className="ritual-photo" data-mask><Image src={ritual.image} alt={`${ritual.title} recovery ritual`} fill sizes="(max-width: 900px) 100vw, 56vw" data-parallax="0.07"/><div/></div>
        <div className="ritual-story" data-reveal><span>{ritual.number} / {ritual.name}</span><p className="eyebrow">The ritual</p><h2>{ritual.title}</h2><h3>{ritual.phrase}</h3><p>{ritual.copy}</p><small>{ritual.note}</small></div>
        <strong aria-hidden="true">{ritual.name}</strong>
      </article>)}
    </section>

    <section className="reset-sequence">
      <div className="sequence-wheel" aria-hidden="true"><span>HEAT</span><span>COLD</span><span>LIGHT</span><i/></div>
      <div data-reveal><p className="eyebrow light-text">The complete reset</p><h2>One visit.<br/>Three changes<br/>of pace.</h2><p>Your studio guide helps you understand the flow, prepare for each transition and make the ritual feel personal.</p><Link className="button button-light" href="/visit?interest=do-reset">Plan your reset <b>↗</b></Link></div>
    </section>

    <section className="recovery-care"><p className="eyebrow">Before you arrive</p><h2>Recovery is personal.</h2><div><p>Hydrate before your visit, arrive with time to settle and bring comfortable swimwear for the cold plunge.</p><p>If you have a health condition, are pregnant or have concerns about heat, cold or light exposure, speak with a qualified health professional before booking.</p></div><a href="https://wa.me/918688217765?text=Hi%20Do%20Well%20Studio%2C%20I%20have%20a%20question%20about%20Do%20Reset." target="_blank" rel="noreferrer">Ask the recovery team <span>↗</span></a></section>
  </main></SubpageShell>;
}
