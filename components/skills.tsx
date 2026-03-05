"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/data/portfolio";
import Image from "next/image"; // Optional: Use standard <img> if next/image is strict on external domains

const skillCategories = [
  { key: "frontend" as const, label: "Frontend", icon: "⚡" },
  { key: "backend" as const, label: "Backend", icon: "🔧" },
  { key: "ai" as const, label: "AI & Automation", icon: "🤖" },
  { key: "tools" as const, label: "Tools & Platforms", icon: "🛠️" },
];

const Skills = () => {
  return (
    <section id="skills" className="section-container bg-secondary/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="section-title">Skills & Technologies</h2>
        <p className="section-subtitle max-w-2xl mx-auto">
          Technologies I use to bring ideas to life.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={category.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span>{category.icon}</span>
              {category.label}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills[category.key].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Badge
                    variant="secondary"
                    className="px-3 py-1.5 text-sm font-medium transition-transform hover:scale-105 cursor-default flex items-center gap-2 border"
                    style={{ 
                      backgroundColor: `${skill.color}20`, // Appends 20 for ~12% opacity
                      color: skill.color,
                      borderColor: `${skill.color}40`
                    }}
                  >
                    <img 
                      src={skill.icon} 
                      alt={`${skill.name} logo`} 
                      className="w-4 h-4 object-contain"
                      // Fallback logic if image fails to load
                      onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                    />
                    {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;