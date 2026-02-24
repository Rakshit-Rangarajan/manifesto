"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectCard from "./project-card";

const Projects = () => {
  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle max-w-2xl mx-auto">
          A selection of projects I've worked on, showcasing my skills in
          building performant and user-friendly web applications.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
