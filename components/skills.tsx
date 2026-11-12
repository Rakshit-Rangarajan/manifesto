"use client";
import { motion } from "framer-motion";
import { BrainCircuit, Network, Database, ShieldCheck, Server } from "lucide-react";

const pillars = [
 { title: "Agentic AI & Orchestration", icon: Network, detail: "Multi-agent systems, tool calling, autonomous workflows, LangGraph, LangChain and CrewAI." },
 { title: "LLM & RAG Architecture", icon: BrainCircuit, detail: "Retrieval-augmented generation, embeddings, vector search, model selection and local inference with Ollama." },
 { title: "Data & Memory Systems", icon: Database, detail: "PostgreSQL/pgvector, MongoDB, Redis and persistent knowledge architectures." },
 { title: "Enterprise AI Engineering", icon: ShieldCheck, detail: "Evaluation, observability, human-in-the-loop design, reliability and secure integrations." },
 { title: "Production Delivery", icon: Server, detail: "Python, C# / ASP.NET Core, APIs, Podman, CI/CD and deployment architecture." },
];

export default function Skills() {
 return <section id="skills" className="relative z-20 w-full py-28 px-6 md:px-20 border-t border-black/5 dark:border-white/5">
  <div className="max-w-6xl mx-auto">
   <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
    <p className="text-primary uppercase tracking-widest text-sm mb-4">Architecture over tool collecting</p>
    <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white">What I architect.</h2>
    <p className="mt-6 text-xl text-zinc-600 dark:text-slate-400 max-w-3xl">I design AI systems that solve operational problems—from retrieval and reasoning to orchestration, memory, integrations and reliable delivery.</p>
   </motion.div>
   <div className="grid md:grid-cols-2 gap-5 mt-14">
    {pillars.map(({title,icon:Icon,detail})=><div key={title} className="p-7 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/5">
     <Icon className="w-7 h-7 text-primary mb-5"/><h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{title}</h3><p className="mt-3 text-zinc-600 dark:text-slate-400 leading-relaxed">{detail}</p>
    </div>)}
   </div>
   <p className="mt-10 text-sm text-zinc-500 dark:text-slate-400">Engineering foundation: .NET / C#, Python, Angular and full-stack application development.</p>
  </div>
 </section>;
}
