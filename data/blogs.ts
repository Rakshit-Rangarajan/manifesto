export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
}

export const blogs: BlogPost[] = [
  {
    slug: "building-ai-chatbot-without-api-keys",
    title: "Building a Drop-in AI Chatbot Without API Keys",
    excerpt: "How I built OrbBot - a zero-config AI chatbot that anyone can embed in their website without managing complex backends or paying for API keys.",
    content: `
# Building a Drop-in AI Chatbot Without API Keys

Ever wanted to add an AI chatbot to your website but got stuck on the complexity of setting up backends, managing API keys, and dealing with billing? I certainly did.

## The Problem

Website owners needed a simple way to add a document-aware AI chatbot without:
- Managing complex backends
- Setting up databases
- Dealing with API key billing
- Configuring authentication

## The Solution

I built OrbBot - a fully customizable, embeddable widget that uses Puter.js for native AI capabilities and Pinecone for Retrieval-Augmented Generation.

### Key Features

1. **Zero Configuration** - Just add a script tag
2. **Document-Aware** - Upload PDFs, docs, or web content
3. **Privacy-First** - Your data stays on your server
4. **Free to Start** - No API key required

## Tech Stack

- **React** - For the widget UI
- **Puter.js** - For AI capabilities
- **Pinecone** - For vector storage
- **Tailwind CSS** - For styling

## Installation

\`\`\`html
<script src="https://orbbot.example.com/widget.js"></script>
\`\`\`

That's it! Your chatbot is live.

## Conclusion

The future of AI tools should be accessible to everyone - not just those who can afford complex infrastructure setups. OrbBot proves that.
`,
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60",
    date: "2025-03-15",
    author: "Rakshit Rangarajan",
    tags: ["AI", "React", "Tutorial"],
    readTime: "5 min read"
  },
  {
    slug: "how-ai-changed-my-development-workflow",
    title: "How AI Transformed My Development Workflow",
    excerpt: "From writing code line-by-line to shipping features in hours. Here's how tools like Cursor, Copilot, and Claude changed the way I build software.",
    content: `
# How AI Transformed My Development Workflow

A year ago, I was spending hours debugging syntax errors and writing boilerplate code. Today, I ship features in hours that used to take days. Here's my journey.

## The Before Times

My typical development workflow looked like:
1. Write boilerplate components
2. Debug for hours
3. Repeat

## The Shift

When GitHub Copilot launched, I was skeptical. But after trying it for a week, I couldn't go back.

### My AI Tool Stack

| Tool | Use Case |
|------|----------|
| **Cursor** | Primary IDE for all projects |
| **GitHub Copilot** | Code completion |
| **Claude** | Code review & debugging |
| **v0** | UI prototyping |

## The Results

- **60% faster** feature development
- **80% less** boilerplate code
- **Better code quality** through AI suggestions

## Key Lessons

1. **Learn to prompt** - Good prompts = good code
2. **Verify everything** - AI makes mistakes
3. **Let AI handle the boring stuff** - Focus on logic

## Conclusion

AI isn't replacing developers - it's making us more powerful. The developers who embrace these tools will outpace those who don't.
`,
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60",
    date: "2025-02-28",
    author: "Rakshit Rangarajan",
    tags: ["AI", "Productivity", "Career"],
    readTime: "4 min read"
  },
  {
    slug: "msc-ai-journey-cardiff",
    title: "My MSc AI Journey at Cardiff University",
    excerpt: "Reflections on a year of studying Artificial Intelligence in Wales - from machine learning fundamentals to building real AI systems.",
    content: `
# My MSc AI Journey at Cardiff University

Last week, I received my MSc in Artificial Intelligence with Merit. Here's what I learned, built, and how it changed my career trajectory.

## Why Cardiff?

I chose Cardiff University for three reasons:
1. **Reputation** - Strong AI research program
2. **Location** - UK offers post-study work visa
3. **Community** - Diverse, international cohort

## The Curriculum

### Year Highlights

- **Machine Learning** - Foundations of ML algorithms
- **Deep Learning** - Neural networks and transformers
- **NLP** - Language models and text processing
- **Computer Vision** - Image recognition systems
- **Ethics in AI** - Responsible AI development

## The Projects

### Capstone Project
Built a Welsh language learning app powered by Ollama, helping preserve endangered languages through technology.

### Hackathon
Won 2nd Runner-up at Cardiff AI Hackathon with AMPLYFI - a financial planning AI assistant.

## What Changed

1. **Mental Models** - I now think in probabilities, not absolutes
2. **Problem Solving** - AI-first approach to challenges
3. **Career Direction** - Focused on AI-powered products

## Looking Ahead

The AI revolution is just beginning. I'm excited to be part of it.
`,
    coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60",
    date: "2025-01-20",
    author: "Rakshit Rangarajan",
    tags: ["Education", "AI", "Cardiff"],
    readTime: "6 min read"
  }
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find(blog => blog.slug === slug);
}