"use client";
import { motion } from "framer-motion";
import { ArrowRight, Workflow, Layers3, Database } from "lucide-react";
const capabilities = [
 {title:"Design",icon:Layers3,description:"Translate ambiguous business needs into AI architectures, model strategies and integration boundaries."},
 {title:"Orchestrate",icon:Workflow,description:"Build multi-agent workflows with tools, human oversight, state and failure handling."},
 {title:"Ground",icon:Database,description:"Connect models to enterprise knowledge using RAG, vector retrieval and persistent memory."}
];
export default function AITools(){
 return <section id="ai-tools" className="relative z-20 w-full py-28 px-6 md:px-20 border-t border-black/5 dark:border-white/5">
  <div className="max-w-6xl mx-auto">
   <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
    <p className="text-primary uppercase tracking-widest text-sm mb-4">From concept to deployment</p>
    <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white">Systems, not software lists.</h2>
    <p className="mt-6 text-xl text-zinc-600 dark:text-slate-400 max-w-3xl">The value is not in how many AI tools I can name. It is in how I connect models, data and workflows into systems people can actually use.</p>
   </motion.div>
   <div className="grid md:grid-cols-3 gap-5 mt-14">{capabilities.map(({title,icon:Icon,description})=><article key={title} className="p-7 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/5"><Icon className="w-7 h-7 text-primary mb-5"/><h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">{title}</h3><p className="mt-3 text-zinc-600 dark:text-slate-400">{description}</p></article>)}</div>
   <p className="mt-10 flex items-center gap-2 text-sm text-zinc-500 dark:text-slate-400">Explore the projects for implementation details <ArrowRight className="w-4 h-4"/></p>
  </div>
 </section>;
}
