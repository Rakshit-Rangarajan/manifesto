"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;
    
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        getComputedStyle(target).cursor === "pointer" || 
        target.closest('a, button, input, textarea, [role="button"], .cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trailing dots */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-1 h-1 rounded-full bg-primary/30 pointer-events-none z-[99998]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            opacity: isHovering ? [0.5, 0.8, 0.5] : [0.2, 0.5, 0.2],
            scale: isHovering ? [1, 1.5, 1] : [0.5, 1, 0.5],
          }}
          transition={{
            duration: isHovering ? 0.5 : 1.5,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full border-2 border-primary/50 pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isClicking ? 40 : isHovering ? 60 : 48,
          height: isClicking ? 40 : isHovering ? 60 : 48,
          borderColor: isHovering 
            ? "rgba(0, 212, 255, 0.8)" 
            : "rgba(0, 212, 255, 0.3)",
          borderWidth: isHovering ? 2 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-white pointer-events-none z-[100000] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isClicking ? 6 : isHovering ? 12 : 8,
          height: isClicking ? 6 : isHovering ? 12 : 8,
          backgroundColor: isHovering ? "#00d4ff" : "#ffffff",
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Glow effect */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[99997]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [0.5, 1.5, 2],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/50 to-transparent blur-xl" />
        </motion.div>
      )}
    </>
  );
}
