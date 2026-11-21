"use client";
import { useEffect } from "react";
import "./evo-scroll-motion.css";

/** Progressive enhancement: scroll reveals and subtle chapter depth without
 * changing the portfolio structure, accessible content or native scrolling. */
export default function ScrollChapters() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".evo");
    const hero = root?.querySelector<HTMLElement>(".evo-hero");
    const about = root?.querySelector<HTMLElement>(".evo-about");
    if (!root || !hero || !about) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const progress = document.createElement("div");
    progress.className = "evo-motion-progress";
    progress.setAttribute("aria-hidden", "true");
    root.appendChild(progress);

    const sections = Array.from(root.querySelectorAll<HTMLElement>(".evo-section"));
    const targets = Array.from(root.querySelectorAll<HTMLElement>(
      ".evo-section h2, .evo-section .evo-lead, .evo-project, .evo-toolkit-card, .evo-glass-panel, .evo-journey-card, .evo-education-tile, .evo-education-feature, .evo-hobby-card, .evo-agent-grid > div, .evo-about-stats > div, .evo-contact-links > a"
    ));
    let observer: IntersectionObserver | null = null;
    let frame = 0;

    const revealAll = () => {
      targets.forEach(el => {
        el.classList.add("evo-motion-visible");
      });
    };
    const setup = () => {
      observer?.disconnect();
      observer = null;
      if (reduce.matches || !("IntersectionObserver" in window)) {
        revealAll();
        root.classList.remove("evo-motion-ready");
        return;
      }
      // Only animate elements that have yet to enter the viewport. No flash
      // of hidden text at initial load or on deep-linked chapter navigation.
      targets.forEach((el, index) => {
        el.classList.add("evo-motion-reveal");
        el.style.setProperty("--evo-reveal-delay", String((index % 4) * 65) + "ms");
        if (el.getBoundingClientRect().top < window.innerHeight * 1.1)
          el.classList.add("evo-motion-visible");
      });
      root.classList.add("evo-motion-ready");
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("evo-motion-visible");
          observer?.unobserve(el);
        }
      }, { threshold: 0.08, rootMargin: "0px 0px 48px 0px" });
      targets.filter(el => !el.classList.contains("evo-motion-visible")).forEach(el => observer?.observe(el));
    };

    const update = () => {
      frame = 0;
      const pageRange = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      root.style.setProperty("--evo-scroll-progress", String(Math.min(1, Math.max(0, scrollY / pageRange))));
      if (reduce.matches) {
        hero.style.removeProperty("--chapter-progress");
        about.style.removeProperty("--chapter-progress");
        root.style.removeProperty("--living-progress");
        sections.forEach(section => section.style.removeProperty("--evo-section-travel"));
        return;
      }
      const rect = hero.getBoundingClientRect();
      const amount = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height, 1)));
      hero.style.setProperty("--chapter-progress", String(amount));
      about.style.setProperty("--chapter-progress", String(amount));
      root.style.setProperty("--living-progress", String(amount));
      if (innerWidth > 900) {
        sections.forEach(section => {
          const bounds = section.getBoundingClientRect();
          const travel = Math.max(-1, Math.min(1, (bounds.top + bounds.height / 2 - innerHeight / 2) / Math.max(1,innerHeight)));
          section.style.setProperty("--evo-section-travel", String(travel));
        });
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onMotionChange = () => { setup(); schedule(); };
    setup();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduce.addEventListener("change", onMotionChange);
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener("change", onMotionChange);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("evo-motion-ready");
      root.style.removeProperty("--evo-scroll-progress");
      root.style.removeProperty("--living-progress");
      sections.forEach(section => section.style.removeProperty("--evo-section-travel"));
      targets.forEach(el => {
        el.classList.remove("evo-motion-reveal", "evo-motion-visible");
        el.style.removeProperty("--evo-reveal-delay");
      });
      hero.style.removeProperty("--chapter-progress");
      about.style.removeProperty("--chapter-progress");
      progress.remove();
    };
  }, []);
  return null;
}
