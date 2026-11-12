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
    <section id="hero" ref={containerRef} className="exact-hero">
      <div className="exact-hero__desktop">
        <img className="exact-hero__art" src="/hero-exact.png" alt="Anime cyberpunk portrait of Rakshit against a futuristic city and neon portal, with the name Rakshit Rangarajan and AI Solutions Engineer title" />
        <h1 className="sr-only">Rakshit Rangarajan — AI Solutions Engineer</h1>
        <nav className="exact-hero__nav" aria-label="Hero quick navigation">
          <button aria-label="Home" onClick={() => window.scrollTo({top:0,behavior:"smooth"})} style={{top:"32%"}} />
          <button aria-label="About" onClick={() => jumpTo("about")} style={{top:"39%"}} />
          <button aria-label="Projects" onClick={() => jumpTo("projects")} style={{top:"45.5%"}} />
          <button aria-label="Skills" onClick={() => jumpTo("skills")} style={{top:"52%"}} />
          <button aria-label="Experience" onClick={() => jumpTo("experience")} style={{top:"58%"}} />
          <button aria-label="Education" onClick={() => jumpTo("education")} style={{top:"65%"}} />
        </nav>
        <button className="exact-hero__work" aria-label="Explore my work" onClick={() => jumpTo("projects")} />
        <button className="exact-hero__contact" aria-label="Get in touch" onClick={handleHireMe} />
      </div>
      <div className="exact-hero__mobile">
        <img src="/hero-exact.png" alt="Anime cyberpunk portrait of Rakshit Rangarajan" className="w-full h-auto" />
        <div className="exact-hero__mobile-actions">
          <button onClick={() => jumpTo("projects")}>Explore My Work →</button>
          <button onClick={handleHireMe}>Get in Touch</button>
        </div>
      </div>
    </section>
  );
}
