import InfoPage from "../../components/InfoPage";

export const metadata = { title: "Class Schedule | Do Well Studio", description: "Ask the Do Well Studio team in Jubilee Hills for the current class timetable and availability." };

export default function SchedulePage() {
  return <InfoPage eyebrow="Schedule / 06" title="Find a time to" accent="move." intro="The studio team can help you find a session that fits your week. Get in touch for the latest class times and availability." sections={[
    { title: "A rhythm for your week", body: "Explore strength, mindfulness and recovery experiences, then speak with the studio for the current timetable. Session times and coach availability are confirmed directly by the team.", items: ["Strength: Do Build, Do Transform and Do Grow", "Mindfulness: Do Flow and Do Fly", "Movement: Do Pulse", "Recovery: Do Reset"] },
    { title: "Ask about a session", body: "Tell the team which class you have in mind and when you are hoping to visit. They can share current availability and help you plan a first session.", items: ["Call 86882 17765", "Or send a WhatsApp message to the studio"] },
  ]} cta="Ask for the current schedule" href="https://wa.me/918688217765?text=Hi%20Do%20Well%20Studio%2C%20please%20share%20the%20current%20class%20schedule." />;
}
