"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Brain,
  Sparkles,
  Zap,
  Palette,
  Video,
  Mic,
  BookOpen,
  Database,
  Workflow,
  Figma,
  Search,
  Cpu,
  Wand2
} from "lucide-react";

const toolCategories = [
  {
    title: "Coding Assistants",
    icon: Code2,
    tools: [
      { name: "Cursor", description: "Full-stack coding, debugging, refactoring", color: "from-blue-500 to-cyan-500" },
      { name: "GitHub Copilot", description: "Inline code suggestions & autocomplete", color: "from-purple-500 to-blue-500" },
      { name: "OpenCode Antigravity", description: "Advanced coding workflows", color: "from-cyan-500 to-teal-500" },
      { name: "v0", description: "React/Next.js UI generation", color: "from-black to-gray-600" },
    ],
  },
  {
    title: "Large Language Models",
    icon: Brain,
    tools: [
      { name: "ChatGPT 4o", description: "General coding & problem-solving", color: "from-green-500 to-emerald-500" },
      { name: "Claude 3.5 Sonnet", description: "Complex reasoning & architecture", color: "from-orange-500 to-amber-500" },
      { name: "Gemini", description: "Multimodal tasks & code review", color: "from-blue-500 to-purple-500" },
      { name: "Perplexity", description: "Technical research & learning", color: "from-amber-500 to-orange-500" },
    ],
  },
  {
    title: "Embeddings & Vector",
    icon: Database,
    tools: [
      { name: "text-embedding-3", description: "Vector database embeddings", color: "from-blue-600 to-cyan-600" },
      { name: "gemini-embedding-001", description: "Google RAG embeddings", color: "from-indigo-500 to-purple-500" },
    ],
  },
  {
    title: "Automation",
    icon: Workflow,
    tools: [
      { name: "n8n", description: "Workflow automation & API integrations", color: "from-emerald-500 to-teal-500" },
    ],
  },
  {
    title: "Design & UI",
    icon: Figma,
    tools: [
      { name: "Figma AI", description: "AI-powered design features", color: "from-purple-500 to-pink-500" },
      { name: "v0", description: "UI component generation", color: "from-gray-700 to-gray-900" },
    ],
  },
  {
    title: "Images",
    icon: Palette,
    tools: [
      { name: "NanoBanana", description: "AI image generation", color: "from-pink-500 to-rose-500" },
      { name: "MidJourney", description: "High-quality image creation", color: "from-indigo-500 to-purple-500" },
    ],
  },
  {
    title: "Video",
    icon: Video,
    tools: [
      { name: "Sora", description: "Video generation", color: "from-purple-500 to-fuchsia-500" },
      { name: "Pika", description: "Video creation", color: "from-pink-500 to-rose-500" },
    ],
  },
  {
    title: "Voice",
    icon: Mic,
    tools: [
      { name: "ElevenLabs", description: "Voice synthesis & AI voiceovers", color: "from-cyan-500 to-blue-500" },
    ],
  },
  {
    title: "Learning & Research",
    icon: BookOpen,
    tools: [
      { name: "NotebookLM", description: "Learning & note synthesis", color: "from-amber-500 to-yellow-500" },
      { name: "Google AI Studio", description: "Prompt testing & API experiments", color: "from-blue-500 to-indigo-500" },
    ],
  },
];

const AITools = () => {
  return (
    <section id="ai-tools" className="relative z-20 w-full py-32 px-6 md:px-20 border-t border-black/5 dark:border-white/5">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-sm md:text-base font-medium tracking-widest uppercase mb-4">
            AI Arsenal
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-[1.1]">
            Tools I <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Weaponize.</span>
          </h2>
          <p className="mt-6 text-xl text-zinc-600 dark:text-slate-400 max-w-2xl">
            I don't just use AI, I master it. From coding to creation, here's my complete AI stack.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-white/5">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              {/* Tools in Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="relative p-4 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-primary/30 transition-all duration-300 cursor-default hover:scale-[1.02] hover:-translate-y-0.5"
                  >
                    {/* Gradient accent on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 hover:opacity-15 transition-opacity duration-300 rounded-xl`} />

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${tool.color}`} />
                        <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">
                          {tool.name}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-slate-400">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-500 dark:text-slate-500 text-sm">
            I leverage AI for maximum efficiency while maintaining full control over the final output.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AITools;
