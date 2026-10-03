import Image from "next/image";
import Link from "next/link";
import { StudioNavigation } from "../components/SubpageShell";
import HomeClassExplorer from "../components/HomeClassExplorer";
import WhatsAppWidget from "../components/WhatsAppWidget";

export const metadata = {
  title: "Do Well Studio | Beyond Fitness in Jubilee Hills",
  description: "Discover strength, mindfulness and recovery at Do Well Studio, a considered wellness destination in Jubilee Hills, Hyderabad.",
};

export default function HomePage() {
  return <>
    <StudioNavigation home />
    <main>
      <section className="hero home-hero">
        <Image className="hero-image" src="/do-well-hero.png" alt="A warm, considered view of Do Well Studio" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Strength. Mindfulness. Recovery.</p>
          <h1>DO WELL.<br/><em>Beyond fitness.</em></h1>
          <p className="lead">A more complete way to move, feel stronger and make room for well-being—in Jubilee Hills, Hyderabad.</p>
          <div className="hero-actions"><Link className="button button-light" href="/experience">Experience Do Well <b aria-hidden="true">↗</b></Link><Link className="text-link" href="/visit">Visit the studio</Link></div>
        </div>
        <p className="hero-side-note"><span>THE WAY TO LIVE WELL</span><i/></p>
        <a className="scroll-cue" href="#the-way"><span>Discover the way</span><i>↓</i></a>
      </section>

      <div className="ticker" aria-hidden="true"><div>STRENGTH <i>✳</i> MINDFULNESS <i>✳</i> RECOVERY <i>✳</i> BEYOND FITNESS <i>✳</i> STRENGTH <i>✳</i> MINDFULNESS <i>✳</i> RECOVERY <i>✳</i> BEYOND FITNESS <i>✳</i></div></div>

      <section className="philosophy" id="the-way">
        <span className="section-mark" aria-hidden="true">DW</span>
        <div className="philosophy-intro"><p className="eyebrow" data-slide-text="from-left">A way, not a workout</p><h2 data-slide-text="from-right" data-slide-delay="1">Fitness trains the body.<br/><em>Wellness changes the way you live.</em></h2></div>
        <div className="philosophy-copy"><p data-slide-text="from-right">Do Well brings strength, mindful movement and recovery into one considered studio experience—so you can find what you need today and keep building from there.</p><Link className="line-link" href="/our-story">Discover our story <span aria-hidden="true">↗</span></Link></div>
        <div className="pillar-grid">
          <article data-reveal><Image className="pillar-photo" src="/pillar-strength.webp" alt="" fill sizes="(max-width: 900px) 100vw, 54vw"/><span>01 / BUILD</span><h3>Strength</h3><p>Guided training for useful strength, confidence and everyday movement.</p><Link href="/classes">Explore strength <b aria-hidden="true">↗</b></Link></article>
          <article data-reveal><Image className="pillar-photo" src="/pillar-mindfulness.webp" alt="" fill sizes="(max-width: 900px) 100vw, 37vw"/><span>02 / BREATHE</span><h3>Mindfulness</h3><p>Yoga and aerial movement to make space for balance and body awareness.</p><Link href="/classes">Explore mindfulness <b aria-hidden="true">↗</b></Link></article>
          <article data-reveal><Image className="pillar-photo" src="/pillar-recovery.webp" alt="" fill sizes="(max-width: 900px) 100vw, 37vw"/><span>03 / RESTORE</span><h3>Recovery</h3><p>Sauna, cold plunge and red-light experiences in a calmer rhythm.</p><Link href="/recovery">Explore recovery <b aria-hidden="true">↗</b></Link></article>
        </div>
      </section>

      <HomeClassExplorer />

      <section className="story-section">
        <div className="story-visual"><Image src="/story-interior-editorial.webp" alt="Illustrative view of a calm, contemporary wellness studio interior" fill sizes="100vw"/><span className="story-stamp">JUBILEE<br/>HILLS<br/>HYDERABAD</span></div>
        <div className="story-content"><p className="eyebrow" data-slide-text="from-right">A place to find your way</p><h2 data-slide-text="from-right" data-slide-delay="1">Well-being is a practice, not a finish line.</h2><p data-slide-text="from-right" data-slide-delay="2">Move with intention, build at your own pace and leave room to recover. At Do Well, every part of the experience is connected.</p><Link className="line-link" href="/our-story">The story behind Do Well <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section className="visit"><div className="visit-copy"><p className="eyebrow light-text" data-slide-text="from-left">Begin in person</p><h2 data-slide-text="from-left" data-slide-delay="1">Come in<br/>with a question.</h2><p data-slide-text="from-left" data-slide-delay="2">Meet the studio, talk through what you are looking for and find a thoughtful place to begin.</p><div><Link className="button button-light" href="/visit">Plan a studio visit <b aria-hidden="true">↗</b></Link><Link className="text-link" href="/schedule">Explore the schedule</Link></div></div><div className="visit-card"><p className="eyebrow" data-slide-text="from-right">DO WELL STUDIO</p><h3 data-slide-text="from-right" data-slide-delay="1">Jubilee Hills</h3><p data-slide-text="from-right" data-slide-delay="2">Hyderabad, Telangana</p><Link href="/contact">Find us and get in touch <span aria-hidden="true">↗</span></Link></div></section>
    </main>
    <footer className="sub-footer"><div className="footer-brand"><Image src="/do-well-logo.png" alt="Do Well Studio" width={360} height={150}/><p>Strength. Mindfulness. Recovery.<br/>Beyond Fitness.</p></div><div><p className="eyebrow">Explore</p><Link href="/experience">Experience</Link><Link href="/classes">Classes</Link><Link href="/recovery">Recovery</Link><Link href="/schedule">Schedule</Link><Link href="/membership">Membership</Link><Link href="/our-story">Our story</Link><Link href="/journal">Journal</Link></div><div><p className="eyebrow">Connect</p><Link href="/visit">Visit the studio</Link><Link href="/contact">Contact</Link><a href="https://wa.me/918688217765" target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="tel:+918688217765">86882 17765</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Do Well Studio</span><span>Jubilee Hills · Hyderabad</span><span>Beyond fitness.</span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>
    <WhatsAppWidget />
  </>;
}
