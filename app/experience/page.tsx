import { enquiryUrl } from "../../lib/whatsapp";
import Image from "next/image";
import Link from "next/link";
import SubpageShell from "../../components/SubpageShell";
import ScrollJourney from "../../components/ScrollJourney";

export const metadata = { title: "The Do Well Experience | Do Well Studio", description: "Strength, mindfulness and recovery in one complete wellness experience." };

const paths = [
  { index:"01", word:"STRENGTH", kicker:"Move with purpose", title:"Build a body that carries you.", copy:"Progressive strength, functional training and energising movement meet you at your level. Coaches focus on clear technique, useful power and confidence that follows you outside the studio.", image:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=88", href:"/classes/do-build", tone:"clay" },
  { index:"02", word:"MINDFULNESS", kicker:"Return to centre", title:"Create space between the noise.", copy:"Yoga, breath and aerial movement slow the pace without losing intention. Each class builds mobility and awareness while making room for a quieter mind.", image:"https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1800&q=88", href:"/classes/do-flow", tone:"olive" },
  { index:"03", word:"RECOVERY", kicker:"Restore completely", title:"Let the work settle in.", copy:"Heat, cold and light rituals help the body shift gears. Visit after training or make recovery the practice itself—guided, unhurried and deeply considered.", image:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=88", href:"/recovery", tone:"plum" },
] as const;

export default function ExperiencePage() {
  return <SubpageShell><main className="sub-main experience-page">
    <section className="experience-opener">
      <div className="experience-orbit" aria-hidden="true"><span>S</span><span>M</span><span>R</span><i/></div>
      <div className="experience-title"><p className="eyebrow">The Do Well experience / 01</p><h1><span>Everything</span><span>your week</span><em>needs.</em></h1><p>One connected rhythm for building strength, finding stillness and recovering with purpose.</p></div>
      <a className="experience-scroll" href="#three-paths"><span>Follow the rhythm</span><i>↓</i></a>
    </section>

    <section className="experience-manifesto" data-reveal>
      <p className="eyebrow">Beyond fitness</p>
      <h2>Well-being is not a single hour. It is the relationship between <em>effort, attention</em> and <em>rest.</em></h2>
      <div><p>Do Well brings the full cycle into one studio, so the right thing for your body is always within reach.</p><span>Jubilee Hills · Hyderabad</span></div>
    </section>

    <ScrollJourney chapters={paths}/>

    <section className="week-rhythm">
      <div className="rhythm-heading" data-reveal><p className="eyebrow">A week at Do Well</p><h2>No perfect routine.<br/><em>Just your rhythm.</em></h2></div>
      <div className="rhythm-track">
        {["Build","Breathe","Move","Restore","Repeat"].map((item, i)=><div key={item} data-reveal><span>{String(i+1).padStart(2,"0")}</span><strong>{item}</strong><i/></div>)}
      </div>
    </section>

    <section className="experience-finale">
      <Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=88" alt="A calm considered wellness interior" fill sizes="100vw" data-parallax="0.08"/>
      <div className="experience-finale-shade"/>
      <div data-reveal><p className="eyebrow light-text">Make it yours</p><h2>Start with what<br/>you need <em>today.</em></h2><Link className="button button-light" href={enquiryUrl("Studio visit", "I would like help choosing an experience and planning my visit.")} target="_blank" rel="noopener noreferrer">Plan a studio visit <b>↗</b></Link></div>
    </section>
  </main></SubpageShell>;
}
