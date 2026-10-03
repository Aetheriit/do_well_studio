import InfoPage from "../../components/InfoPage";

export const metadata = { title: "Contact Do Well Studio | Jubilee Hills, Hyderabad", description: "Contact Do Well Studio in Jubilee Hills, Hyderabad by phone, WhatsApp or directions." };

export default function ContactPage() {
  return <InfoPage eyebrow="Contact / 10" title="A conversation is a good" accent="place to start." intro="Questions about a class, recovery experience or studio visit? The Do Well team is here to help." sections={[
    { title: "Visit the studio", body: "2nd Floor, Plot No. 39, Road No. 5, opposite Metro Pillar 1571, Jubilee Hills, Hyderabad, Telangana 500033.", items: ["Open directions in Google Maps", "Call 86882 17765"] },
    { title: "Get in touch", body: "For current class availability, membership information and visit planning, contact the studio by phone or WhatsApp. Operating hours and email are not yet confirmed for publication.", items: ["Phone: 86882 17765", "WhatsApp: +91 86882 17765"] },
  ]} cta="Message the studio" href="https://wa.me/918688217765?text=Hi%20Do%20Well%20Studio%2C%20I%20have%20a%20question." />;
}
