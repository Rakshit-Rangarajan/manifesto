"use client";
import { useEffect } from "react";

/**
 * Scroll-driven chapter handoff. Keeps real text in the document and only
 * animates decorative artwork. Later character variants can replace chapter art.
 */
export default function ScrollChapters() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".evo-hero");
    const about = document.querySelector<HTMLElement>(".evo-about");
    const canvas = document.querySelector<HTMLElement>(".evo");
    if (!hero || !about) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (reduce.matches) {
        hero.style.removeProperty("--chapter-progress");
        about.style.removeProperty("--chapter-progress");
        canvas?.style.removeProperty("--living-progress");
        return;
      }
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height, 1)));
      hero.style.setProperty("--chapter-progress", String(progress));
      about.style.setProperty("--chapter-progress", String(progress));
      canvas?.style.setProperty("--living-progress", String(progress));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduce.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener("change", schedule);
      if (frame) cancelAnimationFrame(frame);
      hero.style.removeProperty("--chapter-progress");
      about.style.removeProperty("--chapter-progress");
      canvas?.style.removeProperty("--living-progress");
    };
  }, []);
  return null;
}
