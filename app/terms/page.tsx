import { enquiryUrl } from "../../lib/whatsapp";
import InfoPage from "../../components/InfoPage";

export const metadata = { title: "Terms | Do Well Studio", description: "Terms for using the Do Well Studio website. This draft requires business and legal review." };

export default function TermsPage() {
  return <InfoPage eyebrow="Website terms / Draft" title="A clear start to" accent="your journey." intro="This is a publication placeholder, not final legal advice. The studio must approve operating, booking, cancellation and liability terms before launch." sections={[
    { title: "Website information", body: "This website introduces Do Well Studio's classes, mindfulness and recovery experiences. Session availability, coach details and membership terms should be confirmed directly with the studio." },
    { title: "Health and participation", body: "Website content is general information, not medical advice or a diagnosis. Ask qualified professionals about personal health concerns and follow studio guidance for any session." },
    { title: "Before publication", body: "Business entity details, governing law, intellectual property terms, booking and cancellation policies, and contact for legal notices require confirmation and review." },
  ]} cta="Contact the studio" href={enquiryUrl("Website and booking terms", "I have a question about your current booking or cancellation terms.")} />;
}
