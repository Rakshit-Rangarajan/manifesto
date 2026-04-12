"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ExternalLink, X, ChevronLeft, ChevronRight, ZoomIn, Mail } from "lucide-react";
import type { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { projects } from "@/data/portfolio";
import { useModalContext } from "./ModalContext";
import { ScrollProgress } from "./ScrollProgress";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop";

interface TechItem {
  name: string;
  icon: string;
  color: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  problem: string;
  solution: string;
  tech: TechItem[];
  github?: string;
  live?: string;
  image?: StaticImageData;
}

const ImageLightbox = ({ 
  src, 
  alt, 
  onClose 
}: { 
  src: string; 
  alt: string; 
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <X size={24} />
      </button>
      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
};

const ProjectModal = ({ 
  project, 
  onClose, 
  onPrev, 
  onNext,
  hasPrev,
  hasNext,
  projectIndex,
  totalProjects
}: { 
  project: Project; 
  onClose: () => void; 
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  projectIndex: number;
  totalProjects: number;
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { setIsAnyModalOpen } = useModalContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    setIsAnyModalOpen(true);
    
    // Track project view with Plausible
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible("Project Viewed", {
        props: { 
          project: project.title,
          index: projectIndex 
        }
      });
    }
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
      setIsAnyModalOpen(false);
    };
  }, [onClose, project.title, projectIndex, setIsAnyModalOpen]);

  const handlePrevKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      if (hasPrev) onPrev();
      else onClose();
    }
    if (e.key === "ArrowRight") {
      if (hasNext) onNext();
      else onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      onKeyDown={handlePrevKey}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
    >
      <div 
        className="absolute inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-5xl max-h-[95vh] m-4 rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: "hsl(var(--card))",
        }}
      >
        <ScrollProgress containerRef={scrollRef} />
        {/* Close & Nav Header */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
          <div 
            className="text-sm font-mono font-bold px-3 py-1 rounded-full"
            style={{
              color: "hsl(var(--muted-foreground))",
              background: "hsl(var(--background) / 0.8)",
            }}
          >
            {projectIndex + 1} / {totalProjects}
          </div>
          <div className="flex items-center gap-2">
            {hasPrev && (
              <button
                onClick={onPrev}
                className="w-10 h-10 rounded-full transition-colors shadow-md flex items-center justify-center font-bold"
                style={{
                  background: "hsl(var(--card))",
                  color: "hsl(var(--foreground))",
                }}
                aria-label="Previous project"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {hasNext && (
              <button
                onClick={onNext}
                className="w-10 h-10 rounded-full transition-colors shadow-md flex items-center justify-center font-bold"
                style={{
                  background: "hsl(var(--card))",
                  color: "hsl(var(--foreground))",
                }}
                aria-label="Next project"
              >
                <ChevronRight size={20} />
              </button>
            )}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full transition-colors shadow-md ml-2 flex items-center justify-center font-bold"
              style={{
                background: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
              }}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="overflow-y-auto max-h-[95vh]"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Project Image with Zoom */}
          <div 
            className="relative h-64 md:h-80 bg-cover bg-center cursor-zoom-in group"
            style={{ backgroundImage: `url(${project.image?.src || FALLBACK_IMAGE})` }}
            onClick={() => setLightboxOpen(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                <ZoomIn size={16} />
                Click to zoom
              </span>
            </div>
          </div>
          
          <div className="p-6 md:p-10">
            <div className="mb-6">
              <p className="text-sm font-medium tracking-widest mb-2 uppercase" style={{ color: "hsl(var(--primary))" }}>System Overview</p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ 
                color: "hsl(var(--card-foreground))",
              }}>{project.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "hsl(var(--card-foreground))" }}>The Problem</h3>
                <p style={{ color: "hsl(var(--muted-foreground))" }}>{project.problem}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "hsl(var(--card-foreground))" }}>The Solution</h3>
                <p style={{ color: "hsl(var(--muted-foreground))" }}>{project.solution}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "hsl(var(--card-foreground))" }}>Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <motion.span 
                    key={tech.name} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform cursor-default"
                    style={{
                      background: "hsl(var(--secondary))",
                      color: "hsl(var(--secondary-foreground))",
                    }}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-6 border-t" style={{ borderColor: "hsl(var(--border))" }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-opacity"
                >
                  <Github size={20} />
                  Source Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-opacity"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              )}
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
                className="btn-secondary flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ml-auto"
              >
                <Mail size={20} />
                Let's Talk
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightboxOpen && (
          <ImageLightbox 
            src={project.image?.src || FALLBACK_IMAGE} 
            alt={project.title}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectCard = ({ 
  project, 
  index, 
  onClick 
}: { 
  project: Project; 
  index: number; 
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div
        className="flex-shrink-0 w-[85vw] lg:w-[60vw] h-[80vh] cursor-pointer"
        onClick={onClick}
      >
        <div className="w-full h-full relative overflow-hidden rounded-[2.5rem] border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-xl dark:shadow-2xl transition-all duration-500">
          <div className="absolute inset-0">
            <div
              className="parallax-image absolute inset-0 w-[120%] h-full -left-[10%]"
              style={{
                backgroundImage: `url(${project.image?.src || FALLBACK_IMAGE})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-100/40 dark:from-[#0a0a0a] dark:via-black/70 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 w-full p-8 md:p-14 z-10 flex flex-col md:flex-row justify-between md:items-end gap-6">
            <div>
              <p className="text-sm font-medium text-primary tracking-widest mb-3 uppercase">
                Systems Engineering
              </p>
              <h3 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight leading-none">
                {project.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="text-zinc-500 dark:text-white/30 text-2xl font-medium tracking-widest uppercase">
                View Specs
              </span>
              <div className="text-zinc-900/20 dark:text-white/20 text-7xl font-light">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      setSelectedProject(projects[newIndex]);
    }
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex < projects.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      setSelectedProject(projects[newIndex]);
    }
  }, [selectedIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const getWidth = () => container.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getWidth()}`,
          invalidateOnRefresh: true,
          pinSpacing: true,
        },
      });

      tl.to(container, {
        x: () => -getWidth(),
        ease: "none",
      });

      gsap.utils.toArray<HTMLElement>(".parallax-image").forEach((image) => {
        gsap.to(image, {
          x: "15vw",
          ease: "none",
          scrollTrigger: {
            trigger: image.parentElement?.parentElement?.parentElement,
            containerAnimation: tl,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (project: Project, index: number) => {
    setSelectedProject(project);
    setSelectedIndex(index);
  };

  return (
    <>
      <section 
        id="projects" 
        ref={sectionRef} 
        className="h-screen w-full bg-transparent overflow-hidden flex items-center relative z-10"
        aria-label="Projects section"
      >
        <div
          ref={containerRef}
          className="flex h-[80vh] items-center px-[5vw] md:px-[10vw] gap-12 md:gap-20 w-max will-change-transform"
        >
          <motion.div 
            className="flex-shrink-0 w-[80vw] md:w-[40vw] ml-4 mr-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-zinc-900 dark:text-white">
              Selected <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Works.</span>
            </h2>
            <p className="mt-8 text-zinc-600 dark:text-slate-400 text-xl md:text-3xl font-light max-w-lg leading-relaxed">
              A curated deeply interactive exploration of {projects.length} platform architectures.
              <br /><br />
              <span className="text-primary text-base tracking-widest uppercase font-medium">Click Any Card to Analyze Specs</span>
            </p>
          </motion.div>

          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              onClick={() => handleCardClick(project, index)}
            />
          ))}

          <div className="flex-shrink-0 w-[15vw]" />
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)}
            onPrev={handlePrev}
            onNext={handleNext}
            hasPrev={selectedIndex > 0}
            hasNext={selectedIndex < projects.length - 1}
            projectIndex={selectedIndex}
            totalProjects={projects.length}
          />
        )}
      </AnimatePresence>
    </>
  );
}
