"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  github?: string;
  live?: string;
  image?: string | StaticImageData;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl overflow-hidden card-hover group"
    >
      {project.image && (
        <div className="relative h-48 bg-secondary overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          {project.description}
        </p>

        <div className="space-y-3 mb-4">
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">
              Challenge
            </p>
            <p className="text-sm text-muted-foreground">{project.problem}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">
              Solution
            </p>
            <p className="text-sm text-muted-foreground">{project.solution}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-xs font-medium"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {(project.github || project.live) && (
          <div className="flex gap-3">
            {project.github && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  Code
                </a>
              </Button>
            )}
            {project.live && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ProjectCard;
