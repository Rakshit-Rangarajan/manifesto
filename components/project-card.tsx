"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";

export interface Project {
  id: number;
  title: string;
  description: string;
  problem: string;
  solution: string;
  tech: { name: string; icon: string; color?: string }[]; 
  github?: string;
  live?: string;
  image?: any; 
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
      className="bg-card border border-border rounded-xl overflow-hidden card-hover group h-full flex flex-col"
    >
      {project.image && (
        <div className="relative h-48 bg-secondary overflow-hidden shrink-0">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          {project.description}
        </p>

        <div className="space-y-3 mb-6 flex-grow">
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

        {/* Updated Tech Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((techItem) => (
            <Badge
              key={techItem.name}
              variant="secondary"
              className="text-xs font-medium flex items-center gap-1.5 py-1 px-2.5"
            >
              {techItem.icon && (
                <img 
                  src={techItem.icon} 
                  alt={techItem.name} 
                  className="w-3.5 h-3.5 object-contain" 
                />
              )}
              <span style={{ color: techItem.color }}>{techItem.name}</span>
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        {(project.github || project.live) && (
          <div className="flex gap-3 mt-auto pt-4 border-t border-border/50">
            {project.github && (
              <Button variant="outline" size="sm" asChild className="flex gap-2">
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
              <Button variant="outline" size="sm" asChild className="flex gap-2">
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