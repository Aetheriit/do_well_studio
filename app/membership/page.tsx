import InfoPage from "../../components/InfoPage";

export const metadata = { title: "Membership | Do Well Studio", description: "Explore a more complete Do Well Studio membership across strength, mindfulness and recovery. Enquire in Jubilee Hills." };

export default function MembershipPage() {
  return <InfoPage eyebrow="Membership / 08" title="Make space for" accent="well-being." intro="Do Complete is the idea of a more connected studio experience: movement, strength, mindfulness and recovery in one considered path." sections={[
    { title: "Your complete Do Well experience", body: "Build a routine around the practices that matter to you. The studio team can talk through membership options and help you understand how the experiences fit together.", items: ["Movement", "Strength", "Mindfulness", "Recovery"] },
    { title: "Find your membership", body: "Membership prices, access rules, recovery entitlements and guest or trial details are being confirmed by the studio. We do not publish unverified prices or inclusions. Enquire directly for current options.", items: ["Tell us what you want from your practice", "Discuss available membership options", "Plan a studio visit"] },
  ]} cta="Find your membership" />;
}
