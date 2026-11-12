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
  pantheon: {title:"Pantheon",expansion:"A collaborative ecosystem of specialized AI agents",stage:"In development",summary:"An ambitious local-first architecture that brings Athena, Mnemosyne, Hermes and Morpheus together with shared and agent-specific knowledge.",problem:"Isolated assistants fragment knowledge, require repeated context and struggle to coordinate complex tasks.",strategy:["Give each agent a clear responsibility and private knowledge store.","Use a shared retrieval layer to exchange useful context.","Route tasks to appropriate agents while preserving human control."],architecture:["User intent","Agent selection","Shared knowledge","Specialist execution","Review and memory"],technology:["Multi-agent orchestration","RAG","MongoDB","Vector retrieval","Local models"],caveat:"Architecture and intended capabilities are in development; production performance has not been independently validated."},
  neuralforge: {title:"NeuralForge",expansion:"A free, immersive engineering mentorship platform",stage:"In development",summary:"A structured learning environment with progressive lessons, coding submissions, quizzes and a planned explorable anime-inspired campus.",problem:"Aspiring engineers need practical feedback and a clear progression from first principles to shipping software.",strategy:["Organize learning into unlockable levels and daily exercises.","Combine quizzes, repository work and automated grading.","Design an immersive campus with an accessible 2D fallback."],architecture:["Learning portal","Lesson and quiz","Code submission","Automated feedback","Progress unlock"],technology:["Angular","ASP.NET Core","PostgreSQL","Redis","RAG","Playwright"],caveat:"Campus visuals and learning outcomes are development goals, not verified live features.",source:"https://github.com/Rakshit-Rangarajan/NeuralForge"},
  mnemosyne: {title:"Mnemosyne",expansion:"A personal knowledge and source-ingestion system",stage:"Iterative development",summary:"A searchable private library for links, documents and knowledge with source-grounded retrieval ambitions.",problem:"Saved links and research notes quickly become fragmented and difficult to retrieve reliably.",strategy:["Capture and categorize incoming sources.","Extract and index content with ingestion state tracking.","Ground retrieval and answers in recorded sources."],architecture:["Source intake","Extraction queue","Knowledge storage","Search and retrieval","Source-backed response"],technology:["SQLite","Vector search","RAG","Podman"],caveat:"Implemented features vary by branch and deployment; AI enhancements require validation.",source:"https://github.com/Rakshit-Rangarajan/Mnemosyne"},
  ouroboros: {title:"OUROBOROS",expansion:"A deliberately self-evolving software experiment",stage:"Active experiment",summary:"A project that explores frequent, small, reversible software evolution without a fixed product roadmap.",problem:"Conventional roadmaps can limit experimentation and creative exploration.",strategy:["Generate distinct ideas on a schedule.","Implement changes in isolated increments.","Review stability and preserve reversibility."],architecture:["Idea discovery","Implementation","Testing","Staging","Stability audit"],technology:["Automation","Git","CI","Web app"],caveat:"Scheduled work and proposed releases do not guarantee successful deployments or feature completion.",source:"https://github.com/Rakshit-Rangarajan/Ouroboros"},
  "the-office": {title:"The Office",expansion:"RECLAIM · DOMINO · SPARK",stage:"Concept demos",summary:"Three experimental tools demonstrating opportunity intake, approval flows and structured learning initiatives.",problem:"Enterprise innovation ideas need understandable, demonstrable workflows before broad adoption.",strategy:["Translate initiatives into interactive scenarios.","Make approval and ownership stages visible.","Demonstrate learning and progress feedback."],architecture:["Opportunity","Workflow simulation","Human decision","Progress view","Review"],technology:["Prototyping","Workflow design","Web UI"],caveat:"These are demonstrators, not verified live enterprise integrations.",source:"https://github.com/Rakshit-Rangarajan/The-Office"},
  "say-cymraeg": {title:"Say Cymraeg",expansion:"Interactive Welsh language learning",stage:"Project demo",summary:"A gamified learning experience that combines language exercises and AI-assisted interactions.",problem:"Language learners benefit from accessible, interactive practice.",strategy:["Offer short lessons and exercises.","Provide feedback through engaging interactions.","Explore AI-assisted learning where appropriate."],architecture:["Learner","Lesson","Exercise","Feedback","Progress"],technology:["Web application","AI","Education"],caveat:"Live availability and learning impact have not been independently verified.",source:"https://github.com/Rakshit-Rangarajan/SayCymraeg"},
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
  return <main className="min-h-screen bg-[#0c0916] px-5 py-16 text-[#fff0f5] md:px-12 md:px-12">
    <div className="mx-auto max-w-5xl">
      <Link href="/#projects" className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 px-4 py-2 text-sm font-semibold "><ArrowLeft size={16}/> Back to portfolio</Link>
      <p className="mt-14 text-xs font-bold uppercase tracking-[.25em] text-rose-400">Engineering case study · {study.stage}</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-7xl">{study.title}</h1>
      <p className="mt-3 text-xl text-[#dbc5d1]">{study.expansion}</p>
      <p className="mt-8 max-w-3xl text-lg leading-relaxed">{study.summary}</p>
      <section className="mt-16 grid gap-8 border-t border-zinc-300 pt-10 dark:border-white/20 md:grid-cols-2">
        <div><h2 className="text-2xl font-bold">The problem</h2><p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-300">{study.problem}</p></div>
        <div><h2 className="text-2xl font-bold">Design approach</h2><ol className="mt-4 space-y-3">{study.strategy.map((step,i)=><li key={step} className="leading-relaxed text-zinc-600 dark:text-zinc-300"><span className="mr-2 font-bold text-rose-400">{String(i+1).padStart(2,"0")}.</span>{step}</li>)}</ol></div>
      </section>
      <section className="mt-14"><h2 className="text-2xl font-bold">Conceptual workflow</h2><p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">An explanatory architecture outline, not an independently verified implementation diagram.</p>
        <ol className="mt-6 grid gap-3 md:grid-cols-5">{study.architecture.map((step,i)=><li key={step} className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-4 "><span className="text-xs font-bold text-violet-700 dark:text-violet-300">{String(i+1).padStart(2,"0")}</span><p className="mt-3 text-sm font-semibold">{step}</p></li>)}</ol>
      </section>
      <section className="mt-14"><h2 className="text-2xl font-bold">Technology and verification</h2><div className="mt-4 flex flex-wrap gap-2">{study.technology.map(t=><span key={t} className="rounded-full border border-zinc-300 px-4 py-2 text-sm dark:border-white/20">{t}</span>)}</div><p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{study.caveat}</p></section>
      <p className="mt-10 text-sm text-rose-200/70">Evidence policy: performance figures are published only after verification. This project brief explains engineering decisions, not measured outcomes.</p>
      <div className="mt-12 flex flex-wrap gap-4">
        <DownloadEngineeringBrief brief={study} slug={slug} />
        {"source" in study && <a href={study.source} rel="noopener noreferrer" target="_blank" className="inline-flex items-center gap-2 rounded-full bg-rose-700 px-6 py-3 font-semibold text-white">View repository <ArrowUpRight size={16}/></a>}
        {"demo" in study && <a href={study.demo} rel="noopener noreferrer" target="_blank" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-semibold text-white">Visit demo <ArrowUpRight size={16}/></a>}
        <Link href="/#contact" className="rounded-full border border-zinc-300 px-6 py-3 font-semibold dark:border-white/20">Discuss a similar problem</Link>
      </div>
    </div>
  </main>;
}
