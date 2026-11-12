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

  const jumpTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="hero" ref={containerRef} className="anime-hero">
      <div className="anime-hero__sky" aria-hidden="true" />
      <div className="anime-hero__city" aria-hidden="true" />
      <div className="anime-hero__frame" aria-hidden="true" />
      <aside className="anime-hero__rail" aria-label="Quick navigation">
        <a href="#hero" aria-label="Home" className="anime-hero__monogram">RR</a>
        <nav>
          <a href="#hero" aria-label="Home">⌂</a>
          <a href="#about" aria-label="About">♙</a>
          <a href="#projects" aria-label="Projects">⌘</a>
          <a href="#skills" aria-label="Skills">◇</a>
          <a href="#experience" aria-label="Experience">▤</a>
          <a href="#education" aria-label="Education">✧</a>
        </nav>
      </aside>
      <div className="anime-hero__grid">
        <div className="anime-hero__art" aria-hidden="true">
          <div className="anime-hero__halo" />
          <img src="/cyberpunk_ai_architect_workspace.png" alt="" />
          <div className="anime-hero__art-fade" />
        </div>
        <div className="anime-hero__content">
          <div className="anime-hero__topline"><span>RAKSHIT RANGARAJAN</span><i /></div>
          <p className="anime-hero__subline">AI Engineer <em>·</em> Architect <em>·</em> Builder</p>
          <p className="anime-hero__greeting">// こんにちは &nbsp; // नमस्ते &nbsp; // வணக்கம் &nbsp; // ನಮಸ್ಕಾರ</p>
          <div className="anime-hero__name" aria-live="polite" aria-atomic="true">
            {mounted ? <NameDisplay key={displayName} name={displayName} isNew={isNew} /> : <h1 className="brush-name brush-name--en"><span className="brush-name__ink">{NAME_VARIANTS[0]}</span></h1>}
          </div>
          <div className="anime-hero__translations" aria-label="Rakshit Rangarajan in multiple languages">
            <span>रक्षित रंगराजन</span><b>|</b><span>ரக்ஷித் ரங்கராஜன்</span><b>|</b><span>ರಕ್ಷಿತ್ ರಂಗರಾಜನ್</span><b>|</b><span>ラクシット・ランガラジャン</span>
          </div>
          <h2 className="anime-hero__role">AI SOLUTIONS ENGINEER</h2>
          <p className="anime-hero__specialties">Multi-Agent Systems <b>|</b> RAG &amp; Knowledge Systems <b>|</b> Autonomous Automation</p>
          <div className="anime-hero__tags"><span>Build</span><span>Automate</span><span>Orchestrate</span><span>Scale</span></div>
          <div className="anime-hero__buttons">
            <button onClick={() => jumpTo("projects")} className="anime-hero__cta">Explore My Work <span aria-hidden="true">→</span></button>
            <button onClick={handleHireMe} className="anime-hero__outline"><span aria-hidden="true">✉</span> Get in Touch</button>
          </div>
        </div>
      </div>
    </section>
  );
}
