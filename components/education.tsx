"use client";
import { motion } from "framer-motion";
const milestones=[
 {date:"2024 — 2025",degree:"MSc · Artificial Intelligence",school:"Cardiff University",note:"First Class"},
 {date:"2018 — 2022",degree:"BE · Information Science",school:"Rajeev Institute of Technology · VTU",note:""}
];
export default function Education(){
 return <section id="education" className="relative z-20 py-28 px-6 md:px-20 border-t border-black/5 dark:border-white/5">
 <div className="max-w-5xl mx-auto"><p className="uppercase tracking-[.3em] text-primary text-xs mb-5">Academic trajectory</p>
 <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-16">The origins.</h2>
 <ol className="relative border-l border-primary/30 ml-3 md:ml-6">
 {milestones.map((item,i)=><motion.li key={item.degree} initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.45,delay:i*.1}} className="relative pl-9 md:pl-14 pb-16 last:pb-0">
 <span className="absolute -left-[7px] top-2 h-3 w-3 rotate-45 bg-primary"/>
 <span className="text-xs uppercase tracking-[.2em] text-primary">{item.date}</span>
 <h3 className="mt-3 text-2xl md:text-4xl font-semibold text-zinc-900 dark:text-white">{item.degree}</h3>
 <p className="mt-2 text-lg text-zinc-600 dark:text-slate-300">{item.school}</p>
 {item.note&&<span className="inline-block mt-4 text-xs uppercase tracking-widest text-primary">{item.note}</span>}
 </motion.li>)}</ol></div></section>;
}