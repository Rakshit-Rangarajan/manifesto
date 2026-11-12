"use client";
import { motion } from "framer-motion";
const chapters=[
 {date:"2026 — Present",role:"Software Engineer II",org:"Ansira / BrandMuscle",kind:"Career progression"},
 {date:"2022 — 2024",role:"Software Engineer · Full-Stack",org:"BrandMuscle",kind:"Foundation"}
];
export default function Experience(){
 return <section id="experience" className="relative z-20 py-28 px-6 md:px-20 border-t border-black/5 dark:border-white/5">
  <div className="max-w-5xl mx-auto"><p className="uppercase tracking-[.3em] text-primary text-xs mb-5">Professional trajectory</p>
  <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">The ascent.</h2>
  <p className="text-zinc-600 dark:text-slate-400 mb-16">A career measured in chapters, not bullet points.</p>
  <ol className="relative border-l border-primary/30 ml-3 md:ml-6">
   {chapters.map((chapter,i)=><motion.li key={chapter.date} initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.45,delay:i*.1}} className="relative pl-9 md:pl-14 pb-16 last:pb-0">
    <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/15"/>
    <span className="text-xs uppercase tracking-[.2em] text-primary">{chapter.date}</span>
    <h3 className="mt-3 text-2xl md:text-4xl font-semibold text-zinc-900 dark:text-white">{chapter.role}</h3>
    <p className="mt-2 text-lg text-zinc-600 dark:text-slate-300">{chapter.org}</p>
    {i===0&&<span className="inline-block mt-4 text-xs uppercase tracking-widest text-primary border border-primary/30 rounded-full px-3 py-1">Career progression</span>}
   </motion.li>)}
  </ol></div>
 </section>;
}