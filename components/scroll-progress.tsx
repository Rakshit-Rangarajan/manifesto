"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const sections = [
  { id: "hero", label: "Hero", hideCounter: true },
  { id: "about", label: "About" },
  { id: "manifesto", label: "Manifesto" },
  { id: "projects", label: "Projects" },
  { id: "ai-tools", label: "AI Tools" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Academic Rigors" },
  { id: "achievements", label: "Achievements" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Let's Collaborate", hideCounter: true },
];

const visibleSections = sections.filter(s => !s.hideCounter);

export default function ScrollProgress() {
  const [currentSection, setCurrentSection] = useState(sections[0]);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  
  const currentIndex = visibleSections.findIndex(s => s.id === currentSection.id);
  const sectionNumber = currentIndex >= 0 ? currentIndex + 1 : 0;
  
  const shouldShow = !currentSection.hideCounter;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.25;
          
          if (isVisible) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  if (!mounted || !shouldShow) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 z-[99999] pointer-events-none">
        <motion.div
          className="h-full"
          style={{
            width: `${(sectionNumber / visibleSections.length) * 100}%`,
            background: isDark 
              ? "linear-gradient(90deg, hsl(191 91% 56%), hsl(160 84% 50%))"
              : "linear-gradient(90deg, hsl(25 95% 50%), hsl(15 85% 45%))",
            boxShadow: isDark 
              ? "0 0 20px hsl(191 91% 56% / 0.5)"
              : "0 0 25px hsl(25 90% 50% / 0.5)",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-[9999] flex flex-col items-center gap-4"
        >
          <div className="relative flex items-center justify-center">
            <svg className="w-20 h-20" viewBox="0 0 72 72">
              <circle
                cx="36"
                cy="36"
                r="30"
                fill={isDark ? "rgba(0,0,0,0.5)" : "hsl(40 30% 96%)"}
                stroke={isDark ? "rgba(255,255,255,0.15)" : "hsl(40 20% 80%)"}
                strokeWidth="2"
              />
              <motion.circle
                cx="36"
                cy="36"
                r="30"
                fill="none"
                stroke="url(#sectionGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 30}
                initial={{ strokeDashoffset: 2 * Math.PI * 30 }}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 30 * (1 - sectionNumber / visibleSections.length),
                }}
                transition={{ duration: 0.5 }}
              />
              <defs>
                <linearGradient id="sectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isDark ? "#00d4ff" : "#ff7b00"} />
                  <stop offset="100%" stopColor={isDark ? "#00ff88" : "#ff5c00"} />
                </linearGradient>
              </defs>
            </svg>
            <motion.div
              key={currentSection.label}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={`absolute text-2xl font-bold ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              {sectionNumber}
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs uppercase tracking-widest ${
              isDark ? "text-white/60" : "text-slate-500"
            }`}
          >
            {currentSection.label}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </>
  );
}