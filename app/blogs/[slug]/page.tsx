import { blogs } from "@/data/blogs";
import BlogPostClient from "./blog-post-client";

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
