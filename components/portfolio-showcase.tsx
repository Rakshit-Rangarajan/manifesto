"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Search, Sparkles, X } from "lucide-react";

type Category = "AI & Automation" | "Full-stack" | "Research & Prototypes";
type Work = { title: string; category: Category; description: string; stack: string[]; status: string; repo?: string; demo?: string; featured?: boolean; problem: string; approach: string };
const works: Work[] = [
  { title: "AERO (Autonomous Engineering & Release Orchestrator)", category: "AI & Automation", description: "Turns complex enterprise requirements and incidents into structured analysis, actionable engineering plans, and coordinated AI-assisted workflows.", stack: ["AI agents", "Python", "Enterprise workflows"], status: "Active development", repo: "https://github.com/Rakshit-Rangarajan/AERO-BM", featured: true, problem: "Complex enterprise requirements and incident investigations consume time before implementation can even begin.", approach: "Explore AI-assisted planning and coordinated analysis while retaining engineer review and control." },
  { title: "PromptFlow Studio", category: "AI & Automation", description: "Visual workspace for designing and exploring AI application workflows.", stack: ["React", "FastAPI", "TypeScript"], status: "Demo available", demo: "https://promptflow.rakshitr.co.in", featured: true, problem: "AI workflows can be difficult to understand and refine when their steps are hidden in code.", approach: "Visualise application flows and experiment with how components connect." },
  { title: "Project Athena", category: "AI & Automation", description: "Helps prevent missed commitments by organizing tasks, follow-ups, and reminders into a local-first assistant workflow.", stack: ["Python", "SQLite", "Podman"], status: "Working build", repo: "https://github.com/Rakshit-Rangarajan/Project-Athena", featured: true, problem: "Follow-ups and commitments can get lost across conversations and tools.", approach: "Explore a local-first assistant that brings tasks and reminders into a more consistent workflow." },
  { title: "Mnemosyne", category: "AI & Automation", description: "Makes scattered notes and documents easier to retrieve, organize, and reuse through a private knowledge workspace.", stack: ["Python", "SQLite", "Background workers"], status: "Implemented milestones", problem: "Useful information becomes hard to retrieve when it is scattered across documents and notes.", approach: "Organise a private knowledge workspace focused on storing and retrieving information." },
  { title: "CrypticSync", category: "Full-stack", description: "Workforce management system with attendance, leave management, reporting, and role-based access.", stack: ["Angular", "FastAPI", "SQLite"], status: "Project showcase", problem: "Attendance, leave and workforce records are cumbersome when managed across disconnected processes.", approach: "Consolidate common workforce administration into a role-aware application." },
  { title: "SayCymraeg", category: "Full-stack", description: "Interactive, gamified Welsh-language learning experience.", stack: ["Next.js", "AI learning", "Web"], status: "Demo listed", demo: "https://saycymraeg.rakshitr.co.in", problem: "Learning a language requires accessible ways to practise regularly.", approach: "Provide interactive, game-like Welsh learning experiences." },
  { title: "ForgeFit", category: "Full-stack", description: "Privacy-oriented fitness application with training and progress tracking.", stack: ["Web app", "AI fitness", "Self-hosting"], status: "Demo listed", demo: "https://forgefit.rakshitr.co.in", problem: "Fitness tracking and personalised guidance often require recurring subscriptions or centralised services.", approach: "Explore a self-hostable approach to routines and progress tracking." },
  { title: "The Office", category: "Research & Prototypes", description: "Explores three practical ways AI could reduce repetitive enterprise work through the RECLAIM, DOMINO, and SPARK concept demos.", stack: ["Prototypes", "Workflows", "UX"], status: "Concept demos", problem: "Repetitive enterprise workflows are difficult to rethink without concrete examples.", approach: "Prototype RECLAIM, DOMINO and SPARK as demonstrations of potential AI-assisted workflows." },
  { title: "Morpheus", category: "Research & Prototypes", description: "Exploration of natural-language forms, secure responses, and interactive analytics.", stack: ["AI forms", "Analytics", "Pantheon"], status: "Early development", problem: "Conventional forms can be rigid and demanding to create or fill in.", approach: "Explore natural-language form experiences and the associated response-handling challenges." },
];
const flagshipSlugs: Record<string, string> = {
  "AERO (Autonomous Engineering & Release Orchestrator)": "aero",
  "Project Athena": "athena",
  "PromptFlow Studio": "promptflow-studio",
};
const categories = ["All", "AI & Automation", "Full-stack", "Research & Prototypes"] as const;

export default function PortfolioShowcase() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Work | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!selected) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "Tab") {
        const dialog = document.getElementById("project-detail-dialog");
        const items = dialog?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (!items?.length) return;
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); previousFocusRef.current?.focus(); };
  }, [selected]);
  const filtered = useMemo(() => works.filter(w =>
    (category === "All" || w.category === category) &&
    (w.title + " " + w.description + " " + w.stack.join(" ")).toLowerCase().includes(query.toLowerCase())
  ), [category, query]);

  return <section id="projects" className="relative w-full px-5 py-24 md:px-12 lg:px-20 text-zinc-900 dark:text-white" aria-labelledby="portfolio-title">
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div><p className="mb-3 text-xs font-semibold uppercase tracking-[.3em] text-violet-500">AI systems and practical engineering</p>
          <h2 id="portfolio-title" className="text-5xl font-bold tracking-tight md:text-7xl">Built to solve <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">real problems.</span></h2>
          <p className="mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">From enterprise automation to private knowledge retrieval and experimental agents, I build around a problem worth solving. Maturity labels distinguish working applications from prototypes; where available, explore the actual code or demo.</p>
        </div>
      </div>
      <aside className="mb-12 overflow-hidden rounded-3xl border border-violet-400/40 bg-gradient-to-br from-[#10142f] via-[#1b1741] to-[#301353] p-8 text-white md:p-12" aria-label="NeuralForge coming soon">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/40 px-4 py-2 text-xs font-bold uppercase tracking-widest text-violet-200"><Sparkles size={15}/> Coming soon</span>
        <h3 className="mt-5 text-4xl font-bold md:text-6xl">NeuralForge<span className="text-violet-300">.</span></h3>
        <p className="mt-4 max-w-2xl text-lg text-slate-200">A free AI-powered mentorship universe for learners, builders, and future engineers. We're forging the experience—stay tuned.</p>
        <p className="mt-6 text-sm text-violet-200">Preview announcement only · No public application or source access yet</p>
      </aside>
      <div className="mb-12" aria-labelledby="flagship-title">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-violet-600 dark:text-violet-300">Start here</p>
            <h3 id="flagship-title" className="mt-2 text-3xl font-bold md:text-4xl">Flagship AI engineering work</h3>
            <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-300">Three different kinds of problems: enterprise orchestration, personal workflow automation and AI application design.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {works.filter(work => ["AERO (Autonomous Engineering & Release Orchestrator)", "Project Athena", "PromptFlow Studio"].includes(work.title)).map(work => (
            <article key={work.title} className="flex flex-col rounded-2xl border border-violet-300/40 bg-violet-50/70 p-6 dark:border-violet-500/30 dark:bg-violet-500/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-300">{work.status}</p>
              <h4 className="mt-3 text-xl font-bold">{work.title}</h4>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{work.problem}</p>
              <Link href={`/projects/${flagshipSlugs[work.title]}`} className="mt-6 self-start rounded-full border border-violet-500 px-4 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-500/20">Read case study</Link>
            </article>
          ))}
        </div>
      </div>
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
          <h3 className="mt-8 text-3xl font-bold break-words">{work.title}</h3><p className="mt-3 flex-1 leading-relaxed text-zinc-600 dark:text-zinc-300">{work.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">{work.stack.map(s=><span key={s} className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-white/10 dark:text-zinc-200">{s}</span>)}</div>
          <button type="button" onClick={() => setSelected(work)} className="mt-5 self-start text-sm font-semibold text-violet-600 underline underline-offset-4 hover:text-violet-800 dark:text-violet-300">Explore project <span aria-hidden="true">↗</span></button>
          <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-5 dark:border-white/10"><span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{work.status}</span>
            <div className="flex gap-3">{work.repo && <a href={work.repo} target="_blank" rel="noopener noreferrer" aria-label={`View ${work.title} source`}><Github size={19}/></a>}{work.demo && <a href={work.demo} target="_blank" rel="noopener noreferrer" aria-label={`View ${work.title} demo`} className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 dark:text-violet-300">Demo <ArrowUpRight size={16}/></a>}</div>
          </div>
        </article>)}
      </div>
      {selected && <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setSelected(null); }}>
        <section id="project-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="project-detail-title" className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-7 text-zinc-900 shadow-2xl dark:bg-[#15182c] dark:text-white md:p-10">
          <button ref={closeButtonRef} type="button" aria-label="Close project details" onClick={() => setSelected(null)} className="absolute right-5 top-5 rounded-full border border-zinc-300 p-2 dark:border-white/20"><X size={20}/></button>
          <p className="mb-3 pr-10 text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">{selected.category} · {selected.status}</p>
          <h3 id="project-detail-title" className="pr-8 text-3xl font-bold leading-tight break-words">{selected.title}</h3>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300">{selected.description}</p>
          <h4 className="mt-7 text-lg font-bold">The problem</h4><p className="mt-2 text-zinc-600 dark:text-zinc-300">{selected.problem}</p>
          <h4 className="mt-6 text-lg font-bold">Engineering approach</h4><p className="mt-2 text-zinc-600 dark:text-zinc-300">{selected.approach}</p>
          <h4 className="mt-6 text-lg font-bold">Technology</h4>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">{selected.stack.join(" · ")}</p>
          <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">Project stage: {selected.status}. Outcomes and performance figures are not claimed without supporting evidence.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {selected.repo && <a className="rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white" href={selected.repo} target="_blank" rel="noopener noreferrer">Source code ↗</a>}
            {selected.demo && <a className="rounded-full border border-violet-500 px-5 py-3 text-sm font-semibold text-violet-700 dark:text-violet-300" href={selected.demo} target="_blank" rel="noopener noreferrer">View demo ↗</a>}
            <button type="button" onClick={() => setSelected(null)} className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold dark:border-white/30">Back to projects</button>
          </div>
        </section>
      </div>}
      {filtered.length===0 && <p className="rounded-2xl border border-dashed border-zinc-400 p-10 text-center">No matching projects. Try another search or category.</p>}
    </div>
  </section>;
}
