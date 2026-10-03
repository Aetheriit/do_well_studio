import Image from "next/image";
import Link from "next/link";
import SubpageShell from "../../components/SubpageShell";

export const metadata = { title: "Our Story | Do Well Studio", description: "The thinking, name and values behind Do Well Studio." };

export default function StoryPage() {
  return <SubpageShell><main className="sub-main origin-page">
    <section className="origin-opener">
      <div className="origin-label"><p className="eyebrow">Our story / 04</p><span>Hyderabad · 2026</span></div>
      <h1><span>A place for the practice</span><em>of living well.</em></h1>
      <div className="origin-collage">
        <figure data-parallax="0.05"><Image src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1100&q=88" alt="Mindful movement" fill sizes="38vw"/></figure>
        <figure data-parallax="-0.04"><Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1100&q=88" alt="Purposeful strength training" fill sizes="30vw"/></figure>
        <p>Movement, stillness and restoration were always parts of the same life. We built a studio that finally treats them that way.</p>
      </div>
    </section>

    <section className="name-chapter">
      <div className="name-sticky"><p className="eyebrow light-text">The name</p><h2>Two words.<br/>One direction.</h2></div>
      <div className="name-entries">
        <article data-reveal><span>01</span><h3>DO</h3><p>Drawn from the Japanese idea of a way or path: something practised, refined and lived over time. It gives wellness direction and turns intention into action.</p><small>THE WAY</small></article>
        <article data-reveal><span>02</span><h3>WELL</h3><p>The feeling we are moving towards: capable in the body, clear in the mind, and connected to a life that has energy for more.</p><small>THE LIFE</small></article>
      </div>
    </section>

    <section className="belief-manifesto">
      <p className="eyebrow">What we believe</p>
      <h2 data-line-reveal>Wellness should feel considered, human and complete.</h2>
      <div className="belief-grid">
        <article data-reveal><span>01</span><h3>Progress can be calm.</h3><p>Intensity is one tool. Attention, consistency and rest matter just as much.</p></article>
        <article data-reveal><span>02</span><h3>Guidance builds confidence.</h3><p>People thrive when they understand the movement, the ritual and the reason behind it.</p></article>
        <article data-reveal><span>03</span><h3>Care lives in details.</h3><p>Light, material, pace and language shape how a place feels—and how welcome you feel in it.</p></article>
      </div>
    </section>

    <section className="story-window">
      <div className="story-window-photo" data-mask><Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1900&q=88" alt="A warm and considered studio interior" fill sizes="100vw" data-parallax="0.09"/></div>
      <div className="story-window-copy" data-reveal><p className="eyebrow light-text">The space</p><h2>Made to change<br/>how you arrive.</h2><p>Warm light. Natural textures. A quieter visual rhythm. The studio prepares you for the work before the session even begins.</p></div>
    </section>

    <section className="origin-close"><span>DO</span><div><p className="eyebrow">The next chapter is yours</p><h2>The way becomes clear<br/>when you begin.</h2><Link href="/visit">Visit Do Well Studio <b>↗</b></Link></div><span>WELL</span></section>
  </main></SubpageShell>;
}
