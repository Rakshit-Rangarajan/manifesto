"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import type { ReactNode } from "react";

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      // Keep touch scrolling native: mobile browsers already provide momentum.
      syncTouch: false,
      syncTouch: false,
    });

    // @ts-ignore
    window.lenis = lenis;

    let rafId = 0;
    let running = true;
    function raf(time: number) {
      if (!running) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      running = false;
      // @ts-ignore
      delete window.lenis;
      running = false;
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
