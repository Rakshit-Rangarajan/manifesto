import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import DownloadEngineeringBrief from "@/components/download-engineering-brief";

const caseStudies = {
  aero: {
    title: "AERO",
    expansion: "Autonomous Engineering & Release Orchestrator",
    stage: "Active development",
    summary: "Exploring how AI-assisted planning and orchestration can reduce the manual work involved in enterprise engineering.",
    problem: "Requirements, incident context, estimation and release planning are often fragmented across tools and teams.",
    strategy: ["Bring complex engineering requests into a structured analysis workflow.", "Use orchestration to coordinate specialised analysis while keeping human review at critical checkpoints.", "Treat testability, auditability and operational constraints as first-class requirements."],
    architecture: ["Engineering input", "Structured analysis", "Specialised orchestration", "Human validation", "Release plan"],
    technology: ["Python", "AI agents", "Enterprise workflow design"],
    caveat: "AERO is under development. Demonstrated concepts should not be confused with completed or validated production capabilities.",
    source: "https://github.com/Rakshit-Rangarajan/AERO-BM",
  },
  athena: {
    title: "Project Athena",
    expansion: "A local-first commitment assistant",
    stage: "Working build",
    summary: "An assistant concept focused on commitments, reminders and follow-through across daily work.",
    problem: "Important actions can be lost between meetings, messages and individual task trackers.",
    strategy: ["Collect actionable commitments into one workflow.", "Keep reminders and task state locally oriented.", "Design around visibility, correction and user control."],
    architecture: ["User-approved inputs", "Commitment extraction", "Local task store", "Reminder workflow", "User action"],
    technology: ["Python", "SQLite", "Podman"],
    caveat: "Integrations, automated extraction quality and cross-application behaviour require verification before production claims.",
    source: "https://github.com/Rakshit-Rangarajan/Project-Athena",
  },
  "promptflow-studio": {
    title: "PromptFlow Studio",
    expansion: "Visual AI workflow exploration",
    stage: "Demo listed",
    summary: "A visual approach to exploring how AI application steps fit together.",
    problem: "When an AI system's components are hidden inside code, it becomes harder to communicate or iterate on the workflow.",
    strategy: ["Represent steps and relationships visually.", "Make flow composition understandable before complex integration.", "Prioritise clear feedback for changes to the workflow."],
    architecture: ["Workflow concept", "Visual composition", "Step relationships", "Iteration", "Review"],
    technology: ["React", "FastAPI", "TypeScript"],
    caveat: "A demo URL is provided, but its availability and end-to-end operation still need browser verification.",
    demo: "https://promptflow.rakshitr.co.in",
  },
} as const;

type Key = keyof typeof caseStudies;
type Params = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return Object.keys(caseStudies).map(slug => ({ slug })); }
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug as Key];
  if (!study) return { title: "Project not found" };
  return {
    title: `${study.title} | Engineering Case Study`,
    description: study.summary,
    alternates: { canonical: `/projects/${slug}` },
  };
}
export default async function ProjectCaseStudy({ params }: Params) {
  const { slug } = await params;
  const study = caseStudies[slug as Key];
  if (!study) notFound();
  return <main className="min-h-screen bg-zinc-50 px-5 py-16 text-zinc-900 dark:bg-[#0c1020] dark:text-white md:px-12">
    <div className="mx-auto max-w-5xl">
      <Link href="/#projects" className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold dark:border-white/20"><ArrowLeft size={16}/> Back to portfolio</Link>
      <p className="mt-14 text-xs font-bold uppercase tracking-[.25em] text-violet-700 dark:text-violet-300">Engineering case study · {study.stage}</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-7xl">{study.title}</h1>
      <p className="mt-3 text-xl text-zinc-600 dark:text-zinc-300">{study.expansion}</p>
      <p className="mt-8 max-w-3xl text-lg leading-relaxed">{study.summary}</p>
      <section className="mt-16 grid gap-8 border-t border-zinc-300 pt-10 dark:border-white/20 md:grid-cols-2">
        <div><h2 className="text-2xl font-bold">The problem</h2><p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-300">{study.problem}</p></div>
        <div><h2 className="text-2xl font-bold">Design approach</h2><ol className="mt-4 space-y-3">{study.strategy.map((step,i)=><li key={step} className="leading-relaxed text-zinc-600 dark:text-zinc-300"><span className="mr-2 font-bold text-violet-600 dark:text-violet-300">{String(i+1).padStart(2,"0")}.</span>{step}</li>)}</ol></div>
      </section>
      <section className="mt-14"><h2 className="text-2xl font-bold">Conceptual workflow</h2><p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">An explanatory architecture outline, not an independently verified implementation diagram.</p>
        <ol className="mt-6 grid gap-3 md:grid-cols-5">{study.architecture.map((step,i)=><li key={step} className="rounded-2xl border border-violet-400/30 bg-violet-100/50 p-4 dark:bg-violet-500/10"><span className="text-xs font-bold text-violet-700 dark:text-violet-300">{String(i+1).padStart(2,"0")}</span><p className="mt-3 text-sm font-semibold">{step}</p></li>)}</ol>
      </section>
      <section className="mt-14"><h2 className="text-2xl font-bold">Technology and verification</h2><div className="mt-4 flex flex-wrap gap-2">{study.technology.map(t=><span key={t} className="rounded-full border border-zinc-300 px-4 py-2 text-sm dark:border-white/20">{t}</span>)}</div><p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{study.caveat}</p></section>
      <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">Evidence policy: performance figures are published only after verification. This project brief explains engineering decisions, not measured outcomes.</p>
      <div className="mt-12 flex flex-wrap gap-4">
        <DownloadEngineeringBrief brief={study} slug={slug} />
        {"source" in study && <a href={study.source} rel="noopener noreferrer" target="_blank" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-semibold text-white">View repository <ArrowUpRight size={16}/></a>}
        {"demo" in study && <a href={study.demo} rel="noopener noreferrer" target="_blank" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-semibold text-white">Visit demo <ArrowUpRight size={16}/></a>}
        <Link href="/#contact" className="rounded-full border border-zinc-300 px-6 py-3 font-semibold dark:border-white/20">Discuss a similar problem</Link>
      </div>
    </div>
  </main>;
}
