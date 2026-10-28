"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Github, Search, Sparkles } from "lucide-react";

type Category = "AI & Automation" | "Full-stack" | "Research & Prototypes";
type Work = { title: string; category: Category; description: string; stack: string[]; status: string; repo?: string; demo?: string; featured?: boolean };
const works: Work[] = [
  { title: "AERO-BM", category: "AI & Automation", description: "Multi-agent enterprise workspace for epic and ticket analysis, collaborative planning, and root-cause investigation.", stack: ["AI agents", "Python", "Enterprise workflows"], status: "Active development", featured: true },
  { title: "PromptFlow Studio", category: "AI & Automation", description: "Visual workspace for designing and exploring AI application workflows.", stack: ["React", "FastAPI", "TypeScript"], status: "Demo available", demo: "https://promptflow.rakshitr.co.in", featured: true },
  { title: "Project Athena", category: "AI & Automation", description: "Local-first personal commitment assistant designed to track tasks and follow-through.", stack: ["Python", "SQLite", "Podman"], status: "Working build", featured: true },
  { title: "Mnemosyne", category: "AI & Automation", description: "Private knowledge library for saving, organizing, and extracting information from sources.", stack: ["Python", "SQLite", "Background workers"], status: "Implemented milestones" },
  { title: "CrypticSync", category: "Full-stack", description: "Workforce management system with attendance, leave management, reporting, and role-based access.", stack: ["Angular", "FastAPI", "SQLite"], status: "Project showcase" },
  { title: "SayCymraeg", category: "Full-stack", description: "Interactive, gamified Welsh-language learning experience.", stack: ["Next.js", "AI learning", "Web"], status: "Demo listed", demo: "https://saycymraeg.rakshitr.co.in" },
  { title: "ForgeFit", category: "Full-stack", description: "Privacy-oriented fitness application with training and progress tracking.", stack: ["Web app", "AI fitness", "Self-hosting"], status: "Demo listed", demo: "https://forgefit.rakshitr.co.in" },
  { title: "The Office", category: "Research & Prototypes", description: "Three browser-based enterprise AI concept demonstrations: RECLAIM, DOMINO, and SPARK.", stack: ["Prototypes", "Workflows", "UX"], status: "Concept demos" },
  { title: "Morpheus", category: "Research & Prototypes", description: "Exploration of natural-language forms, secure responses, and interactive analytics.", stack: ["AI forms", "Analytics", "Pantheon"], status: "Early development" },
];
const categories = ["All", "AI & Automation", "Full-stack", "Research & Prototypes"] as const;

export default function PortfolioShowcase() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => works.filter(w =>
    (category === "All" || w.category === category) &&
    (w.title + " " + w.description + " " + w.stack.join(" ")).toLowerCase().includes(query.toLowerCase())
  ), [category, query]);

  return <section id="projects" className="relative w-full px-5 py-24 md:px-12 lg:px-20 text-zinc-900 dark:text-white" aria-labelledby="portfolio-title">
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div><p className="mb-3 text-xs font-semibold uppercase tracking-[.3em] text-violet-500">Selected engineering work</p>
          <h2 id="portfolio-title" className="text-5xl font-bold tracking-tight md:text-7xl">Built to solve <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">real problems.</span></h2>
          <p className="mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">AI systems, enterprise software, and thoughtful experiments. Each project is labeled by its current stage—not every prototype is a production application.</p>
        </div>
      </div>
      <aside className="mb-12 overflow-hidden rounded-3xl border border-violet-400/40 bg-gradient-to-br from-[#10142f] via-[#1b1741] to-[#301353] p-8 text-white md:p-12" aria-label="NeuralForge coming soon">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/40 px-4 py-2 text-xs font-bold uppercase tracking-widest text-violet-200"><Sparkles size={15}/> Coming soon</span>
        <h3 className="mt-5 text-4xl font-bold md:text-6xl">NeuralForge<span className="text-violet-300">.</span></h3>
        <p className="mt-4 max-w-2xl text-lg text-slate-200">A free AI-powered mentorship universe for learners, builders, and future engineers. We're forging the experience—stay tuned.</p>
        <p className="mt-6 text-sm text-violet-200">Preview announcement only · No public application or source access yet</p>
      </aside>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" aria-label="Filter projects">
          {categories.map(c => <button key={c} type="button" onClick={() => setCategory(c)} aria-pressed={category===c} className={`rounded-full border px-4 py-2 text-sm transition-colors ${category===c ? "border-violet-500 bg-violet-600 text-white" : "border-zinc-300 bg-white/60 text-zinc-700 hover:border-violet-400 dark:border-white/20 dark:bg-white/5 dark:text-zinc-200"}`}>{c}</button>)}
        </div>
        <label className="flex items-center gap-2 rounded-full border border-zinc-300 bg-white/70 px-4 py-2 dark:border-white/20 dark:bg-white/5"><Search size={18} aria-hidden="true"/><span className="sr-only">Search projects</span><input className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-400 md:w-48" placeholder="Search projects" value={query} onChange={e=>setQuery(e.target.value)}/></label>
      </div>
      <p className="mb-5 text-sm text-zinc-500 dark:text-zinc-400" aria-live="polite">{filtered.length} projects</p>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((work, index) => <article key={work.title} className="group flex min-h-[330px] flex-col rounded-3xl border border-zinc-200 bg-white/80 p-7 shadow-sm transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-[#11152a]/90">
          <div className="flex items-center justify-between gap-3"><span className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-300">{work.category}</span><span className="text-xs text-zinc-500 dark:text-zinc-400">{String(index+1).padStart(2,"0")}</span></div>
          <h3 className="mt-8 text-3xl font-bold">{work.title}</h3><p className="mt-3 flex-1 leading-relaxed text-zinc-600 dark:text-zinc-300">{work.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">{work.stack.map(s=><span key={s} className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-white/10 dark:text-zinc-200">{s}</span>)}</div>
          <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-5 dark:border-white/10"><span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{work.status}</span>
            <div className="flex gap-3">{work.repo && <a href={work.repo} target="_blank" rel="noopener noreferrer" aria-label={`View ${work.title} source`}><Github size={19}/></a>}{work.demo && <a href={work.demo} target="_blank" rel="noopener noreferrer" aria-label={`View ${work.title} demo`} className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 dark:text-violet-300">Demo <ArrowUpRight size={16}/></a>}</div>
          </div>
        </article>)}
      </div>
      {filtered.length===0 && <p className="rounded-2xl border border-dashed border-zinc-400 p-10 text-center">No matching projects. Try another search or category.</p>}
    </div>
  </section>;
}
