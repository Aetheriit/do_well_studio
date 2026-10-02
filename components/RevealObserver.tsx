"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function RevealObserver() {
  const pathname = usePathname();
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal], [data-mask], [data-line-reveal]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    nodes.forEach((node, index) => {
      node.classList.add("reveal-target");
      node.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 55}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });

    nodes.forEach((node) => observer.observe(node));

    const root = document.documentElement;
    const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const textNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-line-reveal]"));
    const finePointer = window.matchMedia("(pointer: fine)");
    let frame = 0;
    let pointerFrame = 0;
    let pointerX = -100;
    let pointerY = -100;
    const offsets = new Map<HTMLElement, number>();
    const paint = () => {
      const scrollMax = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
      // Read all geometry before writing styles, and exclude the previous
      // parallax translation so repeated scroll events cannot cause drift.
      const parallaxUpdates = parallaxNodes.map((node) => {
        const rect = node.getBoundingClientRect();
        const speed = Number(node.dataset.parallax || .12);
        const mobileFactor = innerWidth <= 900 ? .35 : 1;
        const center = rect.top + rect.height / 2 - (offsets.get(node) || 0) * mobileFactor;
        const maxOffset = node.offsetHeight * .035;
        const distance = reducedMotion.matches ? 0 : Math.min(maxOffset, Math.max(-maxOffset, (center - innerHeight / 2) * speed));
        return { node, distance };
      });
      const sceneUpdates = scenes.map((scene) => {
        const rect = scene.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height - innerHeight, 1)));
        return { scene, progress };
      });
      const textUpdates = textNodes.map((node) => {
        const top = node.getBoundingClientRect().top;
        const progress = reducedMotion.matches ? 1 : Math.min(1, Math.max(0, (innerHeight * .9 - top) / (innerHeight * .55)));
        return { node, progress };
      });
      root.style.setProperty("--page-progress", `${Math.min(1, Math.max(0, scrollY / scrollMax))}`);
      parallaxUpdates.forEach(({ node, distance }) => {
        offsets.set(node, distance);
        node.style.setProperty("--parallax-offset", `${distance.toFixed(2)}px`);
      });
      sceneUpdates.forEach(({ scene, progress }) => scene.style.setProperty("--scene-progress", `${progress}`));
      textUpdates.forEach(({ node, progress }) => node.style.setProperty("--text-progress", `${progress}`));
      frame = 0;
    };
    const requestPaint = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const pointer = (event: PointerEvent) => {
      if (reducedMotion.matches || !finePointer.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(() => {
        if (cursor.current) cursor.current.style.transform = `translate3d(${pointerX - 6}px, ${pointerY - 6}px, 0)`;
        pointerFrame = 0;
      });
    };
    const syncPreference = () => {
      if (reducedMotion.matches) nodes.forEach(node => node.classList.add("is-visible"));
      requestPaint();
    };
    syncPreference();
    const sizeObserver = new ResizeObserver(requestPaint);
    sizeObserver.observe(document.body);
    addEventListener("scroll", requestPaint, { passive: true });
    addEventListener("resize", requestPaint);
    addEventListener("pointermove", pointer, { passive: true });
    reducedMotion.addEventListener("change", syncPreference);
    return () => {
      observer.disconnect();
      sizeObserver.disconnect();
      removeEventListener("scroll", requestPaint);
      removeEventListener("resize", requestPaint);
      removeEventListener("pointermove", pointer);
      reducedMotion.removeEventListener("change", syncPreference);
      if (frame) cancelAnimationFrame(frame);
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
    };
  }, [pathname]);

  return <><div className="motion-progress" aria-hidden="true"/><div ref={cursor} className="motion-cursor" aria-hidden="true"/></>;
}
