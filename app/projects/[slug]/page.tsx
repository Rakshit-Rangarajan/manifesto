import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import DownloadEngineeringBrief from "@/components/download-engineering-brief";
import "./project-detail.css";

const caseStudies = {
  aero: {
    title: "AERO",
    expansion: "Autonomous Engineering & Release Orchestrator",
    stage: "Engineering platform",
    summary: "Exploring how AI-assisted planning and orchestration can reduce the manual work involved in enterprise engineering.",
    problem: "Requirements, incident context, estimation and release planning are often fragmented across tools and teams.",
    strategy: ["Bring complex engineering requests into a structured analysis workflow.", "Use orchestration to coordinate specialised analysis while keeping human review at critical checkpoints.", "Treat testability, auditability and operational constraints as first-class requirements."],
    architecture: ["Engineering input", "Structured analysis", "Specialised orchestration", "Human validation", "Release plan"],
    technology: ["Python", "AI agents", "Enterprise workflow design"],
    caveat: "Built around enterprise engineering workflows, human checkpoints and practical integration.",
    source: "https://github.com/Rakshit-Rangarajan/AERO-BM",
  },
  pantheon: {title:"Pantheon",expansion:"A collaborative ecosystem of specialized AI agents",stage:"Evolving platform",summary:"A local-first AI ecosystem bringing specialist assistants, shared knowledge and collaborative reasoning into one coordinated experience.",problem:"Isolated assistants fragment knowledge, require repeated context and struggle to coordinate complex tasks.",strategy:["Give each agent a clear responsibility and private knowledge store.","Use a shared retrieval layer to exchange useful context.","Route tasks to appropriate agents while preserving human control."],architecture:["User intent","Agent selection","Shared knowledge","Specialist execution","Review and memory"],technology:["Multi-agent orchestration","RAG","MongoDB","Vector retrieval","Local models"],caveat:"Designed for practical workflows, clear interactions and continued evolution."},
  neuralforge: {title:"NeuralForge",expansion:"A free, immersive engineering mentorship platform",stage:"In development",summary:"A structured learning environment with progressive lessons, coding submissions, quizzes and a planned explorable anime-inspired campus.",problem:"Aspiring engineers need practical feedback and a clear progression from first principles to shipping software.",strategy:["Organize learning into unlockable levels and daily exercises.","Combine quizzes, repository work and automated grading.","Design an immersive campus with an accessible 2D fallback."],architecture:["Learning portal","Lesson and quiz","Code submission","Automated feedback","Progress unlock"],technology:["Angular","ASP.NET Core","PostgreSQL","Redis","RAG","Playwright"],caveat:"Designed for practical workflows, clear interactions and continued evolution.",source:"https://github.com/Rakshit-Rangarajan/NeuralForge"},
  mnemosyne: {title:"Mnemosyne",expansion:"A personal knowledge and source-ingestion system",stage:"Knowledge platform",summary:"A searchable private library for links, documents and knowledge with source-grounded retrieval ambitions.",problem:"Saved links and research notes quickly become fragmented and difficult to retrieve reliably.",strategy:["Capture and categorize incoming sources.","Extract and index content with ingestion state tracking.","Ground retrieval and answers in recorded sources."],architecture:["Source intake","Extraction queue","Knowledge storage","Search and retrieval","Source-backed response"],technology:["SQLite","Vector search","RAG","Podman"],caveat:"Designed for practical workflows, clear interactions and continued evolution.",source:"https://github.com/Rakshit-Rangarajan/Mnemosyne"},
  ouroboros: {title:"OUROBOROS",expansion:"A deliberately self-evolving software experiment",stage:"Experimental platform",summary:"A project that explores frequent, small, reversible software evolution without a fixed product roadmap.",problem:"Conventional roadmaps can limit experimentation and creative exploration.",strategy:["Generate distinct ideas on a schedule.","Implement changes in isolated increments.","Review stability and preserve reversibility."],architecture:["Idea discovery","Implementation","Testing","Staging","Stability audit"],technology:["Automation","Git","CI","Web app"],caveat:"Designed for practical workflows, clear interactions and continued evolution.",source:"https://github.com/Rakshit-Rangarajan/Ouroboros"},
  "the-office": {title:"The Office",expansion:"An ecosystem for enterprise innovation",stage:"Innovation portfolio",summary:"A growing collection of ideas and interactive experiences spanning process improvement, human-approved automation, learning, quality and engineering delivery—including AERO.",problem:"Enterprise innovation ideas need understandable, demonstrable workflows before broad adoption.",strategy:["Translate initiatives into interactive scenarios.","Make approval and ownership stages visible.","Demonstrate learning and progress feedback."],architecture:["Discover opportunities","Choose a specialist initiative","Coordinate workflows","Human decisions","Learn and improve"],technology:["Prototyping","Workflow design","Web UI"],caveat:"Designed for practical workflows, clear interactions and continued evolution.",source:"https://github.com/Rakshit-Rangarajan/The-Office"},
  "say-cymraeg": {title:"Say Cymraeg",expansion:"Interactive Welsh language learning",stage:"Learning experience",summary:"A gamified learning experience that combines language exercises and AI-assisted interactions.",problem:"Language learners benefit from accessible, interactive practice.",strategy:["Offer short lessons and exercises.","Provide feedback through engaging interactions.","Explore AI-assisted learning where appropriate."],architecture:["Learner","Lesson","Exercise","Feedback","Progress"],technology:["Web application","AI","Education"],caveat:"Designed for practical workflows, clear interactions and continued evolution.",source:"https://github.com/Rakshit-Rangarajan/SayCymraeg"},
  athena: {
    title: "Project Athena",
    expansion: "A local-first commitment assistant",
    stage: "Working build",
    summary: "An assistant concept focused on commitments, reminders and follow-through across daily work.",
    problem: "Important actions can be lost between meetings, messages and individual task trackers.",
    strategy: ["Collect actionable commitments into one workflow.", "Keep reminders and task state locally oriented.", "Design around visibility, correction and user control."],
    architecture: ["User-approved inputs", "Commitment extraction", "Local task store", "Reminder workflow", "User action"],
    technology: ["Python", "SQLite", "Podman"],
    caveat: "Designed to bring commitments, reminders and everyday work into a more cohesive experience.",
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
  return <main className="evo-detail-page" style={{backgroundImage:`url(/images/projects/${slug}.webp),url(/evo/chapters/projects.webp)`}}>
    <div className="evo-detail-shell">
      <nav className="evo-detail-nav"><img src="/images/rr-emblem-logo-dark.png" alt="RR dragon emblem" width={48} height={48} className="evo-detail-logo"/><span>RAKSHIT RANGARAJAN / ENGINEERING PORTFOLIO</span><Link className="evo-detail-back" href="/#projects"><ArrowLeft size={17}/> Back to projects</Link></nav>
      <div className="evo-detail-breadcrumb">Projects <span>/</span> {study.title}</div>
      <header className={`evo-detail-banner ${slug==="the-office"||slug==="say-cymraeg"?"evo-detail-banner-full":""}`} style={{backgroundImage:`linear-gradient(90deg,rgba(8,5,17,.35),rgba(8,5,17,.04)),url(/images/projects/${slug}.webp)`}}><span className="evo-detail-banner-label">ENGINEERING CASE STUDY</span></header>
      <div className="evo-detail-grid">
        <div className="evo-detail-main">
          <section className="evo-detail-intro">
            <p className="evo-detail-kicker">DESIGNED · ARCHITECTED · ENGINEERED</p>
            <h1>{study.title}</h1><h2>{study.expansion}</h2>
            <p>{study.summary}</p>
            <div className="evo-detail-actions">
              {"demo" in study && <a href={study.demo} target="_blank" rel="noopener noreferrer">View live demo <ArrowUpRight size={16}/></a>}
              {"source" in study && <a href={study.source} target="_blank" rel="noopener noreferrer">View repository <ArrowUpRight size={16}/></a>}
              <DownloadEngineeringBrief brief={study} slug={slug}/>
            </div>
            <div className="evo-detail-tags">{study.technology.map(t=><span key={t}>{t}</span>)}</div>
          </section>
          <section className="evo-detail-panel"><p className="evo-detail-kicker">01 / THE CHALLENGE</p><h2>The problem worth solving</h2><p>{study.problem}</p></section>
          <section className="evo-detail-panel"><p className="evo-detail-kicker">02 / ENGINEERING APPROACH</p><h2>How I designed the solution</h2><div className="evo-detail-strategy">{study.strategy.map((step,i)=><div key={step}><b>{String(i+1).padStart(2,"0")}</b><p>{step}</p></div>)}</div></section>
          <section className="evo-detail-panel"><p className="evo-detail-kicker">03 / SYSTEM DESIGN</p><h2>From intent to execution</h2><p className="evo-detail-note">A high-level view of how the experience is designed to work.</p><ol className="evo-detail-workflow" aria-label={`${study.title} high-level architecture diagram`}>{study.architecture.map((step,i)=><li key={step}><span>{String(i+1).padStart(2,"0")}</span><strong>{step}</strong></li>)}</ol><p className="evo-detail-note">Illustrative product journey, showing the major building blocks without exposing private implementation details.</p></section>
          <section className="evo-detail-panel"><p className="evo-detail-kicker">04 / PRODUCT VALUE</p><h2>Built for real-world impact</h2><p>{study.caveat}</p><p className="evo-detail-note">Across the wider portfolio, selected applications are used by approximately 50–100 people in overseas organizations, according to the creator. Client identities remain confidential; this is not a per-project usage figure.</p></section>{slug === "the-office" && <section className="evo-detail-panel"><p className="evo-detail-kicker">05 / THE OFFICE ECOSYSTEM</p><h2>Ideas that work together</h2><div className="evo-detail-strategy">{[{name:"AERO",role:"Engineering and release orchestration"},{name:"RECLAIM",role:"Find opportunities to reclaim time"},{name:"DOMINO",role:"Coordinate approval-driven processes"},{name:"SPARK",role:"Grow practical skills and innovation"},{name:"ATLAS · COMPASS · FORESIGHT",role:"Explore strategy, direction and planning"},{name:"PRISM · SENTINEL · TRACE · VERIFY",role:"Explore quality, oversight and traceability"},{name:"FORGE · RESOLVE · ECHO",role:"Explore building, problem-solving and communication"}].map((item,i)=><div key={item.name}><b>{String(i+1).padStart(2,"0")}</b><p><strong>{item.name}</strong> — {item.role}</p></div>)}</div><p className="evo-detail-note">A high-level portfolio of initiatives and concepts; not every idea is a deployed integration.</p></section>}{slug === "pantheon" && <section className="evo-detail-panel"><p className="evo-detail-kicker">05 / THE PANTHEON</p><h2>Meet the agents</h2><div className="evo-detail-strategy">{[{name:"Athena",role:"Your proactive work and desktop assistant"},{name:"Mnemosyne",role:"Knowledge capture, memory and retrieval"},{name:"Hermes",role:"Software building and automation"},{name:"Morpheus",role:"Specialized AI experimentation and evolving workflows"},{name:"Zeus",role:"Proposed orchestration role; definition evolving"},{name:"Hephaestus",role:"Proposed engineering specialist; definition evolving"}].map((agent,i)=><div key={agent.name}><b>{String(i+1).padStart(2,"0")}</b><p><strong>{agent.name}</strong> — {agent.role}</p></div>)}</div><p className="evo-detail-note">The Pantheon is an expanding ecosystem. Zeus and Hephaestus are early concepts in the repository, while other agents have evolving implementations.</p></section>}
        </div>
        <aside className="evo-detail-aside">
          <section className="evo-detail-panel"><h3>Project information</h3><dl><div><dt>Status</dt><dd>{study.stage}</dd></div><div><dt>Project</dt><dd>{study.title}</dd></div><div><dt>Type</dt><dd>Engineering / AI</dd></div><div><dt>Documentation</dt><dd>Case study</dd></div></dl></section>
          <section className="evo-detail-panel"><h3>Key highlights</h3><ul>{study.strategy.map(x=><li key={x}>{x}</li>)}</ul></section>
          <section className="evo-detail-panel"><h3>Technology stack</h3><div className="evo-detail-tags">{study.technology.map(t=><span key={t}>{t}</span>)}</div></section>
          <Link className="evo-detail-contact" href="/#contact">Discuss a similar challenge <ArrowUpRight size={16}/></Link>
        </aside>
      </div>
    </div>
  </main>;
}
