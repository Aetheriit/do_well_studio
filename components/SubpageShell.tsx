"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import WhatsAppWidget from "./WhatsAppWidget";
import "./navigation.css";

const navigation = [
  { href: "/experience", label: "Experience" },
  { href: "/classes", label: "Classes" },
  { href: "/recovery", label: "Recovery" },
  { href: "/schedule", label: "Schedule" },
  { href: "/our-story", label: "Our story" },
  { href: "/membership", label: "Membership" },
];

export function StudioNavigation({ home = false, scrolled = false }: { home?: boolean; scrolled?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dockRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!home) return;
    const update = () => setPastHero(window.scrollY > window.innerHeight * 0.65);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [home]);

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

  // Adapt the reference dock's proximity field and spring to real page links.
  useEffect(() => {
    const header = headerRef.current;
    const dock = dockRef.current;
    if (!header || !dock) return;

    const links = Array.from(dock.querySelectorAll<HTMLElement>("[data-dock-item]"));
    const cells = links.map((element) => ({ element, value: 0, velocity: 0, target: 0 }));
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    cells.forEach((cell) => cell.element.style.setProperty("--dock-energy", "0"));
    dock.dataset.dockState = "idle";
    dock.dataset.dockMax = "0.00";

    const paint = () => {
      let moving = false;
      let maximum = 0;
      for (const cell of cells) {
        cell.velocity = (cell.velocity + (cell.target - cell.value) * 0.19) * 0.7;
        cell.value += cell.velocity;
        if (Math.abs(cell.target - cell.value) < 0.001 && Math.abs(cell.velocity) < 0.001) {
          cell.value = cell.target;
          cell.velocity = 0;
        } else {
          moving = true;
        }
        const energy = Math.max(0, Math.min(1.08, cell.value));
        maximum = Math.max(maximum, energy);
        cell.element.style.setProperty("--dock-energy", energy.toFixed(3));
      }
      dock.dataset.dockMax = maximum.toFixed(2);
      if (moving) frame = window.requestAnimationFrame(paint);
      else {
        frame = 0;
        if (cells.every((cell) => cell.target === 0)) dock.dataset.dockState = "idle";
      }
    };

    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(paint); };
    const reset = () => {
      cells.forEach((cell) => { cell.target = 0; });
      header.style.setProperty("--bar-glow", "0");
      if (reducedMotion.matches) {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        cells.forEach((cell) => {
          cell.value = 0;
          cell.velocity = 0;
          cell.element.style.setProperty("--dock-energy", "0");
        });
        dock.dataset.dockState = "idle";
        dock.dataset.dockMax = "0.00";
        return;
      }
      schedule();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches || window.innerWidth <= 900) return;
      const bounds = header.getBoundingClientRect();
      header.style.setProperty("--bar-x", `${event.clientX - bounds.left}px`);
      header.style.setProperty("--bar-y", `${event.clientY - bounds.top}px`);
      header.style.setProperty("--bar-glow", "1");
      for (const cell of cells) {
        const rect = cell.element.getBoundingClientRect();
        const distance = Math.abs(event.clientX - (rect.left + rect.width / 2));
        const proximity = Math.max(0, Math.min(1, 1 - distance / 122));
        cell.target = proximity * proximity * (3 - 2 * proximity);
      }
      dock.dataset.dockState = "active";
      schedule();
    };
    const onFocusIn = (event: FocusEvent) => {
      const focused = (event.target as Element).closest("[data-dock-item]");
      if (!focused || reducedMotion.matches || window.innerWidth <= 900) return;
      const index = cells.findIndex((cell) => cell.element === focused);
      cells.forEach((cell, position) => {
        cell.target = position === index ? 1 : Math.abs(position - index) === 1 ? 0.24 : 0;
      });
      dock.dataset.dockState = "focus";
      schedule();
    };
    const onFocusOut = () => window.requestAnimationFrame(() => {
      if (!dock.contains(document.activeElement)) reset();
    });
    const onMotionChange = () => {
      if (reducedMotion.matches || !finePointer.matches) reset();
    };
    const updateProgress = () => {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      header.style.setProperty("--bar-progress", `${Math.min(100, window.scrollY / scrollable * 100)}%`);
    };

    header.addEventListener("pointermove", onPointerMove, { passive: true });
    header.addEventListener("pointerleave", reset);
    dock.addEventListener("focusin", onFocusIn);
    dock.addEventListener("focusout", onFocusOut);
    reducedMotion.addEventListener("change", onMotionChange);
    finePointer.addEventListener("change", onMotionChange);
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      header.removeEventListener("pointermove", onPointerMove);
      header.removeEventListener("pointerleave", reset);
      dock.removeEventListener("focusin", onFocusIn);
      dock.removeEventListener("focusout", onFocusOut);
      reducedMotion.removeEventListener("change", onMotionChange);
      finePointer.removeEventListener("change", onMotionChange);
      window.removeEventListener("scroll", updateProgress);
    };
  }, [pathname]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return <header ref={headerRef} className={home ? `nav studio-topbar ${scrolled || pastHero ? "nav-scrolled" : ""}` : "sub-nav studio-topbar"}>
    <Link className="logo glass-logo" href="/" aria-label="Do Well Studio home" onClick={() => setOpen(false)}>
      <span className="glass-logo__light" aria-hidden="true" />
      <Image src="/do-well-logo.png" alt="Do Well Studio" width={360} height={150} priority />
    </Link>
    <nav ref={dockRef} id="studio-navigation" aria-label="Main navigation" data-dock-state="idle" data-dock-max="0.00" className={home ? `links studio-dock ${open ? "links-open" : ""}` : `sub-links studio-dock ${open ? "sub-links-open" : ""}`}>
      {navigation.map(({ href, label }) => <Link key={href} className="studio-dock-item" data-dock-item href={href} aria-current={isCurrent(href) ? "page" : undefined} onClick={() => setOpen(false)}><span className="studio-dock-label">{label}</span></Link>)}
      <Link className="mobile-visit-link" href="/visit" aria-current={isCurrent("/visit") ? "page" : undefined} onClick={() => setOpen(false)}>Visit Do Well <span aria-hidden="true">↗</span></Link>
    </nav>
    <Link className="visit-nav studio-dock-cta" href="/visit" aria-current={isCurrent("/visit") ? "page" : undefined}>Visit Do Well <span aria-hidden="true">↗</span></Link>
    <button ref={toggleRef} type="button" className={`menu-toggle ${home ? "" : "sub-menu"}`} aria-expanded={open} aria-controls="studio-navigation" aria-label={open ? "Close navigation menu" : "Open navigation menu"} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
  </header>;
}

export default function SubpageShell({ children }: { children: React.ReactNode }) {
  return <>
    <StudioNavigation />
    {children}
    <footer className="sub-footer"><div className="footer-brand"><Image src="/do-well-logo.png" alt="Do Well Studio" width={360} height={150}/><p>Strength. Mindfulness. Recovery.<br/>Beyond Fitness.</p></div><div><p className="eyebrow">Explore</p><Link href="/experience">Experience</Link><Link href="/classes">Classes</Link><Link href="/recovery">Recovery</Link><Link href="/schedule">Schedule</Link><Link href="/membership">Membership</Link><Link href="/our-story">Our story</Link><Link href="/journal">Journal</Link></div><div><p className="eyebrow">Connect</p><Link href="/visit">Visit the studio</Link><Link href="/contact">Contact</Link><Link href="/coaches">Coaches</Link><a href="https://wa.me/918688217765" target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="tel:+918688217765">86882 17765</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Do Well Studio</span><span>Jubilee Hills · Hyderabad</span><span>Beyond fitness.</span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>
    <WhatsAppWidget />
  </>;
}
