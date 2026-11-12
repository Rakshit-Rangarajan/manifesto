"use client";
import { motion } from "framer-motion";
import { BrainCircuit, Network, Database, ShieldCheck } from "lucide-react";

const pillars = [
  { title: "Agentic systems", icon: Network, detail: "Multi-agent orchestration, tool use, LangGraph and human-in-the-loop workflows." },
  { title: "LLM & RAG architecture", icon: BrainCircuit, detail: "Grounded generation, embeddings, vector retrieval and model strategy." },
  { title: "Knowledge & memory", icon: Database, detail: "PostgreSQL/pgvector, MongoDB, Redis and durable agent memory." },
  { title: "Enterprise delivery", icon: ShieldCheck, detail: "Secure integrations, evaluation, observability and reliable deployment." },
];

export default function Skills() {
 return <section id="skills" className="relative z-20 w-full py-14 md:py-20 px-6 md:px-20 border-t border-black/5 dark:border-white/5">
  <div className="max-w-6xl mx-auto">
   <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
    <p className="text-primary uppercase tracking-widest text-xs mb-3">Selected capabilities</p>
    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">The architecture arsenal.</h2>
    <p className="mt-4 text-base md:text-lg text-zinc-600 dark:text-slate-400 max-w-2xl">I build systems around models, data, tools and people—not a wall of technology badges.</p>
   </motion.div>
   <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
    {pillars.map(({title,icon:Icon,detail})=><article key={title} className="p-5 rounded-xl border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/5">
     <Icon className="w-6 h-6 text-primary mb-3"/><h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h3><p className="mt-2 text-sm text-zinc-600 dark:text-slate-400 leading-relaxed">{detail}</p>
    </article>)}
   </div>
   <p className="mt-6 text-xs text-zinc-500 dark:text-slate-400">Engineering foundation: Python · C# / .NET · APIs · Angular · Podman / CI/CD</p>
  </div>
 </section>;
}
