import Link from "next/link";
import SubpageShell from "../../components/SubpageShell";

export const metadata = { title: "Journal | Do Well Studio", description: "Notes on movement, strength, mindfulness, recovery and a more sustainable wellness routine from Do Well Studio." };

const topics = [
  ["MOVEMENT", "How to combine strength and mobility", "A considered practice can make room for both effort and range of movement."],
  ["MINDFULNESS", "What to expect from your first aerial yoga class", "Get to know the hammock, the pace of a session and the value of clear guidance."],
  ["RECOVERY", "Making recovery part of your routine", "Recovery can be a practice in its own right—not only the space after a workout."],
  ["LIFESTYLE", "Building a sustainable wellness rhythm", "Small, repeatable choices can help movement and rest find a place in your week."],
];

export default function JournalPage() {
  return <SubpageShell><main className="sub-main journal-page"><section className="journal-hero"><p className="eyebrow">The Do Well Journal / 09</p><h1>Notes for the<br/><em>way you live.</em></h1><p>Thoughts on movement, strength, mindfulness and recovery—shared from the Do Well point of view.</p></section><section className="journal-grid" aria-label="Journal topics">{topics.map(([category,title,excerpt],index)=><article key={title} data-reveal><span>{String(index+1).padStart(2,"0")} / {category}</span><h2>{title}</h2><p>{excerpt}</p><Link href="/visit">Explore the practice <b aria-hidden="true">↗</b></Link></article>)}</section><p className="journal-note">Editorial articles are being prepared by the studio. These topics are an introduction to the journal, not medical advice.</p></main></SubpageShell>;
}
