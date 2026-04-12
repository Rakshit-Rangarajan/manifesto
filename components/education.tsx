"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ExternalLink, Github, RotateCw, X } from "lucide-react";
import { useModalContext } from "./ModalContext";
import { ScrollProgress } from "./ScrollProgress";
import { useRef } from "react";

const educationData = [
  {
    id: 1,
    degree: "Master of Science in Artificial Intelligence",
    institution: "Cardiff University (Prifysgol Caerdydd)",
    location: "Cardiff, UK",
    period: "2024 - 2025",
    logo: "/logos/Cardiff_University_logo.png",
    gpa: "First Class with Merit",
    coursework: ["Deep Learning", "Natural Language Processing", "Neural Network Architectures", "Haskell Code", "Computer Vision", "Reinforcement Learning", "Probabilistic Machine Learning", "Advanced AI", "Research Methodology"],
    achievements: ["2nd Runner-up - Cardiff NLP Hackathon", "Research Paper Presentation - SayCymraeg"],
    dissertation: {
      title: "Say Cymraeg",
      imageSrc: "/SayCymraeg.png",
      problem: "Welsh learners lacked an intuitive, AI-powered tool that could adapt to individual learning paces and provide interactive language practice.",
      solution: "Built an easy-to-use web app with an AI assistant powered by Ollama that tailors lessons to each learner's pace, with Firebase for real-time data sync.",
      features: ["AI-powered language tutor", "Personalized learning paths", "Real-time progress tracking", "Voice pronunciation feedback"],
      impact: "500+ active learners, 40% improvement in retention rates",
      techStack: ["Next.js", "Ollama", "Firebase", "Bootstrap"],
      github: "https://github.com/Rakshit-Rangarajan/SayCymraeg",
      live: "https://saycymraeg.rakshitr.co.in"
    }
  },
  {
    id: 2,
    degree: "Bachelor of Engineering, Information Science",
    institution: "Rajeev Institute of Technology (VTU)",
    location: "Hassan, India",
    period: "2018 - 2022",
    logos: ["/logos/RIT_Hassan_logo.jpg", "/logos/VTU_logo.png"],
    gpa: "First Class",
    coursework: ["Data Structures", "Algorithms", "DBMS", "Operating Systems", "Computer Networks", "Machine Learning", "Software Engineering"],
    achievements: ["Recognition for active participatgion in the College GLUG", "Honorable Mentions for Best Planned and Executed Dissertation Project", "Well recognised for contributions in weekend sessions organised for Students", "Delivered Various lectures and led planning and execution of various events for the club", "Contributed Significantly in the planning of the college fest, Designed Posters, Banners for the department and Organised the various events not limited to Singing, Pick and Speak Competitions"],
    dissertation: {
      title: "Agro-Fresh Organics",
      imageSrc: "/Agri-Fresh-Organics.png",
      problem: "Farmers lacked a direct-to-consumer platform to sell their produce, relying on middlemen that reduced their profit margins.",
      solution: "Built an easy-to-use e-commerce website enabling farmers to list produce and buyers to purchase fresh commodities directly, with PHP/MySQL backend.",
      features: ["Farmer seller dashboard", "Real-time inventory management", "Secure payment gateway", "Order tracking system"],
      impact: "50+ farmers onboarded, 30% revenue increase for users",
      techStack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
      github: "https://github.com/Rakshit-Rangarajan/Agro-Fresh-Organics",
      live: null
    }
  }
];


const EducationModal = ({ isOpen, onClose, dissertation, imageSrc, index }: { isOpen: boolean; onClose: () => void; dissertation: any; imageSrc: string; index: number }) => {
  const { setIsAnyModalOpen } = useModalContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsAnyModalOpen(isOpen);
    return () => setIsAnyModalOpen(false);
  }, [isOpen, setIsAnyModalOpen]);

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
                <div className="flex items-center gap-2 mb-2">
                  <RotateCw size={14} className="text-primary" />
                  <span className="text-primary text-xs font-medium tracking-widest uppercase">Capstone Project</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-zinc-900 dark:text-white">{dissertation.title}</h3>
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
              className="flex-1 overflow-y-auto"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 min-h-[300px]">
                  <img
                    src={imageSrc}
                    alt={dissertation.title}
                    className="w-full h-full max-h-[400px] object-contain"
                  />
                </div>

                <div className="lg:w-1/2 p-8 lg:p-10 space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-wider">The Problem</h4>
                    <p className="text-zinc-600 dark:text-slate-400 leading-relaxed">{dissertation.problem}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-wider">The Solution</h4>
                    <p className="text-zinc-600 dark:text-slate-400 leading-relaxed">{dissertation.solution}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-wider">Key Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {dissertation.features.map((feature: string) => (
                        <span key={feature} className="px-3 py-1.5 bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-full text-xs font-medium text-zinc-600 dark:text-slate-300">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-wider">Impact</h4>
                    <p className="text-zinc-600 dark:text-slate-400">{dissertation.impact}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-wider">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {dissertation.techStack.map((tech: string) => (
                        <span key={tech} className="px-3 py-1.5 bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-full text-xs font-medium text-zinc-600 dark:text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                    {dissertation.github && (
                      <button
                        onClick={() => window.open(dissertation.github, "_blank")}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 font-medium transition-colors text-sm"
                      >
                        <Github size={16} />
                        Code
                      </button>
                    )}
                    {dissertation.live && (
                      <button
                        onClick={() => window.open(dissertation.live, "_blank")}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black hover:scale-105 font-medium transition-transform text-sm"
                      >
                        <ExternalLink size={16} />
                        Demo
                      </button>
                    )}
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

const EducationCard = ({ edu, index }: { edu: any; index: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <EducationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dissertation={edu.dissertation}
        imageSrc={index === 0 ? "/SayCymraeg.png" : "/Agri-Fresh-Organics.png"}
        index={index}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
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
            {/* Left Column */}
            <div className="xl:w-1/3 flex flex-col items-start">
              <div className="flex gap-3 mb-8">
                {edu.logo && (
                  <div className="w-16 h-16 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center p-2 shadow-lg border border-black/10 dark:border-white/10 shrink-0">
                    <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain" />
                  </div>
                )}
                {edu.logos && edu.logos.map((logo: string, i: number) => (
                  <div key={i} className="w-16 h-16 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center p-2 shadow-lg border border-black/10 dark:border-white/10 shrink-0">
                    <img src={logo} alt={i === 0 ? "RIT" : "VTU"} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
              <span className="text-sm md:text-base text-primary font-medium tracking-widest uppercase mb-4">
                {edu.period}
              </span>
              <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4">
                {edu.degree}
              </h3>
              <p className="text-2xl text-zinc-500 dark:text-slate-500 font-light">
                {edu.institution}
              </p>
              <p className="text-lg text-zinc-400 dark:text-slate-600 font-medium tracking-widest uppercase mt-2">
                {edu.location}
              </p>
            </div>

            {/* Right Column */}
            <div className="xl:w-2/3 flex flex-col justify-center h-full space-y-8">
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-gradient-to-r from-primary/20 to-emerald-400/20 text-zinc-900 dark:text-white rounded-full text-sm font-semibold">
                  {edu.gpa}
                </span>
              </div>

              <div>
                <h5 className="text-sm font-bold text-zinc-900 dark:text-white mb-3 uppercase tracking-wider">Key Coursework</h5>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course: string) => (
                    <span key={course} className="px-3 py-1.5 bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-full text-xs font-medium text-zinc-600 dark:text-slate-300">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-sm font-bold text-zinc-900 dark:text-white mb-3 uppercase tracking-wider">Achievements</h5>
                <ul className="space-y-2">
                  {edu.achievements.map((ach: string, i: number) => (
                    <li key={i} className="text-sm text-zinc-600 dark:text-slate-400 flex items-start gap-2">
                      <span className="text-primary">✦</span>
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-black/10 dark:border-white/10" onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                  <span>View Capstone Project</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const Education = () => {
  return (
    <section id="education" className="relative z-20 bg-zinc-50/50 dark:bg-[#0a0a0a]/50 w-full min-h-screen py-32 md:py-48 px-6 md:px-20 border-t border-black/5 dark:border-white/5">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col items-start gap-12 lg:gap-24">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-sm md:text-base font-medium tracking-widest uppercase mb-4">
            Foundations
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-[1.1]">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Rigors.</span>
          </h2>
          <p className="mt-6 text-xl text-zinc-600 dark:text-slate-400 max-w-2xl">
            The foundation of my engineering discipline and theoretical computations.
          </p>
        </motion.div>

        <div className="w-full flex flex-col gap-8">
          {educationData.map((edu, index) => (
            <EducationCard key={edu.id} edu={edu} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;
