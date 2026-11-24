"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { getBlogBySlug, blogs } from "@/data/blogs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../chronicles.css";

export default function BlogPostClient() {
  const { slug } = useParams<{ slug: string }>();
  const {resolvedTheme,setTheme}=useTheme();
  const blog = getBlogBySlug(slug);
  const next=blogs.find(p=>p.slug!==slug);
  return <main className={`chronicles ${resolvedTheme==="light"?"chronicles-day":"chronicles-night"}`}>
    <div className="chronicles-shell">
      <nav className="chronicles-nav"><Link href="/blogs">← All editions</Link><div className="chronicles-actions"><button type="button" onClick={()=>setTheme(resolvedTheme==="light"?"dark":"light")}>{resolvedTheme==="light"?"Night edition":"Day edition"}</button><Link href="/">Portfolio ↗</Link></div></nav>
      <article className="chronicles-reader">
        <div className="chronicles-reader-masthead">The Chronicles</div>
        {!blog?<><h1>Story not found</h1><Link href="/blogs">Return to the archive</Link></>:<>
          <div className="chronicles-category">{blog.tags.join(" · ")}</div>
          <h1>{blog.title}</h1>
          <p className="chronicles-reader-deck">{blog.excerpt}</p>
          <div className="chronicles-byline">By {blog.author} · {blog.date} · {blog.readTime}</div>
          <img src={blog.coverImage} alt="" className="chronicles-reader-cover"/>
          <div className="chronicles-reader-body"><ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content.trim().replace(/^# [^\n]+\n+/, "")}</ReactMarkdown></div>
          <footer className="chronicles-reader-footer"><Link href="/blogs" className="chronicles-read">← Back to the archive</Link>{next&&<Link href={`/blogs/${next.slug}`} className="chronicles-read">Another story →</Link>}</footer>
        </>}
      </article>
    </div>
  </main>;
}
