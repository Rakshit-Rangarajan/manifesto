import { ArrowRight, BrainCircuit, DatabaseZap, Workflow, Bot } from "lucide-react";

const disciplines = [
  {
    title: "Retrieval-augmented generation",
    problem: "People waste time searching fragmented documents and repeating the same questions.",
    approach: "Ground responses in relevant, retrievable knowledge, with clear source context and privacy boundaries.",
    icon: DatabaseZap,
  },
  {
    title: "Agent orchestration",
    problem: "Complex tasks require planning, tool coordination and review across multiple steps.",
    approach: "Design agent workflows with explicit roles, tool permissions, checkpoints and observable outcomes.",
    icon: Bot,
  },
  {
    title: "Practical automation",
    problem: "Manual handoffs and repetitive tasks consume valuable engineering time.",
    approach: "Start with measurable friction, automate the repeatable path and preserve human judgment where needed.",
    icon: Workflow,
  },
  {
    title: "AI solutions architecture",
    problem: "A flashy demo is not the same as a secure, sustainable application.",
    approach: "Balance real utility, maintainability, cost, security, testing and operational constraints.",
    icon: BrainCircuit,
  },
];

export default function AIExpertise() {
  return (
    <section id="ai-expertise" aria-labelledby="ai-expertise-title" className="w-full px-5 py-20 md:px-12 lg:px-20 text-zinc-900 dark:text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[.25em] text-violet-600 dark:text-violet-300">How I approach AI engineering</p>
        <h2 id="ai-expertise-title" className="mt-3 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">The problem decides the technology.</h2>
        <p className="mt-5 max-w-3xl text-lg text-zinc-600 dark:text-zinc-300">My focus is on solutions that genuinely reduce friction. These are areas I work on and explore—not a claim that every pattern below has shipped to production.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {disciplines.map((item) => <article key={item.title} className="rounded-3xl border border-zinc-200 bg-white/70 p-7 dark:border-white/10 dark:bg-white/5">
            <item.icon aria-hidden="true" className="h-7 w-7 text-violet-600 dark:text-violet-300"/>
            <h3 className="mt-5 text-2xl font-bold">{item.title}</h3>
            <h4 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">The problem</h4>
            <p className="mt-2 leading-relaxed text-zinc-700 dark:text-zinc-300">{item.problem}</p>
            <h4 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">My approach</h4>
            <p className="mt-2 leading-relaxed text-zinc-700 dark:text-zinc-300">{item.approach}</p>
          </article>)}
        </div>
        <a href="#projects" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 underline underline-offset-4 dark:text-violet-300">Explore related projects <ArrowRight size={16} aria-hidden="true"/></a>
      </div>
    </section>
  );
}
