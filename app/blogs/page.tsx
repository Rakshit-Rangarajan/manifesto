"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, Calendar, ArrowRight } from "lucide-react";
import { blogs, BlogPost } from "@/data/blogs";

function BlogCard({ blog, index }: { blog: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      <Link href={`/blogs/${blog.slug}`} className="block">
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute bottom-4 left-4 z-20">
            <div className="flex flex-wrap gap-2">
              {blog.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(blog.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {blog.readTime}
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </h2>
          
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-4">
            {blog.excerpt}
          </p>
          
          <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
            Read more <ArrowRight size={16} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-zinc-300 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Portfolio</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-4">
              Blog
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
              Thoughts on AI, development, and building cool things. Updates on my projects 
              and learnings from my journey as a developer.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <BlogCard key={blog.slug} blog={blog} index={index} />
            ))}
          </div>

          {blogs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zinc-500 dark:text-zinc-400 text-lg">
                No blogs yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}