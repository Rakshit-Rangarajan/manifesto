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

const movingIllustrations: Record<string, {
 src: string;
 width: number;
 height: number;
 alt: string;
 caption: string;
 credit: string;
 source: string;
 license: string;
 licenseUrl: string;
}> = {
 "Front Page": {
  src: "https://upload.wikimedia.org/wikipedia/commons/2/20/Sound_wave_animation_no_labels.gif",
  width: 800, height: 450,
  alt: "A speaker cone moves and sends expanding sound waves outward.",
  caption: "How a speaker turns a signal into sound",
  credit: "KyleThayer",
  source: "https://commons.wikimedia.org/wiki/File:Sound_wave_animation_no_labels.gif",
  license: "CC0",
  licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
 },
 Technology: {
  src: "https://upload.wikimedia.org/wikipedia/commons/7/74/Command_Prompt_Animation_-_Command_example%2C_Time.gif",
  width: 550, height: 300,
  alt: "A command prompt demonstrates an interactive shell command.",
  caption: "An example of a command running in a shell",
  credit: "Onlinecontributorguy",
  source: "https://commons.wikimedia.org/wiki/File:Command_Prompt_Animation_-_Command_example,_Time.gif",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
 },
 "Personal Chronicle": {
  src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Mouth_lip_sync_-_At_last%2C_we_can_retire.gif",
  width: 600, height: 339,
  alt: "An illustrated mouth changes shape as it lip-syncs an English sentence.",
  caption: "The changing mouth shapes of a spoken sentence",
  credit: "Jaida Salmon",
  source: "https://commons.wikimedia.org/wiki/File:Mouth_lip_sync_-_At_last,_we_can_retire.gif",
  license: "CC BY-SA 3.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
 },
};

function MovingIllustration({ desk }: { desk: string }) {
 const reducedMotion = useReducedMotion();
 const [play, setPlay] = useState<boolean | null>(null);
 const illustration = movingIllustrations[desk];
 if (!illustration) return null;
 const playing = play ?? !reducedMotion;
 return <figure style={{ margin: "1.5rem 0", border: "1px solid #82684b", background: "#d9c29b", color: "#392819", padding: "1rem" }}>
  {playing && <img src={illustration.src} width={illustration.width} height={illustration.height} alt={illustration.alt} loading="lazy" decoding="async" style={{ display: "block", width: "100%", maxWidth: "40rem", height: "auto", margin: "0 auto" }} />}
  <figcaption style={{ textAlign: "center", fontSize: "0.85rem", marginTop: "0.5rem" }}>
   {illustration.caption} · <a href={illustration.source}>{illustration.credit}</a> · <a href={illustration.licenseUrl}>{illustration.license}</a>
  </figcaption>
  <button type="button" onClick={() => setPlay(!playing)}>{playing ? "Hide animation" : "Play animation"}</button>
 </figure>;
}

const archivedEditions = [
 { day: 26, month: 10, year: 2026, label: "Thursday, 26 November 2026", url: "https://res.cloudinary.com/qib9rawb/raw/upload/v1795749995/wandering-quill/2026-11-26.json" },
];

const monthNames = Array.from({ length: 12 }, (_, month) =>
 new Intl.DateTimeFormat("en", { month: "long", timeZone: "UTC" }).format(Date.UTC(2026, month, 1))
);

function EditionArchive() {
 const [month, setMonth] = useState(10);
 const [year, setYear] = useState(2026);
 const [selected, setSelected] = useState<(typeof archivedEditions)[number] | null>(null);
 const openingDay = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
 const dayCount = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
 const issuesByDay = new Map(archivedEditions.filter(issue => issue.year === year && issue.month === month).map(issue => [issue.day, issue]));

 useEffect(() => {
  if (selected) document.getElementById("archived-edition")?.focus();
 }, [selected]);

 return <>
  <details style={{ position: "relative", width: "fit-content", maxWidth: "100%", margin: "0 0 1rem auto", padding: "0.75rem 1rem", color: "#392819", background: "#e9d6b5", border: "1px solid #82684b" }}>
   <summary style={{ cursor: "pointer" }}>Edition archive</summary>
   <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBlock: "0.75rem" }}>
    <label>Month <select value={month} onChange={event => setMonth(Number(event.target.value))}>
     {monthNames.map((name, index) => <option key={name} value={index}>{name}</option>)}
    </select></label>
    <label>Year <select value={year} onChange={event => setYear(Number(event.target.value))}>
     {Array.from({ length: 3 }, (_, index) => 2025 + index).map(value => <option key={value}>{value}</option>)}
    </select></label>
   </div>
   <div aria-label={monthNames[month] + " " + year} style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: "0.2rem", textAlign: "center" }}>
    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => <strong key={day}>{day}</strong>)}
    {Array.from({ length: openingDay }, (_, index) => <span key={"blank-" + index} />)}
    {Array.from({ length: dayCount }, (_, index) => {
     const day = index + 1;
     const issue = issuesByDay.get(day);
     return issue ? <button type="button" key={day} aria-label={"Read " + issue.label} aria-pressed={selected === issue} onClick={() => setSelected(issue)} style={{ minHeight: "2.5rem", background: "#442c1c", color: "#fff4dc", border: 0, cursor: "pointer" }}>{day}</button> : <span key={day} style={{ alignSelf: "center" }}>{day}</span>;
    })}
   </div>
   {!issuesByDay.size && <p>No archived editions for this month.</p>}
  </details>
  {selected && <div id="archived-edition" tabIndex={-1}>
   <EditionReader key={selected.url} url={selected.url} archived />
  </div>}
 </>;
}

function EditionReader({ url, archived = false }: { url: string; archived?: boolean }) {
 const sectionId = archived ? "quill-archived-heading" : "latest-edition";
 const pagePrefix = archived ? "quill-archive-page-" : "quill-page-";
 const [edition, setEdition] = useState<Edition | null>(null);
 const [failed, setFailed] = useState(false);

 useEffect(() => {
  const controller = new AbortController();
  async function loadEdition() {
   try {
    const response = await fetch(url, { signal: controller.signal });
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
 }, [url]);

 return <section aria-labelledby={sectionId}>
  <div className="chronicles-section-label"><span id={sectionId}>{archived ? "ARCHIVED EDITION" : "LATEST EDITION"}</span><span>{edition?.date}</span></div>
  {edition ? <>
   <nav aria-label="Newspaper pages" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
    {edition.pages.map(([desk], i) => <a key={desk} href={`#${pagePrefix}${i + 1}`}>{desk}</a>)}
   </nav>
   <div className="chronicles-grid" style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
    {edition.pages.map(([desk, title, first, second, links], i) => <article className="chronicles-paper" id={`${pagePrefix}${i + 1}`} key={desk}>
     <div className="chronicles-paper-top"><span>{desk}</span><span>PAGE {i + 1}</span></div>
     <h2>{title}</h2><p>{first}</p>{!archived && <MovingIllustration desk={desk} />}{archived && desk === "Personal Chronicle" && <figure><img src="https://res.cloudinary.com/qib9rawb/image/upload/v1795666218/portfolio/blogs/rain-cc0.gif" alt="Rain falling on leaves" loading="lazy" width={480} style={{ maxWidth: "100%", height: "auto" }} /><figcaption>Rain at the window · Shisma · CC0</figcaption></figure>}<p>{second}</p>
     {links.length > 0 && <ul>{links.map(([label, href]) => <li key={href}><a className="chronicles-read" href={href}>{label}</a></li>)}</ul>}
    </article>)}
   </div>
  </> : <p role="status">{failed ? "The edition is temporarily unavailable." : "Loading the edition…"}</p>}
 </section>;
}

export default function BlogsPage(){
 const reduced=useReducedMotion();
 return <main className="chronicles">
  <div className="chronicles-shell">
   <nav className="chronicles-nav"><Link href="/">← Portfolio</Link><span>THE WANDERING QUILL</span><Link href="/rides">Motorcycle Diaries ↗</Link></nav>
   <header className="chronicles-hero"><p className="chronicles-eyebrow">An illustrated journal of ideas and adventures</p><h1>The Chronicles</h1><p>Stories from a mind that refuses to stay in one place.</p><div className="chronicles-rule">✦ &nbsp; THE WANDERING QUILL &nbsp; ✦</div></header>
   <EditionArchive />
   <EditionReader url="https://res.cloudinary.com/qib9rawb/raw/upload/v1795749099/wandering-quill/2026-11-27.json" />
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