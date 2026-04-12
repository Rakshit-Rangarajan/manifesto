"use client";

import React, { useEffect, useState, RefObject } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export const ScrollProgress = ({ containerRef }: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-emerald-400 to-primary z-[100] origin-left"
      style={{ scaleX }}
    />
  );
};
