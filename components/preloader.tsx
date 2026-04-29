"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRELOADER_STYLE = "terminal"; // Options: terminal | matrix | neural | glitch | retro

const terminalCommands = [
  "> initializing core systems...",
  "> loading AI models...",
  "> compiling neural pathways...",
  "> establishing secure connections...",
  "> calibration complete",
];

const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    setMounted(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(100);
      setTimeout(() => setLoading(false), 100);
      return;
    }

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const duration = 2500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "auto";
        }, 800);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (PRELOADER_STYLE !== "terminal") return;

    const interval = setInterval(() => {
      if (currentLine < terminalCommands.length) {
        setDisplayedLines(prev => [...prev, terminalCommands[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [currentLine]);

  if (!mounted || !loading) {
    return null;
  }

  if (PRELOADER_STYLE === "terminal") {
    return <TerminalPreloader progress={progress} displayedLines={displayedLines} />;
  }
  if (PRELOADER_STYLE === "matrix") {
    return <MatrixPreloader progress={progress} />;
  }
  if (PRELOADER_STYLE === "neural") {
    return <NeuralPreloader progress={progress} />;
  }
  if (PRELOADER_STYLE === "glitch") {
    return <GlitchPreloader progress={progress} />;
  }
  if (PRELOADER_STYLE === "retro") {
    return <RetroPreloader progress={progress} />;
  }

  return null;
}

function TerminalPreloader({ progress, displayedLines }: { progress: number; displayedLines: string[] }) {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center"
    >
      <div className="w-full max-w-2xl mx-4 font-mono text-sm">
        <div className="bg-[#111] border border-zinc-800 rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-zinc-800">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-zinc-500 text-xs">rakshit@portfolio ~</span>
          </div>

          <div className="p-6 min-h-[300px]">
            <div className="space-y-1">
              {displayedLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-primary"
                >
                  {line}
                  {i === displayedLines.length - 1 && (
                    <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
                  )}
                </motion.div>
              ))}
            </div>

            {progress < 100 && (
              <div className="mt-8 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <span>Progress:</span>
                  <div className="flex-1 h-2 bg-zinc-800 rounded overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-center text-zinc-600 text-xs">
          <span>System ready. Press </span>
          <kbd className="px-2 py-1 bg-zinc-800 rounded text-zinc-400">Enter</kbd>
          <span> to continue...</span>
        </div>
      </div>
    </motion.div>
  );
}

function MatrixPreloader({ progress }: { progress: number }) {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    const cols = Array(Math.floor(window.innerWidth / 20)).fill(0).map(() => Math.random() * -500);
    setColumns(cols);
  }, []);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30">
        {columns.map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xs font-mono"
            style={{ left: i * 20 }}
            initial={{ y: -500 }}
            animate={{ y: 1000 }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {Array(50).fill(0).map((_, j) => (
              <span
                key={j}
                style={{
                  color: j < 10 ? '#00ff00' : j < 20 ? '#00cc00' : '#008800',
                  textShadow: j < 10 ? '0 0 10px #00ff00' : 'none',
                }}
              >
                {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
              </span>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#00ff00] tracking-widest" style={{ textShadow: '0 0 20px #00ff00' }}>
            RAKSHIT
          </h1>
          <p className="mt-4 text-[#00ff00]/60 text-sm font-mono">
            {Math.round(progress)}% INITIALIZED
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function NeuralPreloader({ progress }: { progress: number }) {
  const nodes = Array(12).fill(0).map((_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    y: 20 + Math.random() * 60,
  }));

  const connections: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.random() > 0.6) {
        connections.push([i, j]);
      }
    }
  }

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[9999] bg-[#050510] flex items-center justify-center"
    >
      <svg className="absolute inset-0 w-full h-full">
        {connections.map(([i, j], idx) => (
          <motion.line
            key={idx}
            x1={`${nodes[i].x}%`}
            y1={`${nodes[i].y}%`}
            x2={`${nodes[j].x}%`}
            y2={`${nodes[j].y}%`}
            stroke="url(#neuralGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, delay: idx * 0.1 }}
          />
        ))}
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Rakshit<span className="text-primary">.ai</span>
          </h1>
          <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-zinc-500 text-xs">Neural pathways: {Math.round(progress)}%</p>
        </div>
      </div>
    </motion.div>
  );
}

function GlitchPreloader({ progress }: { progress: number }) {
  const [text, setText] = useState("RAKSHIT");
  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  useEffect(() => {
    if (progress < 50) {
      const interval = setInterval(() => {
        setText(
          "RAKSHIT".split("").map((char, i) =>
            Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
          ).join("")
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [progress]);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{
        x: "100%",
        filter: "blur(10px)",
        transition: { duration: 0.4 }
      }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
    >
      <div className="relative">
        <motion.h1
          className="text-6xl md:text-9xl font-bold text-white relative"
          animate={{
            x: [0, -5, 5, -3, 3, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          {text}
          <span className="absolute inset-0 text-primary opacity-0 animate-ping">RAKSHIT</span>
        </motion.h1>

        <div className="absolute -inset-4 bg-primary/20 blur-3xl" />

        <div className="mt-8 flex justify-center">
          <div className="w-64 h-2 bg-zinc-800 overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ x: "-100%" }}
              animate={{ x: `${progress - 100}%` }}
            />
          </div>
        </div>

        <p className="mt-4 text-center text-zinc-500 text-sm tracking-widest">
          {Math.round(progress) < 30 && "SYSTEM CORRUPTED"}
          {Math.round(progress) >= 30 && Math.round(progress) < 70 && "REPAIRING..."}
          {Math.round(progress) >= 70 && "RESTORING..."}
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-scanline opacity-10" />
      </div>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .bg-scanline {
          background: linear-gradient(to bottom, transparent 50%, rgba(0,255,255,0.1) 50%);
          background-size: 100% 4px;
          animation: scanline 8s linear infinite;
        }
      `}</style>
    </motion.div>
  );
}

function RetroPreloader({ progress }: { progress: number }) {
  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{
        scale: 0.8,
        opacity: 0,
        transition: { duration: 0.5 }
      }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 tracking-wider" style={{
            textShadow: '4px 4px 0 #ff0000, -2px -2px 0 #0000ff',
            fontFamily: 'monospace'
          }}>
            PRESS START
          </h1>
        </motion.div>

        <motion.div
          className="mt-8 text-green-500 font-mono text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          INSERT COIN
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-64 h-4 border-2 border-white rounded overflow-hidden">
            <motion.div
              className="h-full bg-green-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-white text-xs font-mono">LOADING: {Math.round(progress)}%</p>
        </motion.div>

        <motion.div
          className="mt-16 flex gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white"
              animate={{
                opacity: progress > i * 20 ? 1 : 0.3,
                scale: progress > i * 20 ? 1 : 0.8,
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </motion.div>
      </div>

      <motion.p
        className="absolute bottom-8 text-zinc-600 text-xs font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © {new Date().getFullYear()} RAKSHIT • ALL RIGHTS RESERVED
      </motion.p>
    </motion.div>
  );
}
