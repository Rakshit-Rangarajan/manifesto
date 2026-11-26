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
 const [filter,setFilter]=useState("All");
 const [query,setQuery]=useState("");
 const ordered=[...blogs].sort((a,b)=>b.date.localeCompare(a.date));
 const featured=ordered[0];
 const tags=["All",...Array.from(new Set(ordered.flatMap(p=>p.tags)))];
 const filtered=ordered.filter(p=>(filter==="All"||p.tags.includes(filter))&&`${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
 return <main className={`chronicles chronicles-prophet ${resolvedTheme==="light"?"chronicles-day":"chronicles-night"}`}>
  <div className="chronicles-shell">
   <nav className="chronicles-nav"><Link href="/">← Portfolio</Link><span>THE WANDERING QUILL</span><div className="chronicles-actions"><button type="button" onClick={()=>setTheme(resolvedTheme==="light"?"dark":"light")} aria-label="Toggle day and night">{resolvedTheme==="light"?"☾ Night":"☀ Day"}</button><Link href="/rides">Motorcycle Diaries ↗</Link></div></nav>
   <header className="chronicles-hero"><p className="chronicles-eyebrow">"THE INDEPENDENT GAZETTE OF IDEAS & ADVENTURES"</p><h1>"THE WANDERING QUILL"</h1><p>"Moving pictures. Curious minds. Extraordinary stories."</p><div className="chronicles-rule">✦ &nbsp; THE WANDERING QUILL &nbsp; ✦</div><div className="chronicles-edition"><span>EST. IN CURIOSITY</span><span>INDEPENDENT JOURNAL · {ordered.length} STORIES</span><span>IDEAS · MACHINES · ADVENTURES</span></div></header>
   {featured&&<section className="chronicles-front" aria-label="Featured article"><div className="chronicles-front-copy"><span className="chronicles-category">FRONT PAGE · EDITOR'S PICK</span><h2><Link href={`/blogs/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.excerpt}</p><div className="chronicles-byline">{featured.author} · {featured.date} · {featured.readTime}</div><Link className="chronicles-read" href={`/blogs/${featured.slug}`}>Read the story →</Link></div><Link href={`/blogs/${featured.slug}`} className="chronicles-front-image chronicles-moving-picture"><img src={featured.coverImage} alt="" /><span className="chronicles-picture-veil" aria-hidden="true" /><span className="chronicles-photo-caption">A MOVING PORTRAIT · CONTINUED ON PAGE ONE</span></Link></section>}
   <div className="chronicles-section-label"><span>INSIDE THIS EDITION</span><span>{filtered.length} STORIES</span></div>
   <div className="chronicles-toolbar"><label>Search the archive<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a story…"/></label><label>Edition<select value={filter} onChange={e=>setFilter(e.target.value)}>{tags.map(tag=><option key={tag}>{tag}</option>)}</select></label></div>
   <section className="chronicles-grid" aria-label="Published articles">{filtered.map((post,i)=><motion.article key={post.slug} className={`chronicles-paper ${i===0?"chronicles-lead-story":""}`} initial={reduced?false:{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.35,delay:Math.min(i,3)*.04}}>
     <div className="chronicles-paper-top"><span>NO. {String(i+1).padStart(2,"0")} · {post.tags[0]??"Editorial"}</span><span>{post.date}</span></div>
     <h2><Link href={`/blogs/${post.slug}`}>{post.title}</Link></h2><Link href={`/blogs/${post.slug}`} className="chronicles-photo chronicles-moving-picture"><img src={post.coverImage} alt="" loading="lazy"/><span className="chronicles-picture-veil" aria-hidden="true"/></Link><p>{post.excerpt}</p><div className="chronicles-bottom"><Link href={`/blogs/${post.slug}`} className="chronicles-read">Read full article →</Link><span>{post.readTime}</span></div>
   </motion.article>)}</section>
   {!filtered.length&&<p className="chronicles-empty">No stories match your search. <button onClick={()=>{setFilter("All");setQuery("")}}>Clear filters</button></p>}
   <details className="chronicles-concepts"><summary>From the editor's notebook · unpublished concepts</summary><div className="chronicles-concept-grid">{concepts.map(post=><article key={post.slug}><span className="chronicles-category">{post.category} · Concept</span><h3>{post.title}</h3><p>{post.excerpt}</p></article>)}</div></details>
   <p className="chronicles-end">✦ &nbsp; Every story deserves its own edition &nbsp; ✦</p>
  </div>
 </main>;
}