"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { X, Compass } from "lucide-react";

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "AI Lab", href: "#ai-lab" },
  { label: "Education", href: "#education" },
  { label: "Blog", href: "/blogs" },
  { label: "Contact", href: "#contact" },
];

function RRMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-11 w-11" role="img" aria-label="Rakshit Rangarajan mirrored R hexagon logo">
      <path d="M32 3 57 17.5v29L32 61 7 46.5v-29Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M15 45V20h10c12 0 12 14 0 14H15m10 0 9 11" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M49 45V20H39c-12 0-12 14 0 14h10m-10 0-9 11" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onHash = () => {
      const match = links.find(link => link.href === window.location.hash);
      if (match) setActive(match.label);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* No top navigation bar: the brand floats independently. */}
      <a href="/#hero" aria-label="Back to portfolio home" className="fixed top-5 left-5 md:top-8 md:left-8 z-[160] text-foreground/85 hover:text-primary transition-colors drop-shadow-[0_0_14px_rgba(120,120,255,0.2)]">
        <RRMark />
      </a>

      {/* A discreet, floating left-edge island replaces the conventional navbar. */}
      <aside aria-label="Portfolio navigation" className="fixed left-2 md:left-4 top-1/2 -translate-y-1/2 z-[150] flex flex-col items-center gap-3 rounded-full border border-white/10 bg-zinc-950/25 dark:bg-zinc-950/30 backdrop-blur-xl px-2 py-4 shadow-xl transition-opacity duration-300 opacity-45 hover:opacity-100 focus-within:opacity-100">
        <button type="button" onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open} aria-controls="island-navigation" className="grid h-10 w-10 place-items-center rounded-full text-foreground hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          <Compass size={21} strokeWidth={1.5} />
        </button>
        <div className="h-px w-5 bg-foreground/20" />
        {links.filter((_, i) => [0, 1, 2, 3, 8].includes(i)).map(link => (
          <a key={link.label} href={link.href} onClick={() => setActive(link.label)} aria-label={link.label} title={link.label} className="group relative grid h-7 w-7 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            <span className={`block h-1.5 w-1.5 rotate-45 border border-current transition-all group-hover:scale-150 ${active === link.label ? "bg-primary text-primary" : "bg-transparent text-foreground/60"}`} />
            <span className="pointer-events-none absolute left-10 whitespace-nowrap rounded-md bg-background/90 px-3 py-1.5 text-xs text-foreground opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">{link.label}</span>
          </a>
        ))}
      </aside>

      <div className="fixed right-4 bottom-5 md:right-8 md:bottom-8 z-[150] rounded-full border border-foreground/10 bg-background/30 backdrop-blur-lg">
        <ThemeToggle />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div id="island-navigation" role="dialog" aria-modal="true" aria-label="Portfolio sections" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[170] bg-background/95 backdrop-blur-2xl flex items-center justify-center p-8">
            <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)} className="absolute top-6 right-6 rounded-full p-3 border border-foreground/20 text-foreground"><X /></button>
            <nav className="flex max-h-[80vh] overflow-y-auto flex-col items-center gap-3">
              {links.map((link, i) => (
                <motion.a key={link.label} href={link.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .04 }} onClick={() => { setActive(link.label); setOpen(false); }} className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground/75 hover:text-primary focus-visible:text-primary transition-colors">
                  <span className="mr-3 font-mono text-xs text-primary/70">{String(i + 1).padStart(2, "0")}</span>{link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
