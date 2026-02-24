"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/portfolio";

const Education = () => {
  return (
    <section id="education" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle max-w-2xl mx-auto">
          My academic background and qualifications.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-card border border-border rounded-xl p-6 card-hover"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {edu.degree}
                </h3>
                <p className="text-muted-foreground font-medium">
                  {edu.institution}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  📍 {edu.location}
                </p>
                <p className="text-sm text-primary font-medium mt-2">
                  {edu.period}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
