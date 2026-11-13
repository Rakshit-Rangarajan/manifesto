"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Database, GitBranch, ShieldCheck, Workflow, Layers3 } from "lucide-react";

const capabilities = [
  { title: "Agent orchestration", icon: BrainCircuit, detail: "Designing multi-agent systems with explicit responsibilities, shared context and human review.", tags: ["LangGraph", "CrewAI", "Tool calling"] },
  { title: "Knowledge architecture", icon: Database, detail: "Retrieval pipelines that connect private knowledge, semantic search and structured records.", tags: ["RAG", "Vector search", "PostgreSQL"] },
  { title: "Autonomous workflows", icon: Workflow, detail: "Engineering repeatable processes with checkpoints, approvals and observable outcomes.", tags: ["Automation", "Background jobs", "Podman"] },
  { title: "System integration", icon: GitBranch, detail: "Connecting applications, services and agents through maintainable contracts.", tags: ["APIs", "ASP.NET Core", "Python"] },
  { title: "Local-first infrastructure", icon: Layers3, detail: "Building useful AI experiences with privacy-conscious, self-hostable deployment paths.", tags: ["Ollama", "Containers", "SQLite"] },
  { title: "Responsible delivery", icon: ShieldCheck, detail: "Keeping engineers in control with traceability, validation and practical failure handling.", tags: ["Human-in-the-loop", "Observability", "Testing"] },
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative z-20 w-full bg-transparent px-5 py-24 text-zinc-900 dark:text-white md:px-12 md:py-36 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55 }} className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.3em] text-violet-600 dark:text-violet-300">Engineering capabilities</p>
          <h2 id="skills-title" className="text-5xl font-bold tracking-tight md:text-7xl">The systems <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">behind the magic.</span></h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">I design AI systems from the architecture outward: orchestration, knowledge, infrastructure and the safeguards that make automation useful.</p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((item, index) => (
            <motion.article key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .4, delay: Math.min(index * .06, .3) }} className="group relative overflow-hidden rounded-3xl border border-violet-400/25 bg-white/55 p-7 shadow-sm backdrop-blur-md transition-colors hover:border-violet-500/60 dark:bg-slate-950/45">
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl transition-opacity group-hover:opacity-100" aria-hidden="true" />
              <item.icon aria-hidden="true" className="mb-6 h-8 w-8 text-violet-600 dark:text-violet-300" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 min-h-20 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{item.detail}</p>
              <div className="mt-6 flex flex-wrap gap-2">{item.tags.map(tag => <span key={tag} className="rounded-full border border-violet-400/25 bg-violet-500/5 px-3 py-1 text-xs text-zinc-700 dark:text-zinc-200">{tag}</span>)}</div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
