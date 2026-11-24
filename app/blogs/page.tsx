"use client";
import Link from "next/link";
import {useState} from "react";
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
 const [filter,setFilter]=useState("All");
 const [query,setQuery]=useState("");
 const ordered=[...blogs].sort((a,b)=>b.date.localeCompare(a.date));
 const featured=ordered[0];
 const tags=["All",...Array.from(new Set(ordered.flatMap(p=>p.tags)))];
 const filtered=ordered.filter(p=>(filter==="All"||p.tags.includes(filter))&&`${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
 const togglePotter=()=>setPotter(v=>!v);
 return <main className={`chronicles ${potter?"chronicles-potter":""} ${resolvedTheme==="light"?"chronicles-day":"chronicles-night"}`}>
  <div className="chronicles-shell">
   <nav className="chronicles-nav"><Link href="/">← Portfolio</Link><span>THE WANDERING QUILL</span><div className="chronicles-actions"><button type="button" onClick={()=>setTheme(resolvedTheme==="light"?"dark":"light")} aria-label="Toggle day and night">{resolvedTheme==="light"?"☾ Night":"☀ Day"}</button><button type="button" onClick={togglePotter} aria-pressed={potter}>⚡ {potter?"Muggle Mode":"PotterHead"}</button><Link href="/rides">Motorcycle Diaries ↗</Link></div></nav>
   <header className="chronicles-hero"><p className="chronicles-eyebrow">{potter?"Dispatches from the School of Intelligent Sorcery":"An illustrated journal of ideas and adventures"}</p><h1>{potter?"The Enchanted Chronicles":"The Chronicles"}</h1><p>{potter?"Where artificial intelligence meets a little practical magic.":"Stories from a mind that refuses to stay in one place."}</p><div className="chronicles-rule">✦ &nbsp; THE WANDERING QUILL &nbsp; ✦</div></header>
   {featured&&<section className="chronicles-front" aria-label="Featured article"><div className="chronicles-front-copy"><span className="chronicles-category">FRONT PAGE · EDITOR'S PICK</span><h2><Link href={`/blogs/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.excerpt}</p><div className="chronicles-byline">{featured.author} · {featured.date} · {featured.readTime}</div><Link className="chronicles-read" href={`/blogs/${featured.slug}`}>Read the story →</Link></div><Link href={`/blogs/${featured.slug}`} className="chronicles-front-image"><img src={featured.coverImage} alt="" /></Link></section>}
   <div className="chronicles-section-label"><span>THE ARCHIVE</span><span>{filtered.length} STORIES</span></div>
   <div className="chronicles-toolbar"><label>Search the archive<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a story…"/></label><label>Edition<select value={filter} onChange={e=>setFilter(e.target.value)}>{tags.map(tag=><option key={tag}>{tag}</option>)}</select></label></div>
   <section className="chronicles-grid" aria-label="Published articles">{filtered.map((post,i)=><motion.article key={post.slug} className="chronicles-paper" initial={reduced?false:{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.35,delay:Math.min(i,3)*.04}}>
     <div className="chronicles-paper-top"><span>{post.tags[0]??"Editorial"}</span><span>{post.date}</span></div>
     <h2><Link href={`/blogs/${post.slug}`}>{post.title}</Link></h2><Link href={`/blogs/${post.slug}`} className="chronicles-photo"><img src={post.coverImage} alt="" loading="lazy"/></Link><p>{post.excerpt}</p><div className="chronicles-bottom"><Link href={`/blogs/${post.slug}`} className="chronicles-read">Read full article →</Link><span>{post.readTime}</span></div>
   </motion.article>)}</section>
   {!filtered.length&&<p className="chronicles-empty">No stories match your search. <button onClick={()=>{setFilter("All");setQuery("")}}>Clear filters</button></p>}
   <details className="chronicles-concepts"><summary>From the editor's notebook · unpublished concepts</summary><div className="chronicles-concept-grid">{concepts.map(post=><article key={post.slug}><span className="chronicles-category">{post.category} · Concept</span><h3>{post.title}</h3><p>{post.excerpt}</p></article>)}</div></details>
   <p className="chronicles-end">✦ &nbsp; Every story deserves its own edition &nbsp; ✦</p>
  </div>
 </main>;
}