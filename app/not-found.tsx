import Link from "next/link";
import SubpageShell from "../components/SubpageShell";

export default function NotFound() {
  return <SubpageShell><main className="not-found-page"><p className="eyebrow">A small detour</p><h1>This page<br/><em>isn't here.</em></h1><p>Let’s find your way back to Do Well.</p><Link className="button" href="/">Return to Do Well <b aria-hidden="true">↗</b></Link></main></SubpageShell>;
}
