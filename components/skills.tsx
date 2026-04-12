"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import {
  Code2,
  Server,
  Brain,
  Cpu,
  Workflow
} from "lucide-react";

const getHoverGradient = (color: string) => {
  const blackColors = ['#000000', '#000', '#1a1a1a', '#333333', '#333'];
  if (blackColors.includes(color.toLowerCase())) {
    return "from-primary/20 to-emerald-400/20";
  }
  return `from-[${color}]/20 to-[${color}]/10`;
};

const skillCategories = [
  { key: "frontend" as const, label: "Frontend", icon: Code2 },
  { key: "backend" as const, label: "Backend", icon: Server },
  { key: "ai" as const, label: "AI & LLMs", icon: Brain },
  { key: "automation" as const, label: "Automation", icon: Workflow },
  { key: "tools" as const, label: "Dev Tools", icon: Cpu },
];

const Skills = () => {
  return (
    <section id="skills" className="relative z-20 bg-transparent w-full min-h-screen py-32 md:py-48 px-6 md:px-20 border-t border-black/5 dark:border-white/5">
      <div className="max-w-[1600px] mx-auto w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-sm md:text-base font-medium tracking-widest uppercase mb-4">
            Tools I Weaponize
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-[1.1]">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Arsenal.</span>
          </h2>
          <p className="mt-6 text-xl text-zinc-600 dark:text-slate-400 max-w-2xl">
            I don't just use AI, I master it. From coding to creation, here's my complete AI stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-white/5">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {category.label}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills[category.key].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: catIndex * 0.1 + index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="relative p-4 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-primary/30 transition-all duration-300 cursor-default"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-emerald-400/15 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                    <div className="relative z-10 flex items-center gap-3">
                      {skill.icon && (
                        <img 
                          src={skill.icon} 
                          alt={`${skill.name} logo`} 
                          className="w-5 h-5 object-contain"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">
                          {skill.name}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-500 dark:text-slate-500 text-sm">
            I leverage these tools for maximum efficiency while maintaining full control over the final output.
          </p>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Skills;