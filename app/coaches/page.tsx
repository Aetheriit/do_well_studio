import InfoPage from "../../components/InfoPage";

export const metadata = { title: "Coaches | Do Well Studio", description: "Meet the coaching approach at Do Well Studio. Contact the team for current coach and class information." };

export default function CoachesPage() {
  return <InfoPage eyebrow="Coaches / 07" title="Guidance that" accent="meets you here." intro="Good coaching makes room for clear technique, thoughtful options and progress at your own pace." sections={[
    { title: "Expert-led, human in approach", body: "Across strength, functional training, yoga, dance and aerial movement, the Do Well experience is built around attentive guidance and movement that feels useful beyond the studio.", items: ["Clear technique before intensity", "Options for different experience levels", "Space to ask questions and build confidence"] },
    { title: "Find the right guide", body: "Coach names, portraits, specialisations and verified certifications will be added when approved studio profiles are available. For now, contact the studio and the team can help you find the right class and coach.", items: ["Call 86882 17765", "Ask about a specific class on WhatsApp"] },
  ]} cta="Ask about coaches" href="https://wa.me/918688217765?text=Hi%20Do%20Well%20Studio%2C%20could%20you%20tell%20me%20about%20the%20coaches%20and%20classes%3F" />;
}
