"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const mobileNavLinks = [
  { id: "01", label: "About", href: "#about", comment: "// Who I am" },
  { id: "02", label: "Projects", href: "#projects", comment: "// My work" },
  { id: "03", label: "Skills", href: "#skills", comment: "// Tech stack" },
  { id: "04", label: "Experience", href: "#experience", comment: "// Professional journey" },
  { id: "05", label: "Education", href: "#education", comment: "// Learning path" },
  { id: "06", label: "Blog", href: "/blogs", comment: "// Thoughts & ideas" },
  { id: "07", label: "Achievements", href: "#achievements", comment: "// Milestones" },
  { id: "08", label: "Certificates", href: "#certificates", comment: "// Qualifications" },
  { id: "09", label: "Contact", href: "#contact", comment: "// Get in touch" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 transition-all duration-300 pointer-events-none ${isMenuOpen ? "z-[150]" : "z-50"}`}>
        <nav className="w-full px-6 md:px-20 py-6 flex items-center justify-between pointer-events-auto">
          {/* Logo */}
          <a href="#" className="group" onClick={() => setIsMenuOpen(false)}>
            <img 
              src="/images/RR_Logo.png" 
              alt="RR Logo" 
              className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </a>

          <div className="flex items-center gap-4 relative z-[160]">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              key={isMenuOpen ? "close" : "open"} // Force re-render for clean icon swap
              className={`p-3 rounded-full transition-all border pointer-events-auto shadow-lg ${
                isMenuOpen 
                  ? "bg-zinc-900 border-zinc-700 text-white" 
                  : "bg-background/80 backdrop-blur-md border-border text-foreground"
              }`}
            >
              {isMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center p-6"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="w-full max-w-4xl flex flex-col gap-2 md:gap-4 relative z-[110]"
            >
              {mobileNavLinks.map((link) => (
                <motion.div
                  key={link.id}
                  variants={itemVariants}
                  className="group flex items-center gap-4 md:gap-8 hover:translate-x-4 transition-transform duration-300"
                >
                  <a
                    href={link.href}
                    onClick={() => {
                        setIsMenuOpen(false);
                        // Force a small delay if needed or just handle the navigation
                    }}
                    className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 w-full p-2"
                  >
                    <div className="flex items-baseline gap-4 md:gap-8">
                      <span className="font-mono text-xs md:text-sm text-muted-foreground/70">
                        {link.id}
                      </span>
                      <span className="text-3xl md:text-6xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors uppercase">
                        {link.label}
                      </span>
                    </div>
                    <span className="font-mono text-xs md:text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {link.comment}
                    </span>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
