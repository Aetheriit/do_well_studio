import Link from "next/link";
import { notFound } from "next/navigation";
import SubpageShell from "../../../components/SubpageShell";
import { journalEntries } from "../../../lib/journal";

export function generateStaticParams() {
  return journalEntries.map(entry => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = journalEntries.find(item => item.slug === slug);
  return entry ? { title: `${entry.title} | Do Well Journal`, description: entry.excerpt } : {};
}

export default async function JournalEntry({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = journalEntries.find(item => item.slug === slug);
  if (!entry) notFound();
  const index = journalEntries.findIndex(item => item.slug === slug);
  const next = journalEntries[(index + 1) % journalEntries.length];

  return <SubpageShell><main className="sub-main dw-journal-entry">
    <header className="dw-journal-entry-hero"><Link href="/journal" className="dw-journal-back">← All notes</Link><p className="eyebrow">The Do Well Journal / {entry.category}</p><h1>{entry.title}</h1><p>{entry.opening}</p><span>FIELD NOTE {String(index + 1).padStart(2, "0")} / {String(journalEntries.length).padStart(2, "0")}</span></header>
    <article className="dw-journal-entry-body"><aside><span>THE WAY TO LIVE WELL</span><p>Strength<br/>Mindfulness<br/>Recovery</p></aside><div>{entry.sections.map((section, sectionIndex) => <section key={section.title}><span>0{sectionIndex + 1} / THE NOTE</span><h2>{section.title}</h2><p>{section.body}</p></section>)}<div className="dw-journal-related"><span>KEEP EXPLORING</span>{entry.related.map(item => <Link href={item.href} key={item.href}>{item.label}<b aria-hidden="true">↗</b></Link>)}</div></div></article>
    <Link className="dw-journal-next" href={`/journal/${next.slug}`}><span>NEXT NOTE / {next.category.toUpperCase()}</span><strong>{next.title}</strong><b aria-hidden="true">↗</b></Link>
  </main></SubpageShell>;
}
