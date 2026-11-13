"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import type { ReactNode } from "react";

interface LenisProviderProps {
  children: ReactNode;
}

/** Native wheel/touch scrolling for responsive input; decorative animations
 * observe scroll position without controlling it. */
export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: false,
      syncTouch: false,
    });

    // Preserve the existing optional integration for other components.
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
      cancelAnimationFrame(rafId);
      // @ts-ignore
      delete window.lenis;
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
