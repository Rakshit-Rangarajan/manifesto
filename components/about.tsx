"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Zap, Wrench, Target, Code2, Rocket, GitBranch, Brain, Cpu, ShieldCheck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AnimatedBubble = ({ items, className, delay = 0, intervalMs = 3000 }: { items: string[], className: string, delay?: number, intervalMs?: number }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [items.length, intervalMs]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`absolute bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.15)] overflow-hidden flex justify-center items-center z-20 ${className}`}
      style={{ minWidth: "160px", height: "46px" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -25, opacity: 0 }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="text-sm text-primary font-bold tracking-wide whitespace-nowrap block absolute"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-title-line",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      gsap.fromTo(".about-card",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(".about-text-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featureCards = [
    {
      icon: Sparkles,
      bgGradient: "from-amber-500/20 to-orange-500/20",
      border: "border-amber-500/30 dark:border-amber-500/20",
      iconColor: "text-amber-600 dark:text-amber-500",
      title: "AI Native",
      desc: "Built workflows before the AI boom"
    },
    {
      icon: Zap,
      bgGradient: "from-cyan-500/20 to-blue-500/20",
      border: "border-cyan-500/30 dark:border-cyan-500/20",
      iconColor: "text-cyan-600 dark:text-cyan-500",
      title: "Vibe Code Fixer",
      desc: "I fix what AI breaks"
    },
    {
      icon: Wrench,
      bgGradient: "from-emerald-500/20 to-green-500/20",
      border: "border-emerald-500/30 dark:border-emerald-500/20",
      iconColor: "text-emerald-600 dark:text-emerald-500",
      title: "Efficiency Max",
      desc: "Minimal input, maximum output"
    },
    {
      icon: Cpu,
      bgGradient: "from-purple-500/20 to-violet-500/20",
      border: "border-purple-500/30 dark:border-purple-500/20",
      iconColor: "text-purple-600 dark:text-purple-500",
      title: "Systems Thinker",
      desc: "Architecture that scales"
    },
    {
      icon: Zap,
      bgGradient: "from-rose-500/20 to-pink-500/20",
      border: "border-rose-500/30 dark:border-rose-500/20",
      iconColor: "text-rose-600 dark:text-rose-500",
      title: "Full-Stack Ready",
      desc: "End-to-end development"
    },
    {
      icon: Brain,
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30 dark:border-blue-500/20",
      iconColor: "text-blue-600 dark:text-blue-500",
      title: "AI-First Approach",
      desc: "Smart solutions, not just code"
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="relative z-20 bg-transparent w-full min-h-[80vh] flex items-center py-32 px-6 md:px-20 border-t border-black/5 dark:border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <p className="about-text-reveal text-primary text-sm md:text-base font-medium tracking-widest uppercase text-left">
            System Origin
          </p>
          <h2 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-[1.1]">
            <span className="about-title-line block">Code with</span>
            <span className="about-title-line text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 italic mt-2 block">AI powers.</span>
          </h2>

          {/* Image and intro side by side */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Photo - Creative Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full md:w-64 shrink-0"
            >
              <div className="relative">
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-primary via-emerald-400 to-cyan-400 animate-pulse opacity-70" />
                <div className="relative rounded-[2.3rem] overflow-hidden bg-zinc-900 dark:bg-zinc-950 p-1">
                  <div className="relative rounded-[2rem] overflow-hidden bg-zinc-800 aspect-[4/5]">
                    <img
                      src="/DP.png"
                      alt="Rakshit Rangarajan"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                </div>
                {/* Floating bubbles */}
                <AnimatedBubble
                  items={["Full-Stack Dev", "Web Developer", "Application Dev"]}
                  className="-bottom-4 -right-4 md:-right-8"
                  delay={0.5}
                  intervalMs={3500}
                />
                <AnimatedBubble
                  items={["Web Designer", "UI/UX Engineer", "AI Specialist"]}
                  className="-top-4 -left-4 md:-left-8"
                  delay={0.7}
                  intervalMs={4000}
                />
              </div>
            </motion.div>

            {/* Intro text next to image */}
            <div className="flex-1">
              <p className="about-text-reveal text-lg md:text-xl text-zinc-700 dark:text-slate-400 font-light leading-relaxed text-justify">
                I'm a <strong>Full-Stack Developer</strong> who mastered the art of AI before it went mainstream.
                I don't just use AI, I weaponize it. Every repetitive task? Automated. Every boring workflow? Optimized.
                I bridge the gap between traditional engineering and modern AI capabilities, building robust systems that leverage AI without depending on it blindly.
                My background in traditional development ensures the code I ship is clean, scalable, and maintainable, while my AI expertise adds that extra layer of intelligence and automation.
              </p>
            </div>
          </div>

          {/* Feature cards - 6 columns grid */}
        </motion.div>

        {/* RIGHT COLUMN - Open to Work */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="lg:sticky lg:top-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-8"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-emerald-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Open to Work
                </span>
              </div>

              <p className="text-base text-zinc-600 dark:text-slate-400">
                Based in Bengaluru, India. Looking for <strong>Full-Stack AI / ML Engineering</strong> roles where I can build products that matter.
              </p>

              <div className="pt-2">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">
                  Why Hire Me
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-3 p-4 bg-white dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                    <Code2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-zinc-900 dark:text-white">Full-Stack + AI</span>
                      <p className="text-xs text-zinc-500 dark:text-slate-400">Can build entire products end-to-end</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                    <Rocket className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-zinc-900 dark:text-white">Shipped Products</span>
                      <p className="text-xs text-zinc-500 dark:text-slate-400">Real-world production experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                    <Brain className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-zinc-900 dark:text-white">AI-First Approach</span>
                      <p className="text-xs text-zinc-500 dark:text-slate-400">Minimizes tedious tasks, maximizes efficiency</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                    <GitBranch className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-zinc-900 dark:text-white">Problem Solver</span>
                      <p className="text-xs text-zinc-500 dark:text-slate-400">Fixes what AI breaks</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-zinc-900 dark:text-white">Quality Assurance</span>
                      <p className="text-xs text-zinc-500 dark:text-slate-400">I test my Applications and Perform Automated Testing by writing Test Cases before I ship it.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <motion.div className="lg:col-span-2 pt-12">
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`about-card p-4 rounded-2xl bg-gradient-to-br ${card.bgGradient} ${card.border}`}
              >
                <card.icon className={`w-6 h-6 ${card.iconColor} mb-2`} />
                <h4 className="font-semibold text-zinc-900 dark:text-white">{card.title}</h4>
                <p className="text-sm text-zinc-700 dark:text-slate-400">{card.desc}</p>
              </motion.div>
            ))}
          </div>
          <br />
          <p className="about-text-reveal text-base text-zinc-600 dark:text-slate-500 font-light leading-relaxed text-center">
            With an <strong>MSc in Artificial Intelligence</strong> from Cardiff University and a Bachelor's in Information Science, I bring both theoretical depth and practical experience. I've worked on enterprise-grade platforms at BrandMuscle, building mission-critical systems that handle millions of requests. I know what it takes to ship products that scale—and I know how to use AI to do it faster and better.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
