"use client";

import { useState } from "react";
import { education, experience } from "@/data/portfolio";

type Milestone = { period: string; title: string; subtitle: string; detail: string; kind: "Career" | "Education" };
const milestones: Milestone[] = [
  ...experience.map(item => ({ period: item.period, title: item.role, subtitle: item.company, detail: item.description[0] ?? "Professional engineering experience.", kind: "Career" as const })),
  ...education.map(item => ({ period: item.period, title: item.degree, subtitle: item.institution, detail: item.location, kind: "Education" as const })),
];

export default function ArcaneConstellation() {
  const [selected, setSelected] = useState(0);
  return <section aria-labelledby="arcane-constellation-title" className="relative w-full overflow-hidden px-5 py-24 text-zinc-900 dark:text-white md:px-12">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(138,92,246,.12),transparent_65%)]" aria-hidden="true"/>
    <div className="relative mx-auto max-w-6xl">
      <p className="text-xs font-semibold uppercase tracking-[.3em] text-violet-700 dark:text-violet-300">An evolving constellation</p>
      <h2 id="arcane-constellation-title" className="mt-4 font-serif text-4xl tracking-tight md:text-6xl">A journey through <em className="text-violet-700 dark:text-violet-300">possibility.</em></h2>
      <p className="mt-5 max-w-2xl leading-relaxed text-zinc-600 dark:text-slate-300">Explore the milestones behind my approach to engineering, AI and automation. Select a point to discover its story.</p>
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <div role="group" aria-label="Career and education milestones" className="relative space-y-3 before:absolute before:bottom-8 before:left-5 before:top-8 before:w-px before:bg-gradient-to-b before:from-violet-500 before:via-cyan-500 before:to-transparent">
          {milestones.map((item,index)=><button type="button" key={item.period+item.title} aria-pressed={selected===index} onClick={()=>setSelected(index)} className={`relative flex w-full items-center gap-5 rounded-2xl border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 ${selected===index ? "border-violet-500/60 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,.12)]" : "border-zinc-300/60 bg-white/60 hover:border-violet-400/60 dark:border-white/10 dark:bg-white/5"}`}>
            <span aria-hidden="true" className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg ${selected===index ? "border-violet-400 bg-violet-700 text-white" : "border-violet-300 bg-white text-violet-700 dark:bg-[#14182b] dark:text-violet-200"}`}>✦</span>
            <span className="min-w-0"><span className="block text-xs uppercase tracking-widest text-violet-700 dark:text-violet-300">{item.kind} · {item.period}</span><span className="mt-1 block text-base font-semibold md:text-lg">{item.title}</span></span>
          </button>)}
        </div>
        <div className="self-start rounded-[2rem] border border-violet-400/30 bg-gradient-to-br from-violet-100/80 via-white/70 to-cyan-50/70 p-7 shadow-xl shadow-violet-500/5 dark:from-[#231a3b] dark:via-[#141a30] dark:to-[#0c2434] md:p-10" aria-live="polite" aria-atomic="true">
          <div className="mb-8 flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[.25em] text-violet-700 dark:text-violet-300">Selected milestone</span><span className="font-serif text-3xl text-violet-500/70">0{selected+1}</span></div>
          <p className="text-sm text-zinc-600 dark:text-slate-300">{milestones[selected].period}</p>
          <h3 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">{milestones[selected].title}</h3>
          <p className="mt-4 font-semibold text-violet-800 dark:text-violet-200">{milestones[selected].subtitle}</p>
          <div className="mt-8 h-px bg-gradient-to-r from-violet-400/60 to-transparent"/>
          <p className="mt-6 leading-relaxed text-zinc-700 dark:text-slate-200">{milestones[selected].detail}</p>
        </div>
      </div>
    </div>
  </section>;
}
