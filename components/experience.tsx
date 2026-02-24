"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";

const Experience = () => {
  return (
    <section id="experience" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle max-w-2xl mx-auto">
          My professional journey building web applications.
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

        <div className="space-y-12">
          {experience.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-primary rounded-full md:-translate-x-1/2 -translate-x-1 mt-2" />
              <div
                className={`pl-8 md:pl-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
              >
                <div className="bg-card border border-border rounded-xl p-6 card-hover">
                  <span className="text-sm text-primary font-medium">
                    {job.period}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mt-1">
                    {job.role}
                  </h3>
                  <p className="text-muted-foreground font-medium mb-4">
                    {job.company}
                  </p>
                  <ul
                    className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : ""}`}
                  >
                    {job.description.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1 shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
