"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useModalContext } from "./ModalContext";

const GLITCH_CHARS = "!<>-_\\\/[]{}—=+*^?#________";
const LANGUAGES = ["Rakshit", "ラクシット", "रक्षित", "ரக்ஷித்", "ರಕ್ಷಿತ್"];

function useLanguageGlitch() {
  const [displayText, setDisplayText] = useState(LANGUAGES[0]);
  const [isGlitching, setIsGlitching] = useState(false);
  const langIndexRef = useRef(0);

  useEffect(() => {
    let mainInterval: NodeJS.Timeout;
    let glitchInterval: NodeJS.Timeout;
    let isActive = true;

    const runGlitch = () => {
      if (!isActive) return;
      
      setIsGlitching(true);
      const targetIndex = (langIndexRef.current + 1) % LANGUAGES.length;
      const targetText = LANGUAGES[targetIndex];
      let iterations = 0;

      glitchInterval = setInterval(() => {
        if (!isActive) {
          clearInterval(glitchInterval);
          return;
        }
        
        setDisplayText(
          targetText.split("")
            .map((char, index) => {
              if (index < iterations) return targetText[index];
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            })
            .join("")
        );

        if (iterations >= targetText.length) {
          clearInterval(glitchInterval);
          langIndexRef.current = targetIndex;
          setIsGlitching(false);
        }

        iterations += 1 / 3;
      }, 100);
    };

    runGlitch();
    mainInterval = setInterval(runGlitch, 5000);

    return () => {
      isActive = false;
      clearInterval(mainInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  return { displayText, isGlitching };
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAnyModalOpen } = useModalContext();
  const { displayText: glitchedName, isGlitching } = useLanguageGlitch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAnyModalOpen) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md border-b border-black/5 dark:border-white/5 shadow-sm dark:shadow-none"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      <nav className="w-full px-6 md:px-20 py-4 flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold tracking-widest text-zinc-900 dark:text-white flex items-center gap-4 group"
        >
          <div className={`w-10 h-10 rounded-full bg-zinc-200 dark:bg-white/10 flex items-center justify-center text-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-black ${isGlitching ? 'animate-pulse' : ''}`}>
            RR
          </div>
          <span className={`hidden sm:block font-mono w-[200px] ${isGlitching ? 'text-primary' : ''}`}>{glitchedName}</span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-zinc-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors text-sm font-medium tracking-widest uppercase"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>

        <div className="flex items-center gap-4 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-zinc-900 dark:text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-black/5 dark:border-white/5 overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-6 gap-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors text-sm font-medium tracking-widest uppercase block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
