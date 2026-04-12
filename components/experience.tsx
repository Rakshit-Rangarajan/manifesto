"use client";

import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/data/portfolio";
import { useState, useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { useModalContext } from "./ModalContext";
import { ScrollProgress } from "./ScrollProgress";
import { useRef } from "react";

interface SubProject {
  title: string;
  tech: string[];
  details: string;
}

interface ExperienceJob {
  id: number;
  role: string;
  company: string;
  companyLogo?: string;
  period: string;
  description: string[];
  subProjects?: SubProject[];
}

const ExperienceModal = ({ isOpen, onClose, job }: { isOpen: boolean; onClose: () => void; job: ExperienceJob | null }) => {
  const { setIsAnyModalOpen } = useModalContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsAnyModalOpen(isOpen);
    return () => setIsAnyModalOpen(false);
  }, [isOpen, setIsAnyModalOpen]);

  if (!job) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-10"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-50 dark:bg-[#0f0f11] rounded-3xl shadow-2xl overflow-hidden border border-black/10 dark:border-white/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <ScrollProgress containerRef={scrollRef} />
            <div className="shrink-0 z-10 bg-zinc-50 dark:bg-[#0f0f11] px-8 pt-8 pb-4 flex justify-between items-start border-b border-black/10 dark:border-white/10">
              <div>
                <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">{job.period}</p>
                <h3 className="text-2xl md:text-4xl font-bold text-zinc-900 dark:text-white">{job.role}</h3>
                <p className="text-lg text-zinc-500 dark:text-slate-400">{job.company}</p>
              </div>
              <button
                className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-900 dark:text-white transition-colors shrink-0"
                onClick={onClose}
              >
                <X size={24} />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 p-8 space-y-6 overflow-y-auto"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Key Achievement */}
              <div className="p-6 bg-gradient-to-r from-primary/10 to-emerald-400/10 rounded-2xl border border-primary/20">
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">Key Achievements</h4>
                <ul className="space-y-3">
                  {[
                    "Resolved 50+ critical vulnerabilities, achieving 100% security compliance",
                    "Led GitHub Copilot and AI adoption across the company",
                    "Trained 15+ engineers on AI tool usage with documented 10% velocity increase",
                    "Contributed to Product Enhancements and new features"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-zinc-600 dark:text-slate-400 leading-relaxed">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-3 uppercase tracking-wider">Tech Stack Used</h4>
                <div className="flex flex-wrap gap-2">
                  {["ASP.NET", "Atlassian Confluence", "Atlassian Jira", "Azure Data Factory", "Azure Services", "Batch File", "C#", "Camunda Workflow", "ChatGPT", "CSS", "Formio", "GitHub Co-Pilot", "HTML", "JAMS", "JavaScript", "Kibana Logs", "MongoDB", "MySQL", "Power Automate", "Powershell Scripts", "Snyk Vulnerabilities", "SonarQube", "Unit Test Cases [N-Unit]", "XML"].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-full text-xs font-medium text-zinc-600 dark:text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sub-projects Grid */}
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">Deployed Systems</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {job.subProjects?.map((sub: SubProject, i: number) => (
                    <div
                      key={i}
                      className="bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
                    >
                      <h5 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{sub.title}</h5>
                      <p className="text-sm text-zinc-500 dark:text-slate-400 mb-4 leading-relaxed">
                        {sub.details}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {sub.tech.map((t: string) => (
                          <span key={t} className="text-xs font-semibold tracking-wide text-zinc-600 dark:text-slate-300 bg-white dark:bg-white/5 px-2.5 py-1 rounded-md border border-black/5 dark:border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra Placeholder Content for scrolling testing */}
              <div className="pt-8 border-t border-black/10 dark:border-white/10">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">Additional Context & Impact</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-100 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                    <p className="text-zinc-600 dark:text-slate-400 leading-relaxed">Worked on Form.io Upgrade for increased secuirty and performance. The upgrade from v1 to v2 held a significant set of breaking changes which required a complete overhaul of the existing forms and workflows. The upgrade came with a lot of changes that reduced time spent for Form building, enhancements and management. The upgrade was completed successfully with minimal downtime and the new system is now running smoothly.</p>
                  </div>
                  <div className="p-4 bg-zinc-100 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                    <p className="text-zinc-600 dark:text-slate-400 leading-relaxed">Contributed significantly to the adoption of AI and AI tools in the company. Tools like GittHub Co-pilot, Cursor that would seamlessly integrate into our IDEs making them very easy to use and versatile for coders and developers. This included training of 15+ developers and helping them get better acquainted with the tools and how to use them effectively. This resulted in a 10% increase in productivity and efficiency of the development team.</p>
                  </div>
                  <div className="p-4 bg-zinc-100 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                    <p className="text-zinc-600 dark:text-slate-400 leading-relaxed">Helped the Human Resources team with the development of a new system for sending Birthday Emails to all the Employees boosting morale in the company. Power Automate workflow was crafted giving each and every employee their own personalized birthday wishes.</p>
                  </div>
                  <div className="p-4 bg-zinc-100 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                    <p className="text-zinc-600 dark:text-slate-400 leading-relaxed">Mentored a team of 6 junior Engineers, helping them adjust to company standards, conducting sessions where I solved their queries and problems, and helped them with their day to day tasks. This helped them become more confident and productive in their work.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ExperienceCard = ({ job, index }: { job: ExperienceJob; index: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={job}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="w-full relative group"
      >
        <div
          className="w-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/5 rounded-[2.5rem] p-10 md:p-16 hover:bg-zinc-100/50 dark:hover:bg-white/10 transition-colors duration-500"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          <div className="flex flex-col xl:flex-row gap-12 xl:gap-24 justify-between items-start">
            {/* Left Column: Role and Company */}
            <div className="xl:w-1/3 flex flex-col">
              <span className="text-sm md:text-base text-primary font-medium tracking-widest uppercase mb-4">
                {job.period}
              </span>
              {job.companyLogo && (
                <div className="w-14 h-14 mb-6 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center p-2 shadow-lg border border-black/10 dark:border-white/10">
                  <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain" />
                </div>
              )}
              <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4">
                {job.role}
              </h3>
              <p className="text-2xl text-zinc-500 dark:text-slate-500 font-light mb-8">
                {job.company}
              </p>

              <div className="flex items-center gap-3 mt-auto">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                >
                  <span>View Shipped Systems</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Column: Achievements */}
            <div className="xl:w-2/3 flex flex-col justify-center">
              <ul className="space-y-6">
                {job.description.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="text-lg md:text-xl text-zinc-600 dark:text-slate-300 font-light flex items-start gap-6 leading-relaxed"
                  >
                    <span className="text-primary/50 shrink-0 mt-2">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="relative z-20 bg-transparent w-full min-h-screen py-32 md:py-48 px-6 md:px-20 border-t border-black/5 dark:border-white/5">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col items-start">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-[1.1]">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">History.</span>
          </h2>
          <p className="text-xl text-zinc-600 dark:text-slate-400 max-w-2xl mb-4">
            A chronicle of my professional evolution building world-class platforms.
          </p>
          <p className="text-primary text-sm md:text-base tracking-widest uppercase font-medium">Click Any Role to View Systems Architecture</p>
        </motion.div>

        <div className="w-full flex flex-col gap-12 lg:gap-16">
          {experience.map((job, index) => (
            <ExperienceCard key={job.id} job={job} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
