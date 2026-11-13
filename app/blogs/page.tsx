"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {useTheme} from "next-themes";
import { motion, useReducedMotion } from "framer-motion";
import { blogs } from "@/data/blogs";
import "./chronicles.css";

const concepts = [
 {slug:"gemini-hydrogen",title:"When Gemini Hydrogen Was Announced",category:"Technology",excerpt:"A fictional editorial exploring what a future announcement might mean.",image:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop"},
 {slug:"lazy-automate",title:"The Day I Realised I'm Lazy, So I Automate",category:"Reflections",excerpt:"A sample column about the joy of eliminating repetitive work.",image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop"},
 {slug:"pantheon-teams",title:"What Building Pantheon Taught Me About Teams",category:"Ideas",excerpt:"A sample story about collaboration, autonomy and agents.",image:"https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop"},
 {slug:"rain-architecture",title:"Riding in the Rain Teaches Architecture",category:"Journeys",excerpt:"A creative sample connecting winding roads and designing systems.",image:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&auto=format&fit=crop"}
];
export default function BlogsPage(){
 const reduced=useReducedMotion();
 const {resolvedTheme,setTheme}=useTheme();
 const [potter,setPotter]=useState(false);
 useEffect(()=>{try{setPotter(localStorage.getItem("rr-potterhead")==="true")}catch{}},[]);
 const togglePotter=()=>setPotter(v=>{const next=!v;try{localStorage.setItem("rr-potterhead",String(next))}catch{}return next});
 return <main className={`chronicles ${potter?"chronicles-potter":""} ${resolvedTheme==="light"?"chronicles-day":"chronicles-night"}`}>
  <div className="chronicles-shell">
   <nav className="chronicles-nav"><Link href="/">← Portfolio</Link><span>THE WANDERING QUILL</span><div className="chronicles-actions"><button type="button" onClick={()=>setTheme(resolvedTheme==="light"?"dark":"light")} aria-label="Toggle day and night">{resolvedTheme==="light"?"☾ Night":"☀ Day"}</button><button type="button" onClick={togglePotter} aria-pressed={potter}>⚡ {potter?"Muggle Mode":"PotterHead"}</button><Link href="/rides">Motorcycle Diaries ↗</Link></div></nav>
   <header className="chronicles-hero"><p className="chronicles-eyebrow">{potter?"Dispatches from the School of Intelligent Sorcery":"An illustrated journal of ideas and adventures"}</p><h1>{potter?"The Enchanted Chronicles":"The Chronicles"}</h1><p>{potter?"Where artificial intelligence meets a little practical magic.":"Stories from a mind that refuses to stay in one place."}</p><div className="chronicles-rule">✦ &nbsp; THE WANDERING QUILL &nbsp; ✦</div></header>
   <div className="chronicles-section-label"><span>{potter?"THE SPELLBOUND ARCHIVE":"THE LIVING ARCHIVE"}</span><span>DEMONSTRATION EDITION · SAMPLE STORIES</span></div>
   <section className="chronicles-grid" aria-label="Sample newspaper editions">
    {concepts.map((post,i)=><motion.article key={post.slug} className="chronicles-paper" initial={reduced?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.07}}>
      <div className="chronicles-paper-top"><span>THE WANDERING QUILL</span><span>VOL. I · NO. {String(i+1).padStart(2,"0")}</span></div>
      <div className="chronicles-category">{post.category} · Concept article</div><h2>{post.title}</h2>
      <div className="chronicles-photo"><img src={post.image} alt={post.category+" editorial illustration"} loading="lazy"/><span className="chronicles-photo-shimmer" aria-hidden="true"/></div>
      <p>{post.excerpt}</p><div className="chronicles-bottom"><span>Illustrative preview · Not published</span><span>✧</span></div>
    </motion.article>)}
   </section>
   <div className="chronicles-section-label"><span>{potter?"THE ORIGINAL SCROLLS":"EXISTING WRITINGS"}</span><span>FROM THE ARCHIVE</span></div>
   <section className="chronicles-grid" aria-label="Existing blog posts">{blogs.map((post,i)=><article className="chronicles-paper" key={post.slug}>
     <div className="chronicles-paper-top"><span>THE WANDERING QUILL</span><span>ARCHIVE · {String(i+1).padStart(2,"0")}</span></div><div className="chronicles-category">{post.tags.join(" · ")}</div>
     <h2>{post.title}</h2><Link href={`/blogs/${post.slug}`} className="chronicles-photo"><img src={post.coverImage} alt="" loading="lazy"/></Link><p>{post.excerpt}</p><Link href={`/blogs/${post.slug}`} className="chronicles-read">Read full article →</Link>
   </article>)}</section>
   <p className="chronicles-end">✦ &nbsp; Every story deserves its own edition &nbsp; ✦</p>
  </div>
 </main>;
}