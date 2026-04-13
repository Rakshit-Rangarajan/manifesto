"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, ArrowRight, Share2 } from "lucide-react";
import { getBlogBySlug, BlogPost } from "@/data/blogs";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function MarkdownContent({ content }: { content: string }) {
  const components: Components = {
    h1: ({ children }) => <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mt-12 mb-6 tracking-tight leading-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-5 tracking-tight border-b border-zinc-200 dark:border-zinc-800 pb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg md:text-xl font-medium text-zinc-900 dark:text-white mt-8 mb-4">{children}</h4>,
    p: ({ children }) => <p className="text-base md:text-lg text-zinc-700 dark:text-slate-300 leading-relaxed mb-6 font-light">{children}</p>,
    ul: ({ children }) => <ul className="list-none space-y-3 mb-6 ml-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal space-y-3 mb-6 ml-6 text-zinc-700 dark:text-slate-300 text-base md:text-lg">{children}</ol>,
    li: ({ children, className }) => {
      // If it's a task list item (from remark-gfm), let's render it without bullet
      if (className === "task-list-item") {
        return <li className="flex items-start gap-3 my-2 text-zinc-700 dark:text-slate-300">{children}</li>;
      }
      return (
        <li className="relative pl-6 text-zinc-700 dark:text-slate-300 text-base md:text-lg font-light">
          <span className="absolute left-0 top-[0.6rem] w-2 h-2 rounded-full bg-primary/40 border border-primary/60"></span>
          {children}
        </li>
      );
    },
    a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-emerald-400 font-medium transition-colors underline decoration-primary/30 underline-offset-4">{children}</a>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-zinc-600 dark:text-slate-400 bg-zinc-50 dark:bg-zinc-900/40 py-4 pr-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
    code: ({ inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      if (!inline && match) {
        return (
          <div className="relative my-8 rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 group shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-white/5">
              <span className="text-xs font-mono text-zinc-400 font-medium uppercase tracking-wider">{match[1]}</span>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
            </div>
            <pre className="p-4 overflow-x-auto text-sm md:text-base font-mono text-slate-300 leading-snug">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          </div>
        );
      }
      return (
        <code className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-white/10 text-primary font-mono text-sm mx-1" {...props}>
          {children}
        </code>
      );
    },
    table: ({ children }) => (
      <div className="my-8 w-full overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm align-middle">
        <table className="w-full text-left border-collapse min-w-[600px]">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-zinc-50 dark:bg-zinc-900/50">{children}</thead>,
    th: ({ children }) => <th className="px-6 py-4 text-sm font-bold tracking-wide text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">{children}</th>,
    td: ({ children }) => <td className="px-6 py-4 text-sm text-zinc-700 dark:text-slate-300 border-b border-zinc-200 dark:border-zinc-800 last:border-0 align-top">{children}</td>,
    img: ({ src, alt }) => (
      <figure className="my-10">
        <img src={src} alt={alt} className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl object-cover" />
        {alt && <figcaption className="mt-4 text-center text-sm text-zinc-500 dark:text-slate-400 italic">{alt}</figcaption>}
      </figure>
    ),
    strong: ({ children }) => <strong className="font-bold text-zinc-900 dark:text-white">{children}</strong>,
    hr: () => <hr className="my-12 border-zinc-200 dark:border-zinc-800" />
  };

  return (
    <div className="w-full break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (params.slug) {
      const found = getBlogBySlug(params.slug as string);
      setBlog(found || null);
    }
  }, [params.slug]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-zinc-300 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Blog not found</h1>
          <Link href="/blogs" className="text-primary hover:underline">
            ← Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <article className="relative">
        <div className="relative h-[60vh] min-h-[400px]">
          <div className="absolute inset-0">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/30" />
          </div>
          
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-6 pb-12 w-full">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft size={20} />
                <span>All blogs</span>
              </Link>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-wrap gap-3 mb-4">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm text-white rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {blog.title}
                </h1>
                
                <div className="flex items-center gap-6 text-white/70">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {blog.readTime}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose-container"
          >
            <div className="flex items-center justify-between py-6 border-b border-zinc-200 dark:border-zinc-800 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">{blog.author}</p>
                  <p className="text-sm text-zinc-500">Author</p>
                </div>
              </div>
              
              <button className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors">
                <Share2 size={18} />
              </button>
            </div>
            
            <MarkdownContent content={blog.content} />
            
            <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                <ArrowLeft size={18} />
                Back to all blogs
              </Link>
            </div>
          </motion.div>
        </div>
      </article>
    </main>
  );
}