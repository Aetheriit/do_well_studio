import InfoPage from "../../components/InfoPage";

export const metadata = { title: "Privacy | Do Well Studio", description: "Read how Do Well Studio handles information shared through visit enquiries." };

export default function PrivacyPage() {
  return <InfoPage eyebrow="Privacy / Draft" title="Your information deserves" accent="care." intro="This draft describes the current visit-enquiry experience and needs studio review before publication." sections={[
    { title: "Information you share", body: "The visit form asks for your name, phone number, optional email, interest, preferred day and time, message, and consent to be contacted. Please do not send sensitive medical information through the form." },
    { title: "How it is used", body: "The information is used to respond to your enquiry and plan a studio visit. The current project stores valid enquiries on the application server. The studio must confirm access, retention, deletion and any future CRM or analytics providers before launch." },
    { title: "Your choices", body: "You can contact the studio to ask about the information you provided. Privacy contact details, retention periods, legal basis and any third-party services must be confirmed by the business and reviewed before this notice is final." },
  ]} cta="Contact the studio" href="/contact" />;
}
