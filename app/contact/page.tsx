import Link from "next/link";
import SubpageShell from "../../components/SubpageShell";

export const metadata = {
  title: "Contact Do Well Studio | Jubilee Hills, Hyderabad",
  description: "Find Do Well Studio in Jubilee Hills, Hyderabad. Call, message the team on WhatsApp or request a studio visit.",
};

export default function ContactPage() {
  return <SubpageShell><main className="sub-main dw-contact">
    <section className="dw-contact-hero"><p className="eyebrow">Contact / Do Well Studio</p><h1>A conversation<br/>is a good <em>place<br/>to start.</em></h1><div><span>STRENGTH / MINDFULNESS / RECOVERY</span><p>Ask about a class, current times, recovery or membership. The studio team will help you find a clear next step.</p></div></section>
    <section className="dw-contact-lines" aria-label="Ways to contact Do Well Studio">
      <a href="tel:+918688217765"><span>01 / PHONE</span><strong>86882 17765</strong><b aria-hidden="true">↗</b></a>
      <a href="https://wa.me/918688217765?text=Hi%20Do%20Well%20Studio%2C%20I%20have%20a%20question." target="_blank" rel="noopener noreferrer"><span>02 / MESSAGE</span><strong>Talk to Do Well</strong><b aria-hidden="true">↗</b></a>
      <Link href="/visit"><span>03 / IN PERSON</span><strong>Plan a studio visit</strong><b aria-hidden="true">↗</b></Link>
    </section>
    <section className="dw-contact-location"><div><p className="eyebrow light-text">Find us / Jubilee Hills</p><h2>Come see<br/>the space.</h2></div><div><address>2nd Floor, Plot No. 39, Road No. 5,<br/>opposite Metro Pillar 1571,<br/>Jubilee Hills, Hyderabad,<br/>Telangana 500033</address><a href="https://maps.google.com/?q=Do+Well+Studio+Jubilee+Hills+Hyderabad" target="_blank" rel="noopener noreferrer">Open directions <b aria-hidden="true">↗</b></a><p>For the current opening hours and availability, message or call the studio before travelling.</p></div></section>
  </main></SubpageShell>;
}
