"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getBlogBySlug } from "@/data/blogs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogPostClient() {
  const { slug } = useParams<{ slug: string }>();
  const blog = getBlogBySlug(slug);
  if (!blog) return <main className="min-h-screen p-12"><h1>Blog not found</h1><Link href="/blogs">Back to blogs</Link></main>;
  return <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/blogs" className="text-violet-500">← All blogs</Link>
      <img src={blog.coverImage} alt={blog.title} className="mt-8 h-72 w-full rounded-2xl object-cover"/>
      <div className="mt-8 text-sm text-zinc-500">{blog.date} · {blog.readTime}</div>
      <h1 className="mt-4 text-4xl font-bold md:text-6xl">{blog.title}</h1>
      <p className="mt-5 text-xl text-zinc-500">{blog.excerpt}</p>
      <div className="prose prose-zinc mt-12 max-w-none dark:prose-invert"><ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown></div>
    </article>
  </main>;
}
