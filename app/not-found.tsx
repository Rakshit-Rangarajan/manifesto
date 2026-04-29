"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Terminal, ShieldAlert } from "lucide-react";

const GLITCH_CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

function useGlitchText(text: string, isActive: boolean = true) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isActive) return;
    
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => 
        prev.split("")
          .map((char, index) => {
            if (index < iterations) return text[index];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }
      
      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, isActive]);

  return displayText;
}

export default function NotFound() {
  const [bootSequence, setBootSequence] = useState(0);
  const titleText = useGlitchText("FATAL_ERROR: 404", bootSequence >= 1);
  const descText = useGlitchText("SYSTEM_ORPHANED. CONNECTION_REFUSED.", bootSequence >= 2);
  const codeText = useGlitchText("MEMORY_DUMP: 0x000F44A", bootSequence >= 3);

  useEffect(() => {
    // Staggered boot sequence
    const t1 = setTimeout(() => setBootSequence(1), 500);
    const t2 = setTimeout(() => setBootSequence(2), 1500);
    const t3 = setTimeout(() => setBootSequence(3), 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-[#050505] text-[#00ff41] font-mono flex flex-col items-center justify-center overflow-hidden relative">
      
      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      
      {/* Cryptic Background Geometry */}
      <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
        <div className="w-[150vw] h-[150vw] md:w-[60vw] md:h-[60vw] border-[1px] border-[#00ff41] rounded-full animate-[spin_20s_linear_infinite] opacity-30" />
        <div className="absolute w-[180vw] h-[180vw] md:w-[80vw] md:h-[80vw] border-[1px] border-[#00ff41] border-dashed rounded-full animate-[spin_30s_linear_infinite_reverse] opacity-20" />
        <div className="absolute w-[120vw] h-[120vw] md:w-[40vw] md:h-[40vw] border-[1px] border-red-500 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20" />
      </div>

      <div className="z-10 flex flex-col items-start max-w-4xl w-full px-6 md:px-20 mix-blend-screen">
        
        <div className="flex items-center gap-4 text-red-500 mb-8 animate-pulse">
          <ShieldAlert size={48} />
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter">
            {bootSequence >= 1 ? titleText : ""}
          </h1>
        </div>

        <div className="space-y-4 mb-16 border-l-2 border-[#00ff41]/50 pl-6 py-4">
          <p className="text-xl md:text-3xl text-zinc-300">
            {bootSequence >= 2 ? descText : ""}
          </p>
          <p className="text-lg md:text-xl text-zinc-500 opacity-80">
            {bootSequence >= 3 ? codeText : ""}
          </p>
          
          {bootSequence >= 3 && (
            <div className="mt-8 text-sm md:text-base text-zinc-600 space-y-1">
              <p>{"> Attempting structural bypass... FAILED"}</p>
              <p>{"> Restoring primary layout nodes... CORRUPTED"}</p>
              <p className="text-red-500/80">{"> WARNING: Matrix collapse imminent."}</p>
            </div>
          )}
        </div>

        {bootSequence >= 3 && (
          <Link 
            href="/"
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-transparent border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all duration-300"
          >
            <Terminal size={20} className="group-hover:animate-bounce" />
            <span className="font-bold tracking-widest uppercase">Initiate Mainframe Reboot</span>
          </Link>
        )}
      </div>

      {/* Decorative Glitch Bar */}
      <div className="absolute top-0 w-full h-[2px] bg-red-500 animate-[pulse_2s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 w-full h-[2px] bg-[#00ff41] animate-[pulse_3s_ease-in-out_infinite]" />
      
    </div>
  );
}
