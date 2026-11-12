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
  return <h1 ref={headingRef} lang={NAME_LANGUAGES[index]} aria-label={name} className={`brush-name brush-name--${NAME_LANGUAGES[index]} name-glitch`}>
    <span className="brush-name__ink" data-text={name}>{name}</span>
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

  return (
    <section id="hero" ref={containerRef} className="relative w-full min-h-[85svh] px-5 sm:px-8 lg:px-14 xl:px-20 pt-28 pb-16 lg:py-28 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1480px] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-center gap-10 lg:gap-12 xl:gap-20">
        <div className="min-w-0 flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="text-primary text-xs sm:text-sm tracking-[.22em] uppercase font-semibold mb-5">{personalInfo.role}</p>
          <div className="brush-name-stage mb-6" aria-live="polite" aria-atomic="true">
            {mounted ? <NameDisplay key={displayName} name={displayName} isNew={isNew} /> : <h1 lang="en" className="brush-name brush-name--en"><span className="brush-name__ink">{NAME_VARIANTS[0]}</span></h1>}
          </div>
          <p className="max-w-xl text-zinc-700 dark:text-slate-200 text-lg md:text-xl xl:text-2xl leading-relaxed">{personalInfo.tagline}</p>
          <p className="max-w-xl mt-5 text-base md:text-lg italic font-medium text-slate-600 dark:text-indigo-200">{PERSONAL_MOTTO}</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
            <button onClick={handleHireMe} className="inline-flex items-center rounded-full bg-cyan-300 px-7 py-3.5 text-[#080b20] font-semibold transition-transform hover:scale-105">{hireMeClicked ? "Thanks! ↓" : "Hire Me"}</button>
            <a href="/resume" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-zinc-400/50 dark:border-white/25 px-7 py-3.5 font-semibold hover:border-cyan-300 transition-colors">Resume <ArrowDownToLine className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="relative min-w-0 w-full">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-cyan-500/15 via-violet-500/20 to-fuchsia-500/15 blur-2xl pointer-events-none" />
          <div className="relative rounded-2xl overflow-hidden border border-cyan-300/30 bg-[#090c20] shadow-[0_20px_90px_rgba(35,23,98,.35)]">
            <img src="/cyberpunk_ai_architect_workspace.png" alt="Cyberpunk illustration of Rakshit designing AI systems at a futuristic workstation" className="block w-full h-auto" loading="eager" />
          </div>
        </div>
      </div>
    </section>
  );
}
