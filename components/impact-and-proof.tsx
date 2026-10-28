import Link from "next/link";
import { BarChart3, ShieldCheck, BookOpen } from "lucide-react";
const projects = [
  { name: "AERO", status: "Active development", question: "Can AI orchestration reduce engineering analysis effort?", proof: "Measure time per engineering task, output correctness and review effort against a baseline.", slug: "aero" },
  { name: "Project Athena", status: "Working build", question: "Can an assistant reduce missed commitments?", proof: "Measure commitment detection, missed follow-ups and reminder reliability in controlled trials.", slug: "athena" },
  { name: "PromptFlow Studio", status: "Demo listed", question: "Does visual composition make AI workflows easier to understand?", proof: "Run repeatable usability tasks and compare completion time and errors.", slug: "promptflow-studio" },
];
export default function ImpactAndProof() {
 return <section id="impact" aria-labelledby="impact-heading" className="w-full px-5 py-20 md:px-12 lg:px-20 text-zinc-900 dark:text-white"><div className="mx-auto max-w-7xl">
 <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">Impact & evidence</p>
 <h2 id="impact-heading" className="mt-3 text-4xl font-bold md:text-6xl">Measure results. Don't invent them.</h2>
 <p className="mt-5 max-w-3xl text-zinc-600 dark:text-zinc-300">The focus is measurable value, not unverified percentage claims. Below are testable hypotheses, not published results.</p>
 <div className="mt-10 grid gap-5 md:grid-cols-3">{projects.map(p=><article key={p.slug} className="flex flex-col rounded-3xl border border-zinc-200 p-6 dark:border-white/10 dark:bg-white/5"><BarChart3 className="text-violet-600 dark:text-violet-300"/><p className="mt-3 text-xs uppercase tracking-wide text-zinc-500">{p.status}</p><h3 className="mt-3 text-2xl font-bold">{p.name}</h3><p className="mt-4 font-medium">{p.question}</p><p className="mt-3 flex-1 text-sm text-zinc-600 dark:text-zinc-300">{p.proof}</p><Link className="mt-5 text-sm font-semibold text-violet-700 underline dark:text-violet-300" href={`/projects/${p.slug}`}>Read project brief</Link></article>)}</div>
 <div className="mt-10 grid gap-5 md:grid-cols-2"><div className="rounded-2xl border border-zinc-200 p-6 dark:border-white/10"><ShieldCheck className="text-violet-500"/><h3 className="mt-4 text-xl font-bold">Evidence and recommendations</h3><p className="mt-2 text-zinc-600 dark:text-zinc-300">Outcome numbers and testimonials will be published only after source verification and permission. No invented endorsements.</p></div><div className="rounded-2xl border border-zinc-200 p-6 dark:border-white/10"><BookOpen className="text-violet-500"/><h3 className="mt-4 text-xl font-bold">Research and technical writing</h3><p className="mt-2 text-zinc-600 dark:text-zinc-300">Engineering notes and published research are available in the blog.</p><Link href="/blogs" className="mt-4 inline-block text-sm font-semibold text-violet-700 underline dark:text-violet-300">Explore the blog</Link></div></div>
 </div></section>;
}
