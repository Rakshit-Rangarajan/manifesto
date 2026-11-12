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
    <section id="hero" ref={containerRef} className="cyber-hero relative isolate overflow-hidden min-h-[min(900px,100svh)]">
      <div className="cyber-hero__ambient" aria-hidden="true" />
      <div className="cyber-hero__frame" aria-hidden="true" />
      <div className="cyber-hero__layout">
        <div className="cyber-hero__visual" aria-label="Futuristic AI architect illustration">
          <div className="cyber-hero__portal" aria-hidden="true" />
          <div className="cyber-hero__figure">
            <img src="/cyberpunk_ai_architect_workspace.png" alt="AI architect working with futuristic holographic systems" />
          </div>
          <div className="cyber-hero__visual-fade" aria-hidden="true" />
        </div>
        <div className="cyber-hero__content">
          <div className="cyber-hero__eyebrow"><span>RAKSHIT RANGARAJAN</span><span className="cyber-hero__eyebrow-line" /></div>
          <p className="cyber-hero__subtitle">AI Engineer <span>·</span> Architect <span>·</span> Builder</p>
          <p className="cyber-hero__hello">// こんにちは &nbsp; // नमस्ते &nbsp; // வணக்கம் &nbsp; // ನಮಸ್ಕಾರ</p>
          <div className="cyber-hero__name" aria-live="polite" aria-atomic="true">
            {mounted ? <NameDisplay key={displayName} name={displayName} isNew={isNew} /> : <h1 className="brush-name brush-name--en"><span className="brush-name__ink">{NAME_VARIANTS[0]}</span></h1>}
          </div>
          <p className="cyber-hero__role">AI SOLUTIONS ENGINEER</p>
          <p className="cyber-hero__expertise">Multi-Agent Systems <span>|</span> RAG &amp; Knowledge Systems <span>|</span> Autonomous Automation</p>
          <div className="cyber-hero__chips"><span>Build</span><span>Automate</span><span>Orchestrate</span><span>Scale</span></div>
          <div className="cyber-hero__actions">
            <a href="#portfolio" onClick={(e) => { const target = document.getElementById("portfolio") || document.getElementById("projects"); if (target) { e.preventDefault(); target.scrollIntoView({behavior:"smooth"}); } }} className="cyber-hero__primary">Explore My Work <span aria-hidden="true">→</span></a>
            <button onClick={handleHireMe} className="cyber-hero__secondary">Get in Touch</button>
          </div>
        </div>
      </div>
    </section>
  );
}
