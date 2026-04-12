"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        skewY: 7,
      }).from(
        ".arrow-icon",
        {
          y: -20,
          opacity: 0,
          duration: 1,
        },
        "-=0.5"
      );

      // Bouncing arrow animation
      gsap.to(".arrow-icon", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-20"
    >
      <div className="flex flex-col items-center justify-center text-center w-full z-10">
        <div className="overflow-hidden mb-2">
          <p className="reveal-text text-primary text-sm md:text-base tracking-[0.3em] uppercase font-medium">
            {personalInfo.role}
          </p>
        </div>
        <div className="overflow-hidden mb-6 py-2">
          <h1 className="reveal-text text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-zinc-900 dark:text-white">
            {personalInfo.name}
          </h1>
        </div>
        <div className="overflow-hidden max-w-2xl">
          <p className="reveal-text text-zinc-600 dark:text-slate-400 text-lg md:text-2xl leading-relaxed font-light">
            {personalInfo.tagline}
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <ArrowDown className="arrow-icon text-zinc-900/40 dark:text-white/50 w-8 h-8" strokeWidth={1} />
      </div>
    </section>
  );
}
