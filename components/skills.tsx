"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/data/portfolio";

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
            <div className="flex flex-wrap gap-2">
              {skills[category.key].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Badge
                    variant="secondary"
                    className="px-3 py-1.5 text-sm font-medium hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
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
