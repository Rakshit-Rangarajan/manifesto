"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, CSSProperties } from "react";
import Link from "next/link";

const PARTICLES = Array.from({ length: 36 }, (_, i) => ({
  angle: (i * 137.508 * Math.PI) / 180,
  radius: 18 + ((i * 19) % 32),
  size: 1 + (i % 3),
  delay: (i % 9) * -0.4,
}));

const FEATURED_PROJECTS = [
  {
    "name": "AERO",
    "subtitle": "Autonomous Engineering & Release Orchestrator",
    "status": "Active development",
    "problem": "Enterprise requirements and incidents need structured analysis before implementation.",
    "approach": "AI-assisted planning and coordinated engineering workflows with engineer review and control.",
    "href": "/projects/aero"
  },
  {
    "name": "Project Athena",
    "subtitle": "Local-first commitment assistant",
    "status": "Working build",
    "problem": "Commitments and follow-ups get lost across conversations and tools.",
    "approach": "Bring tasks, reminders, and follow-up workflows into a local-first assistant.",
    "href": "/projects/athena"
  },
  {
    "name": "PromptFlow Studio",
    "subtitle": "Visual AI workflow design",
    "status": "Demo available",
    "problem": "AI workflow behavior is difficult to inspect when the steps are hidden in code.",
    "approach": "Expose connected workflow steps in a visual workspace for experimentation.",
    "href": "/projects/promptflow-studio"
  }
];

export default function ArcanePreview() {
  const [intro, setIntro] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [activeSystem, setActiveSystem] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduceMotion(media.matches);
      if (media.matches) setIntro(false);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion || !intro) return;
    const timeout = window.setTimeout(() => setIntro(false), 1350);
    return () => window.clearTimeout(timeout);
  }, [intro, reduceMotion]);

  useEffect(() => () => { if (frame.current !== null) cancelAnimationFrame(frame.current); }, []);

  const move = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setPosition({ x, y }));
  };

  return (
    <div className="arcane-root">
      <style>{`
        .arcane-root{--arcane-bg:#080b19;--arcane-text:#f4e9dd;--arcane-accent:#b78bff;min-height:100svh;background:radial-gradient(ellipse at 75% 35%,#241547 0%,transparent 45%),radial-gradient(ellipse at 30% 95%,#0b2948 0%,transparent 45%),var(--arcane-bg);color:var(--arcane-text);overflow:hidden;font-family:Inter,system-ui,sans-serif}
        .arcane-root *{box-sizing:border-box}.arcane-nav{display:flex;align-items:center;justify-content:space-between;padding:1.3rem clamp(1.25rem,5vw,5rem);gap:1rem}.arcane-logo{font-family:Georgia,serif;font-size:1.8rem;color:#f6dfb9}.arcane-back{color:#e9ddff;text-decoration:none;border:1px solid #7d679a;border-radius:999px;padding:.6rem 1rem}.arcane-back:focus-visible,.arcane-skip:focus-visible{outline:3px solid #f6dfb9;outline-offset:4px}
        .arcane-main{min-height:calc(100svh - 90px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);align-items:center;gap:2rem;padding:2rem clamp(1.25rem,6vw,7rem) 5rem}.arcane-eyebrow{text-transform:uppercase;letter-spacing:.24em;color:#c9b1ff;font-size:.72rem}.arcane-title{font-family:Georgia,serif;font-size:clamp(3rem,6.4vw,7rem);line-height:1.05;letter-spacing:-.045em;margin:1rem 0;color:#ffeddb}.arcane-tagline{font-family:Georgia,serif;font-style:italic;color:#d8b8ff;font-size:clamp(1.1rem,2vw,1.6rem)}.arcane-copy{color:#bfc6df;line-height:1.8;max-width:38rem}.arcane-pill{display:inline-block;margin-top:1.4rem;padding:.8rem 1.2rem;border:1px solid #a17dcc;border-radius:999px;color:#fff0d9;text-decoration:none}
        .arcane-core-area{position:relative;display:grid;place-items:center;min-height:clamp(320px,52vw,680px);isolation:isolate}.arcane-core{position:relative;width:min(76vw,480px);aspect-ratio:1;display:grid;place-items:center;transform:perspective(900px) rotateY(var(--tilt-x,0deg)) rotateX(var(--tilt-y,0deg));transition:transform .2s ease-out;filter:drop-shadow(0 0 35px #6540cf55)}.arcane-ring{position:absolute;border:1px solid #c99aff88;border-radius:50%;inset:8%;box-shadow:inset 0 0 32px #7846e033,0 0 24px #7854da33}.arcane-ring.a{border-style:dashed;animation:arcane-spin 45s linear infinite}.arcane-ring.b{inset:19%;border-color:#9dbeff99;transform:rotateX(67deg);animation:arcane-spin 30s linear infinite reverse}.arcane-ring.c{inset:30%;border-color:#eac6a6aa;animation:arcane-spin 20s linear infinite}.arcane-sphere{width:30%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 35% 30%,#e7f9ff,#69aaff 19%,#7b43db 45%,#140b39 76%);box-shadow:0 0 50px #8763f8,0 0 130px #486edb99,inset -14px -18px 30px #0d092e}.arcane-particle{position:absolute;left:50%;top:50%;width:var(--size);height:var(--size);border-radius:50%;background:#d8c4ff;box-shadow:0 0 12px #a4c8ff;transform:rotate(var(--angle)) translateX(var(--radius));animation:arcane-glimmer 3s ease-in-out infinite;animation-delay:var(--delay)}.arcane-core-caption{position:absolute;bottom:0;color:#e6d5ff;font-size:.75rem;letter-spacing:.2em;text-transform:uppercase}
        .arcane-intro{position:fixed;inset:0;z-index:50;background:#080b19;display:grid;place-items:center;gap:1rem;align-content:center;animation:arcane-dismiss .5s ease 1s forwards}.arcane-monogram{font-family:Georgia,serif;font-size:clamp(5rem,22vw,13rem);letter-spacing:-.12em;color:#f7dcaf;text-shadow:0 0 55px #9b6bff;animation:arcane-appear .9s ease both}.arcane-intro p{color:#d2baff;letter-spacing:.22em;font-size:.7rem;text-transform:uppercase}.arcane-skip{position:absolute;right:1.5rem;bottom:1.5rem;color:#fff;background:#33224f;border:1px solid #a68ad2;padding:.65rem 1rem;border-radius:999px;cursor:pointer}
        @keyframes arcane-spin{to{transform:rotate(360deg)}}@keyframes arcane-glimmer{50%{opacity:.2}}@keyframes arcane-appear{from{opacity:0;transform:scale(.85);filter:blur(15px)}to{opacity:1;transform:scale(1);filter:blur(0)}}@keyframes arcane-dismiss{to{opacity:0;visibility:hidden}}
        .arcane-systems{padding:2rem clamp(1.25rem,6vw,7rem) 7rem;max-width:1450px;margin:auto}.arcane-systems-heading{font-family:Georgia,serif;font-size:clamp(2rem,4vw,3.5rem);margin:0 0 .7rem}.arcane-systems-subtitle{color:#bfc6df;max-width:52rem;line-height:1.75}.arcane-system-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;margin-top:2.5rem}.arcane-system-card{display:flex;flex-direction:column;align-items:flex-start;text-align:left;min-height:230px;border:1px solid #564675;background:linear-gradient(155deg,#241c3a,#0e182a);border-radius:20px;padding:1.7rem;color:#f4e9dd;cursor:pointer;transition:border-color .2s,transform .2s}.arcane-system-card:hover,.arcane-system-card[aria-pressed=true]{border-color:#c4a2ff;transform:translateY(-3px)}.arcane-system-card:focus-visible{outline:3px solid #f6dfb9;outline-offset:3px}.arcane-system-number{font-family:Georgia,serif;font-size:2.2rem;color:#d6b9ff}.arcane-system-title{font-family:Georgia,serif;font-size:1.5rem;margin:1.5rem 0 .6rem}.arcane-system-summary{color:#c2c7dc;font-size:.92rem;line-height:1.65}.arcane-system-detail{margin-top:1.25rem;padding:1.4rem 1.7rem;border-left:2px solid #b78bff;background:#17162b;border-radius:0 12px 12px 0;line-height:1.7;color:#e4dcf3}.arcane-footer{padding:2rem clamp(1.25rem,6vw,7rem);border-top:1px solid #554569;color:#aeb6d0;display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}.arcane-footer a{color:#f3dfbf}.arcane-core-area:focus-visible{outline:3px solid #f6dfb9;outline-offset:3px}
        .arcane-systems{padding:4rem clamp(1.25rem,6vw,7rem) 7rem;max-width:1450px;margin:auto}.arcane-systems-heading{font-family:Georgia,serif;font-size:clamp(2rem,4vw,3.5rem);margin:0 0 .7rem}.arcane-systems-subtitle{color:#bfc6df;max-width:52rem;line-height:1.75}.arcane-system-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;margin-top:2.5rem}.arcane-system-card{display:flex;flex-direction:column;align-items:flex-start;text-align:left;gap:.65rem;min-height:225px;border:1px solid #564675;background:linear-gradient(155deg,#241c3a,#0e182a);border-radius:20px;padding:1.7rem;color:#f4e9dd;cursor:pointer;transition:border-color .2s,transform .2s}.arcane-system-card:hover,.arcane-system-card[aria-pressed=true]{border-color:#c4a2ff;transform:translateY(-3px)}.arcane-system-card:focus-visible{outline:3px solid #f6dfb9;outline-offset:3px}.arcane-system-number{font-family:Georgia,serif;font-size:2.2rem;color:#d6b9ff}.arcane-system-title{font-family:Georgia,serif;font-size:1.5rem;margin-top:1rem}.arcane-system-summary{color:#c2c7dc;font-size:.92rem;line-height:1.65}.arcane-system-detail{margin-top:1.25rem;padding:1.4rem 1.7rem;border-left:2px solid #b78bff;background:#17162b;border-radius:0 12px 12px 0;line-height:1.7;color:#e4dcf3}.arcane-system-detail h3{font-family:Georgia,serif;font-size:1.3rem;margin-top:1.2rem}.arcane-system-detail p{max-width:65ch}.arcane-statement{text-align:center;padding:5rem 1.5rem;background:linear-gradient(90deg,#15102b,#182b46,#15102b)}.arcane-statement p{font:italic clamp(1.7rem,4vw,3.5rem) Georgia,serif;color:#f4e3ce}.arcane-statement span{color:#c4bdd7}.arcane-footer{padding:2rem clamp(1.25rem,6vw,7rem);border-top:1px solid #554569;color:#aeb6d0;display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}.arcane-footer a{color:#f3dfbf}
        @media(max-width:760px){.arcane-main{grid-template-columns:1fr;text-align:center;padding-top:2rem}.arcane-copy{margin-inline:auto}.arcane-core-area{min-height:340px}.arcane-core{width:min(82vw,340px)}.arcane-title{font-size:clamp(3rem,12vw,5rem)}.arcane-system-grid{grid-template-columns:1fr}.arcane-system-card{min-height:170px}}
        @media(prefers-reduced-motion:reduce){.arcane-root *, .arcane-root *::before,.arcane-root *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
      `}</style>
      {intro && !reduceMotion && <div className="arcane-intro" role="presentation"><div className="arcane-monogram">RR</div><p>Rakshit Rangarajan · AI Solutions Architect</p><button className="arcane-skip" onClick={() => setIntro(false)}>Skip intro</button></div>}
      <nav className="arcane-nav" aria-label="Prototype navigation"><span className="arcane-logo">RR</span><Link className="arcane-back" href="/">Back to portfolio</Link></nav>
      <main className="arcane-main"><section><p className="arcane-eyebrow">AI Solutions Architect · Arcane Engineer Prototype</p><h1 className="arcane-title">Engineering<br />the impossible.</h1><p className="arcane-tagline">where logic meets a little magic.</p><p className="arcane-copy">I design AI systems that solve real problems, automate the complex, and turn ambitious ideas into meaningful impact.</p><a className="arcane-pill" href="#arcane-projects">Explore my work →</a></section><section className="arcane-core-area" aria-label="Decorative interactive neural core" onPointerMove={move} onPointerLeave={() => setPosition({ x: 0, y: 0 })}><div className="arcane-core" style={{ "--tilt-x": `${position.x * 12}deg`, "--tilt-y": `${-position.y * 12}deg` } as CSSProperties}><div className="arcane-ring a"/><div className="arcane-ring b"/><div className="arcane-ring c"/><div className="arcane-sphere"/>{PARTICLES.map((p,i)=><span key={i} className="arcane-particle" style={{"--size":`${p.size}px`,"--angle":`${p.angle}rad`,"--radius":`${p.radius * 3}px`,"--delay":`${p.delay}s`} as CSSProperties}/>)}</div><span className="arcane-core-caption">Neural Core · Interactive Study</span></section></main>
      <section className="arcane-systems" id="arcane-projects" aria-labelledby="arcane-project-heading">
        <p className="arcane-eyebrow">Selected work · Real engineering challenges</p>
        <h2 id="arcane-project-heading" className="arcane-systems-heading">Systems, not just software.</h2>
        <p className="arcane-systems-subtitle">Three projects, three different problems. Explore the engineering thinking behind each one. Project status reflects the existing portfolio; performance metrics are not invented.</p>
        <div className="arcane-system-grid">
          {FEATURED_PROJECTS.map((project,index)=><button type="button" key={project.name} className="arcane-system-card" aria-pressed={activeSystem===index} onClick={()=>setActiveSystem(index)}>
            <span className="arcane-system-number">0{index+1}</span><span className="arcane-system-title">{project.name}</span><span className="arcane-system-summary">{project.subtitle}</span><span className="arcane-system-summary">{project.status}</span>
          </button>)}
        </div>
        <div className="arcane-system-detail" aria-live="polite">
          <p className="arcane-eyebrow">{FEATURED_PROJECTS[activeSystem].name} · Engineering brief</p>
          <h3>The challenge</h3><p>{FEATURED_PROJECTS[activeSystem].problem}</p>
          <h3>The approach</h3><p>{FEATURED_PROJECTS[activeSystem].approach}</p>
          <Link className="arcane-pill" href={FEATURED_PROJECTS[activeSystem].href}>Explore existing case study →</Link>
        </div>
      </section>
      <section className="arcane-statement" aria-label="Engineering philosophy"><p>“I am lazy, so I automate.”</p><span>Engineering time belongs to problems worth solving.</span></section>
      <footer className="arcane-footer"><span>Arcane Engineer · V3 design study</span><Link href="/">Return to current portfolio</Link></footer>
    </div>
  );
}
