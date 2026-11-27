"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { blogs } from "@/data/blogs";
import "./chronicles.css";

const concepts = [
 {slug:"gemini-hydrogen",title:"When Gemini Hydrogen Was Announced",category:"Technology",excerpt:"A fictional editorial exploring what a future announcement might mean.",image:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop"},
 {slug:"lazy-automate",title:"The Day I Realised I'm Lazy, So I Automate",category:"Reflections",excerpt:"A sample column about the joy of eliminating repetitive work.",image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop"},
 {slug:"pantheon-teams",title:"What Building Pantheon Taught Me About Teams",category:"Ideas",excerpt:"A sample story about collaboration, autonomy and agents.",image:"https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop"},
 {slug:"rain-architecture",title:"Riding in the Rain Teaches Architecture",category:"Journeys",excerpt:"A creative sample connecting winding roads and designing systems.",image:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&auto=format&fit=crop"}
];
type Edition = {
 date: string;
 pages: [string, string, string, string, [string, string][]][];
};

const movingIllustrations: Record<string, {label: string; caption: string; marks: string[]}> = {
 "Front Page": {
  label: "Kannada, Tamil, Hindi and English letters in an animated typesetting diagram",
  caption: "Moving illustration · A shared representation for multiple scripts",
  marks: ["ಕ", "த", "अ", "A"],
 },
 Technology: {
  label: "Three animated stages showing an agent moving from files to a report and verification",
  caption: "Moving illustration · The work ShellBench asks an agent to complete",
  marks: ["Files", "Report", "Verify"],
 },
 "Personal Chronicle": {
  label: "An animated waveform representing a mixed-language voice request",
  caption: "Moving illustration · A voice request that switches between languages",
  marks: ["▂", "▄", "▇", "▃", "▆", "▄", "█", "▃", "▅"],
 },
};

function MovingIllustration({ desk }: { desk: string }) {
 const illustration = movingIllustrations[desk];
 if (!illustration) return null;
 return <figure style={{ margin: "1.5rem 0", border: "1px solid #82684b", background: "#d9c29b", color: "#392819", padding: "1rem" }}>
  <div className="quill-moving-illustration" role="img" aria-label={illustration.label}>
   {illustration.marks.map((mark, i) => <span aria-hidden="true" key={i} style={{ animationDelay: `${i * 0.16}s` }}>{mark}</span>)}
  </div>
  <figcaption style={{ textAlign: "center", fontSize: "0.85rem", marginTop: "0.5rem" }}>{illustration.caption}</figcaption>
  <style jsx>{`
   .quill-moving-illustration {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: clamp(0.35rem, 3vw, 2rem);
    min-height: 7rem;
    font-size: clamp(1rem, 4vw, 2rem);
    font-weight: 700;
   }
   .quill-moving-illustration span { display: inline-block; animation: quill-impression 3s ease-in-out infinite; }
   @keyframes quill-impression {
    0%, 60%, 100% { transform: translateY(0); opacity: 1; }
    25% { transform: translateY(-0.6rem); opacity: 0.6; }
   }
   @media (prefers-reduced-motion: reduce) {
    .quill-moving-illustration span { animation: none; }
   }
  `}</style>
 </figure>;
}

function LatestEdition() {
 const [edition, setEdition] = useState<Edition | null>(null);
 const [failed, setFailed] = useState(false);

 useEffect(() => {
  const controller = new AbortController();
  async function loadEdition() {
   try {
    const response = await fetch("https://res.cloudinary.com/qib9rawb/raw/upload/v1795749099/wandering-quill/2026-11-27.json", { signal: controller.signal });
    if (!response.ok) throw new Error("Edition request failed");
    const issue: Edition = await response.json();
    if (!issue.date || !issue.pages?.length) throw new Error("Edition is empty");
    setEdition(issue);
   } catch {
    if (!controller.signal.aborted) setFailed(true);
   }
  }
  void loadEdition();
  return () => controller.abort();
 }, []);

 return <section aria-labelledby="latest-edition">
  <div className="chronicles-section-label"><span id="latest-edition">LATEST EDITION</span><span>{edition?.date}</span></div>
  {edition ? <>
   <nav aria-label="Newspaper pages" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
    {edition.pages.map(([desk], i) => <a key={desk} href={`#quill-page-${i + 1}`}>{desk}</a>)}
   </nav>
   <div className="chronicles-grid" style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
    {edition.pages.map(([desk, title, first, second, links], i) => <article className="chronicles-paper" id={`quill-page-${i + 1}`} key={desk}>
     <div className="chronicles-paper-top"><span>{desk}</span><span>PAGE {i + 1}</span></div>
     <h2>{title}</h2><p>{first}</p><MovingIllustration desk={desk} /><p>{second}</p>
     {links.length > 0 && <ul>{links.map(([label, href]) => <li key={href}><a className="chronicles-read" href={href}>{label}</a></li>)}</ul>}
    </article>)}
   </div>
  </> : <p role="status">{failed ? "The latest edition is temporarily unavailable." : "Loading the latest edition…"}</p>}
 </section>;
}

export default function BlogsPage(){
 const reduced=useReducedMotion();
 return <main className="chronicles">
  <div className="chronicles-shell">
   <nav className="chronicles-nav"><Link href="/">← Portfolio</Link><span>THE WANDERING QUILL</span><Link href="/rides">Motorcycle Diaries ↗</Link></nav>
   <header className="chronicles-hero"><p className="chronicles-eyebrow">An illustrated journal of ideas and adventures</p><h1>The Chronicles</h1><p>Stories from a mind that refuses to stay in one place.</p><div className="chronicles-rule">✦ &nbsp; THE WANDERING QUILL &nbsp; ✦</div></header>
   <LatestEdition />
   <details><summary>Sample stories</summary>
   <section className="chronicles-grid" aria-label="Sample newspaper editions">
    {concepts.map((post,i)=><motion.article key={post.slug} className="chronicles-paper" initial={reduced?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.07}}>
      <div className="chronicles-paper-top"><span>THE WANDERING QUILL</span><span>VOL. I · NO. {String(i+1).padStart(2,"0")}</span></div>
      <div className="chronicles-category">{post.category} · Concept article</div><h2>{post.title}</h2>
      <div className="chronicles-photo"><img src={post.image} alt={post.category+" editorial illustration"} loading="lazy"/><span className="chronicles-photo-shimmer" aria-hidden="true"/></div>
      <p>{post.excerpt}</p><div className="chronicles-bottom"><span>Illustrative preview · Not published</span><span>✧</span></div>
    </motion.article>)}
   </section>
   </details>
   <div className="chronicles-section-label"><span>EXISTING WRITINGS</span><span>FROM THE ARCHIVE</span></div>
   <section className="chronicles-grid" aria-label="Existing blog posts">{blogs.map((post,i)=><article className="chronicles-paper" key={post.slug}>
     <div className="chronicles-paper-top"><span>THE WANDERING QUILL</span><span>ARCHIVE · {String(i+1).padStart(2,"0")}</span></div><div className="chronicles-category">{post.tags.join(" · ")}</div>
     <h2>{post.title}</h2><Link href={`/blogs/${post.slug}`} className="chronicles-photo"><img src={post.coverImage} alt="" loading="lazy"/></Link><p>{post.excerpt}</p><Link href={`/blogs/${post.slug}`} className="chronicles-read">Read full article →</Link>
   </article>)}</section>
   <p className="chronicles-end">✦ &nbsp; Every story deserves its own edition &nbsp; ✦</p>
  </div>
 </main>;
}