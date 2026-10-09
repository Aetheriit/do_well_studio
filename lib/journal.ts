import { experienceEnquiryUrl } from "./whatsapp";
export const journalEntries = [
  {
    slug: "strength-and-mobility",
    category: "Movement",
    title: "Strength and mobility belong in the same week",
    excerpt: "A considered practice can make room for both effort and range of movement.",
    opening: "Some days call for resistance and focus. Others ask you to move through a fuller range and notice how your body feels. At Do Well, those days belong to the same practice.",
    sections: [
      { title: "Start with what you need", body: "Do Build centres on guided strength and technique. Do Transform brings strength together with mobility, balance and endurance. Neither has to be your only way to move. Think about the kind of support you want today, then ask the studio which class fits." },
      { title: "Give movement some variety", body: "Do Flow offers a change of pace through yoga and breath. It can sit alongside a strength practice when you want space for flexibility and body awareness. The right mix is personal; a coach can help you choose a starting point." },
      { title: "Make the first step simple", body: "You do not need a perfect weekly plan before you begin. Pick one experience that interests you, tell the team what you are hoping to explore, and build from there." },
    ],
    related: [ { label: "Explore Do Build", href: "/classes/do-build" }, { label: "Explore Do Transform", href: "/classes/do-transform" } ],
  },
  {
    slug: "first-aerial-yoga-class",
    category: "Mindfulness",
    title: "Your first Do Fly class",
    excerpt: "Get to know the hammock, the pace of the practice and what to ask before you visit.",
    opening: "Aerial yoga can look unfamiliar from the outside. Do Fly uses a suspended hammock as support while you explore balance, stretching and body control.",
    sections: [
      { title: "Begin with curiosity", body: "The hammock changes your relationship to familiar movements. Your first visit is a chance to learn how the support works, ask questions and take each shape at a pace that feels manageable." },
      { title: "Tell the studio it is your first time", body: "Before attending, ask about clothing, preparation and current class availability. Let the coach know about your experience with yoga and any movement concern so they can explain the options available in the session." },
      { title: "Keep the practice open", body: "Do Fly is one way into mindfulness at Do Well. If you would rather begin on the mat, Do Flow brings movement, breath and balance into a ground-based yoga practice." },
    ],
    related: [ { label: "Explore Do Fly", href: "/classes/do-fly" }, { label: "Explore Do Flow", href: "/classes/do-flow" } ],
  },
  {
    slug: "a-place-for-recovery",
    category: "Recovery",
    title: "Give recovery a place in the routine",
    excerpt: "Do Reset gives slowing down its own space in the Do Well experience.",
    opening: "Recovery does not have to be the part you remember only after a busy week. At Do Well, it has its own place alongside strength and mindful movement.",
    sections: [
      { title: "Three different experiences", body: "Do Reset introduces heat, cold and light through sauna, cold plunge and red-light experiences. Each has a different feel. The studio team can explain which options are currently available and how a visit is arranged." },
      { title: "Preparation is personal", body: "Ask the team about session duration, what to bring and how to prepare before booking. If you have a health condition or a concern about heat, cold or light exposure, speak with a qualified health professional first." },
      { title: "Find your own rhythm", body: "A visit might begin with one recovery experience, or a conversation about how to include recovery in a wider routine. The goal is to choose deliberately, with the information you need." },
    ],
    related: [ { label: "Explore Do Reset", href: "/recovery" }, { label: "Ask about recovery", href: experienceEnquiryUrl("do-reset", "Recovery enquiry") } ],
  },
  {
    slug: "a-do-well-rhythm",
    category: "The way",
    title: "Build a rhythm that feels like yours",
    excerpt: "Strength, mindfulness and recovery can support different parts of the same week.",
    opening: "The way to live well is not one fixed timetable. Some weeks begin with energy. Others begin with the need to slow down. Do Well is designed to make room for both.",
    sections: [
      { title: "Follow a feeling", body: "If you want to feel stronger, look at Do Build or Do Transform. If you need room to breathe, start with Do Flow. If movement should feel expressive, explore Do Pulse. The first choice can be as simple as that." },
      { title: "Let it evolve", body: "Your interests may change as you get to know the studio. Yoga can sit beside strength; recovery can have its own place. Do Complete is the studio's idea of a more connected practice, with current membership details confirmed by the team." },
      { title: "Begin in person", body: "A studio visit lets you see the space and speak to the team about what you are looking for. You can ask about classes, current times, recovery and membership before making a decision." },
    ],
    related: [ { label: "Find your practice", href: "/classes" }, { label: "Plan a studio visit", href: experienceEnquiryUrl("help-choosing", "Studio visit") } ],
  },
] as const;
