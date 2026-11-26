"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { getBlogBySlug, blogs } from "@/data/blogs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../chronicles.css";

export default function BlogPostClient() {
  const { slug } = useParams<{ slug: string }>();
  const {resolvedTheme,setTheme}=useTheme();
  const [potter,setPotter]=useState(false);
  const blog = getBlogBySlug(slug);
  const ordered=[...blogs].sort((a,b)=>b.date.localeCompare(a.date));
  const index=ordered.findIndex(p=>p.slug===slug);
  const next=index>=0?ordered[(index+1)%ordered.length]:undefined;
  return <main className={`chronicles ${potter?"chronicles-potter":""} ${resolvedTheme==="light"?"chronicles-day":"chronicles-night"}`}>
    <div className="chronicles-shell">
      <nav className="chronicles-nav"><Link href="/blogs">← All editions</Link><div className="chronicles-actions"><button type="button" onClick={()=>setPotter(v=>!v)} aria-pressed={potter}>⚡ {potter?"Muggle Mode":"PotterHead"}</button><button type="button" onClick={()=>setTheme(resolvedTheme==="light"?"dark":"light")}>{resolvedTheme==="light"?"Night edition":"Day edition"}</button><Link href="/">Portfolio ↗</Link></div></nav>
      <article className="chronicles-reader">
        <div className="chronicles-reader-masthead">{potter?"The Enchanted Chronicles":"The Chronicles"}<span className="chronicles-reader-kicker">{potter?"THE WIZARDING EDITION":"THE WANDERING QUILL · FEATURE STORY"}</span></div>
        {!blog?<><h1>Story not found</h1><Link href="/blogs">Return to the archive</Link></>:<>
          <div className="chronicles-category">{blog.tags.join(" · ")}</div><div className="chronicles-reader-edition">THE CHRONICLES <span>✦</span> {blog.readTime.toUpperCase()}</div>
          <h1>{blog.title}</h1>
          <p className="chronicles-reader-deck">{blog.excerpt}</p>
          <div className="chronicles-byline">By {blog.author} · {blog.date} · {blog.readTime}</div>
          <img src={blog.coverImage} alt="" className="chronicles-reader-cover"/>
          <div className="chronicles-reader-body"><ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content.trim().replace(/^# [^\n]+\n+/, "")}</ReactMarkdown></div>
          <footer className="chronicles-reader-footer"><Link href="/blogs" className="chronicles-read">← Back to the archive</Link>{next&&next.slug!==slug&&<Link href={`/blogs/${next.slug}`} className="chronicles-read">Another story →</Link>}</footer>
        </>}
      </article>
    </div>
  </main>;
}
