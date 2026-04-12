"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      // Set initial states explicitly to avoid Tailwind conflicts
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], {
        opacity: 0,
        y: 50
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });

      tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 1 })
        .to(text1Ref.current, { opacity: 0, y: -50, duration: 1 }, "+=0.5")
        .to(text2Ref.current, { opacity: 1, y: 0, duration: 1 })
        .to(text2Ref.current, { opacity: 0, y: -50, duration: 1 }, "+=0.5")
        .to(text3Ref.current, { opacity: 1, y: 0, duration: 1 })
        .to(text3Ref.current, { opacity: 0, y: -50, duration: 1 }, "+=1")
        .to({}, { duration: 1 }); // Force extra pin duration before unpinning

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div className="absolute w-full px-6 flex justify-center text-center max-w-4xl z-10 pointer-events-none">
        <h2
          ref={text1Ref}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white absolute"
        >
          AI should <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Empower </span>, not replace. <br /><br />
          Code must be <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Intentional.</span>
        </h2>
        <h2
          ref={text2Ref}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white absolute"
        >
          Efficiency is the <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">ultimate UI.</span>
          <br /><br />
          Comfort of use is the <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">ultimate UX.</span>
        </h2>
        <h2
          ref={text3Ref}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white absolute"
        >
          Knowledge holds no value if not <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Shared.</span>
          <br /><br />
          I learn so I can <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Share  Better.</span>
        </h2>
      </div>
    </section>
  );
}
