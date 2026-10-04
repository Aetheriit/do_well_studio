import Link from "next/link";
import SubpageShell from "../../components/SubpageShell";
import { journalEntries } from "../../lib/journal";

export const metadata = { title: "Journal | Do Well Studio", description: "Notes on movement, strength, mindfulness, recovery and a more sustainable wellness routine from Do Well Studio." };

export default function JournalPage() {
  return <SubpageShell><main className="sub-main journal-page"><section className="journal-hero"><p className="eyebrow">The Do Well Journal / 09</p><h1>Notes for the<br/><em>way you live.</em></h1><p>Short field notes on movement, strength, mindfulness and recovery—written from the Do Well point of view.</p></section><section className="journal-grid" aria-label="Journal notes">{journalEntries.map((entry,index)=><article key={entry.slug} data-reveal><span>{String(index+1).padStart(2,"0")} / {entry.category.toUpperCase()}</span><h2>{entry.title}</h2><p>{entry.excerpt}</p><Link href={`/journal/${entry.slug}`}>Read the note <b aria-hidden="true">↗</b></Link></article>)}</section><p className="journal-note">These notes introduce the Do Well practices. Recovery information is general and does not replace advice from a qualified professional.</p></main></SubpageShell>;
}
