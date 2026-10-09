import { enquiryUrl } from "../../lib/whatsapp";
import InfoPage from "../../components/InfoPage";

export const metadata = { title: "Privacy | Do Well Studio", description: "Read how Do Well Studio handles information shared through visit enquiries." };

export default function PrivacyPage() {
  return <InfoPage eyebrow="Privacy / Draft" title="Your information deserves" accent="care." intro="This draft describes the current visit-enquiry experience and needs studio review before publication." sections={[
    { title: "Information you share", body: "The visit form asks for your name, phone number, optional email, interest, preferred day and time, message, and consent to be contacted. Please do not send sensitive medical information through the form." },
    { title: "How it is used", body: "The website prepares a WhatsApp message containing the details you enter. You can review the message before tapping Send in WhatsApp. The website does not save your enquiry on its server. When you send the message, the studio receives it through WhatsApp to respond and help plan your visit." },
    { title: "Your choices", body: "You can contact the studio to ask about the information you provided. Privacy contact details, retention periods, legal basis and any third-party services must be confirmed by the business and reviewed before this notice is final." },
  ]} cta="Contact the studio" href={enquiryUrl("Privacy enquiry", "I have a question about the information I shared with Do Well Studio.")} />;
}
