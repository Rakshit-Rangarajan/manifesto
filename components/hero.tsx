"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowDownToLine } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const NAME_VARIANTS = ["Rakshit Rangarajan", "ラクシット ランガラジャン", "रक्षित रंगराजन", "ரக்ஷித் ரங்கராஜன்", "ರಕ್ಷಿತ್ ರಂಗರಾಜನ್"];

function NameDisplay({ name, isNew }: { name: string; isNew: boolean }) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".char");
    gsap.fromTo(chars,
      { y: isNew ? 80 : -80, opacity: 0, rotateX: isNew ? 90 : -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.7)"
      }
    );
  }, [name, isNew]);

  let chars: string[] = [];
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segments = Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(name)).map(s => s.segment);
    const merged = [];
    for (let s of segments) {
      if (
        merged.length > 0 &&
        /[\u094D\u09CD\u0A4D\u0ACD\u0B4D\u0BCD\u0C4D\u0CCD\u0D4D\u0DCA\u200D]$/.test(merged[merged.length - 1]) &&
        !/^[\s.,!?]/.test(s)
      ) {
        merged[merged.length - 1] += s;
      } else {
        merged.push(s);
      }
    }
    chars = merged;
  } else {
    chars = name.split("");
  }

  return (
    <h1
      ref={containerRef}
      className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-tight md:leading-snug"
    >
      {chars.map((char, i) => (
        <span key={i} className="char inline-block" style={{ display: char === " " ? "inline" : "inline-block", paddingBottom: "0.2em", paddingTop: "0.2em" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
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
          <div className="overflow-hidden mb-6 py-8">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-tight md:leading-snug">
              {NAME_VARIANTS[0]}
            </h1>
          </div>
          <div className="overflow-hidden max-w-2xl mb-8">
            <p className="text-zinc-600 dark:text-slate-400 text-lg md:text-2xl leading-relaxed font-light">
              {personalInfo.tagline}
            </p>
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
        <div className="overflow-hidden mb-6 py-8 min-h-[1.5em]">
          <NameDisplay name={displayName} isNew={isNew} />
        </div>
        <div className="overflow-hidden max-w-2xl mb-8">
          <p className="reveal-text text-zinc-600 dark:text-slate-400 text-lg md:text-2xl leading-relaxed font-light">
            {personalInfo.tagline}
          </p>
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