"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./navigation.css";

const navigation = [
  { href: "/experience", label: "Experience" },
  { href: "/classes", label: "Classes" },
  { href: "/recovery", label: "Recovery" },
  { href: "/story", label: "Our story" },
];

export function StudioNavigation({ home = false, scrolled = false }: { home?: boolean; scrolled?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return <header ref={headerRef} className={home ? `nav ${scrolled ? "nav-scrolled" : ""}` : "sub-nav"}>
    <Link className="logo" href="/" aria-label="Do Well Studio home" onClick={() => setOpen(false)}><Image src="/do-well-logo.png" alt="Do Well Studio" width={360} height={150} priority /></Link>
    <nav id="studio-navigation" aria-label="Main navigation" className={home ? `links ${open ? "links-open" : ""}` : `sub-links ${open ? "sub-links-open" : ""}`}>
      {navigation.map(({ href, label }) => <Link key={href} href={href} aria-current={isCurrent(href) ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link className="mobile-visit-link" href="/visit" aria-current={isCurrent("/visit") ? "page" : undefined} onClick={() => setOpen(false)}>Visit Do Well <span aria-hidden="true">↗</span></Link>
    </nav>
    <Link className="visit-nav" href="/visit" aria-current={isCurrent("/visit") ? "page" : undefined}>Visit Do Well <span aria-hidden="true">↗</span></Link>
    <button ref={toggleRef} type="button" className={`menu-toggle ${home ? "" : "sub-menu"}`} aria-expanded={open} aria-controls="studio-navigation" aria-label={open ? "Close navigation menu" : "Open navigation menu"} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
  </header>;
}

export default function SubpageShell({ children }: { children: React.ReactNode }) {
  return <>
    <StudioNavigation />
    {children}
    <footer className="sub-footer"><div className="footer-brand"><Image src="/do-well-logo.png" alt="Do Well Studio" width={360} height={150}/><p>Strength. Mindfulness. Recovery.<br/>Beyond Fitness.</p></div><div><p className="eyebrow">Explore</p><Link href="/experience">Experience</Link><Link href="/classes">Classes</Link><Link href="/recovery">Recovery</Link><Link href="/story">Our story</Link></div><div><p className="eyebrow">Connect</p><Link href="/visit">Visit the studio</Link><a href="https://wa.me/918688217765" target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="tel:+918688217765">86882 17765</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Do Well Studio</span><span>Jubilee Hills · Hyderabad</span><span>Beyond fitness.</span></div></footer>
    <a className="studio-whatsapp" href="https://wa.me/918688217765?text=Hi%20Do%20Well%20Studio%2C%20I%20would%20like%20to%20plan%20a%20visit." target="_blank" rel="noopener noreferrer" aria-label="Talk to Do Well on WhatsApp (opens in a new tab)">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.6a8 8 0 0 1-11.9 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="m8.5 7.5 1.2 2-1 1.1c.8 1.7 1.7 2.6 3.4 3.4l1.1-1 2 1.2c.1 1.4-.8 2.1-2 1.8-3.4-.7-6.1-3.4-6.8-6.8-.3-1.2.7-2.2 2.1-1.7Z" fill="currentColor"/></svg>
      <span>Talk to Do Well</span><span className="studio-whatsapp-arrow" aria-hidden="true">↗</span>
    </a>
  </>;
}
