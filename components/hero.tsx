"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowDownToLine } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const PERSONAL_MOTTO = "I’m lazy about repetitive work. Relentless about solving problems.";

const NAME_VARIANTS = ["Rakshit Rangarajan", "ラクシット ランガラジャン", "रक्षित रंगराजन", "ரக்ஷித் ரங்கராஜன்", "ರಕ್ಷಿತ್ ರಂಗರಾಜನ್"];

const NAME_LANGUAGES = ["en", "ja", "hi", "ta", "kn"] as const;
function NameDisplay({ name, isNew }: { name: string; isNew: boolean }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const index = Math.max(0, NAME_VARIANTS.indexOf(name));
  useEffect(() => {
    if (!headingRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const motion = gsap.fromTo(headingRef.current,
      { opacity: 0, y: isNew ? 18 : -18, filter: "blur(5px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.75, ease: "power3.out" });
    return () => { motion.kill(); };
  }, [name, isNew]);
  return <h1 ref={headingRef} lang={NAME_LANGUAGES[index]} aria-label={name} className={`brush-name brush-name--${NAME_LANGUAGES[index]}`}>
    <span className="brush-name__ink">{name}</span>
  </h1>;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentName, setCurrentName] = useState(NAME_VARIANTS[0]);
  const [displayName, setDisplayName] = useState(NAME_VARIANTS[0]);
  const [isNew, setIsNew] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hireMeClicked, setHireMeClicked] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleHireMe = () => {
    setHireMeClicked(true);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => setHireMeClicked(false), 2000);
  };

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setIsNew((prev) => !prev);
      setDisplayName((prev) => {
        const currIdx = NAME_VARIANTS.indexOf(prev);
        const nextIdx = (currIdx + 1) % NAME_VARIANTS.length;
        return NAME_VARIANTS[nextIdx];
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [mounted]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return (
      <section
        id="hero"
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-20"
      >
        <div className="flex flex-col items-center justify-center text-center w-full z-10">
          <div className="overflow-hidden mb-2">
            <p className="text-primary text-sm md:text-base tracking-[0.3em] uppercase font-medium">
              {personalInfo.role}
            </p>
          </div>
          <div className="brush-name-stage mb-6" aria-live="off"><h1 lang="en" className="brush-name brush-name--en"><span className="brush-name__ink">{NAME_VARIANTS[0]}</span></h1></div>
          <div className="overflow-hidden max-w-2xl mb-8">
            <p className="text-zinc-600 dark:text-slate-400 text-lg md:text-2xl leading-relaxed font-light">
              {personalInfo.tagline}
            </p>
            <p className="mt-5 text-xl md:text-2xl italic font-medium text-violet-600 dark:text-violet-300" aria-label={PERSONAL_MOTTO}>{PERSONAL_MOTTO}</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center z-20 relative">
            <button
              onClick={handleHireMe}
              className={`group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold overflow-hidden transition-all ${hireMeClicked
                ? "bg-emerald-500 text-white"
                : "bg-zinc-900 dark:bg-white text-white dark:text-black hover:scale-105"
                }`}
            >
              <span className="relative z-10 tracking-wide">
                {hireMeClicked ? "Thanks! ↓" : "Hire Me"}
              </span>
            </button>
            <a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-6 py-4 rounded-full border border-zinc-300 dark:border-zinc-700 font-semibold overflow-hidden transition-transform hover:scale-105"
            >
              <span className="text-zinc-700 dark:text-slate-300 tracking-wide">Resume</span>
              <ArrowDownToLine className="w-4 h-4 text-zinc-700 dark:text-slate-300" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-20"
    >
      <div className="flex flex-col items-center justify-center text-center w-full z-10">
        <div className="overflow-hidden mb-2">
          <p className="reveal-text text-primary text-sm md:text-base tracking-[0.3em] uppercase font-medium">
            {personalInfo.role}
          </p>
        </div>
        <div className="brush-name-stage mb-6" aria-live="polite" aria-atomic="true">
          <NameDisplay name={displayName} isNew={isNew} />
        </div>
        <div className="overflow-hidden max-w-2xl mb-8">
          <p className="reveal-text text-zinc-600 dark:text-slate-400 text-lg md:text-2xl leading-relaxed font-light">
            {personalInfo.tagline}
          </p>
          <p className="mt-5 text-xl md:text-2xl italic font-medium text-violet-600 dark:text-violet-300">{PERSONAL_MOTTO}</p>
        </div>
        <div className="reveal-text flex flex-wrap gap-3 justify-center z-20 relative">
          <button
            onClick={handleHireMe}
            className={`group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold overflow-hidden transition-all ${hireMeClicked
              ? "bg-emerald-500 text-white"
              : "bg-zinc-900 dark:bg-white text-white dark:text-black hover:scale-105"
              }`}
          >
            <span className="relative z-10 tracking-wide">
              {hireMeClicked ? "Thanks! ↓" : "Hire Me"}
            </span>
          </button>
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-6 py-4 rounded-full border border-zinc-300 dark:border-zinc-700 font-semibold overflow-hidden transition-transform hover:scale-105"
          >
            <span className="text-zinc-700 dark:text-slate-300 tracking-wide">Resume</span>
            <ArrowDownToLine className="w-4 h-4 text-zinc-700 dark:text-slate-300" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <ArrowDown className="arrow-icon text-zinc-900/40 dark:text-white/50 w-8 h-8" strokeWidth={1} />
      </div>
    </section>
  );
}