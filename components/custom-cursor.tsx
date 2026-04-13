"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useTheme } from "next-themes";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Outer smoothing for trailing effect
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
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
      {/* Subtle Blue Glow Trail */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99997]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ 
          opacity: isHovering ? 0.3 : 0.15,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 rounded-full bg-[#1E88E5] blur-xl" />
      </motion.div>

      {/* Main Sci-Fi Geometric Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100000]"
        style={{ 
          x: cursorX, 
          y: cursorY,
          marginLeft: "-7px",  // Offset tip to match mouse coordinates
          marginTop: "-2px",
        }}
        animate={{
          scale: isClicking ? 0.9 : isHovering ? 1.05 : 1,
          rotate: isHovering ? 5 : 0, 
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <svg 
          width="48" height="48" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className={`overflow-visible transition-all duration-300 ${
            currentTheme === 'light' 
              ? 'drop-shadow-[0_0_12px_rgba(255,140,0,0.6)]' 
              : 'drop-shadow-[0_0_12px_rgba(0,229,255,0.6)]'
          }`}
        >
          <defs>
            {/* Dark Mode Gradients */}
            <linearGradient id="cyanGrad_dark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#75F9FF" />
              <stop offset="100%" stopColor="#00B4D8" />
            </linearGradient>
            <linearGradient id="blueGrad_dark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2A88FF" />
              <stop offset="100%" stopColor="#0050B3" />
            </linearGradient>
            
            {/* Light Mode Gradients (Warm Amber/Terracotta) */}
            <linearGradient id="cyanGrad_light" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFB347" />
              <stop offset="100%" stopColor="#FF7B00" />
            </linearGradient>
            <linearGradient id="blueGrad_light" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF7A59" />
              <stop offset="100%" stopColor="#C83E20" />
            </linearGradient>
          </defs>
          
          {/* Main Blue/Terracotta Body */}
          <motion.polygon 
            points="28,15 75,40 65,55 55,78 40,73 45,50 35,55 25,50 28,15"
            fill={currentTheme === 'light' ? "url(#blueGrad_light)" : "url(#blueGrad_dark)"} 
          />
          
          {/* Inner Shadows for 3D depth */}
          <polygon 
            points="45,50 50,48 44,71 40,73" 
            fill={currentTheme === 'light' ? "#50150A" : "#0A2C60"} 
            opacity="0.8" 
          />
          <polygon 
            points="35,55 38,51 50,48 45,50" 
            fill={currentTheme === 'light' ? "#3D0F06" : "#061F4D"} 
            opacity="0.8" 
          />
          
          {/* Cyan/Amber Left Edge */}
          <motion.polygon 
            points="15,5 28,15 25,50 35,55 30,68 12,60"
            fill={currentTheme === 'light' ? "url(#cyanGrad_light)" : "url(#cyanGrad_dark)"} 
          />
          
          {/* Geometric Accents */}
          {/* Bottom-left diamond */}
          <motion.polygon 
            points="22,75 32,79 28,89 18,85" 
            fill={currentTheme === 'light' ? "#0A2C60" : "#FFDE0A"}
            animate={{ 
               x: isHovering ? -2 : 0,
               y: isHovering ? 2 : 0,
               opacity: isHovering ? 1 : 0.8 
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
          
          {/* Bottom-right chevron */}
          <motion.polygon 
            points="48,82 58,92 72,80 66,74 58,82 52,76" 
            fill={currentTheme === 'light' ? "#0A2C60" : "#FFDE0A"}
            animate={{ 
               x: isHovering ? 2 : 0,
               y: isHovering ? 3 : 0,
               opacity: isHovering ? 1 : 0.8 
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.05 }}
          />
          
          {/* Right diamond */}
          <motion.polygon 
            points="80,45 90,50 85,60 75,55" 
            fill={currentTheme === 'light' ? "#0A2C60" : "#FFDE0A"}
            animate={{ 
               x: isHovering ? 3 : 0,
               y: isHovering ? -1 : 0,
               opacity: isHovering ? 1 : 0.8 
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
          />
        </svg>
      </motion.div>
    </>
  );
}
