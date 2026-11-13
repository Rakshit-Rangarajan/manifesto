"use client";

import { useRef, useState } from "react";
import { Volume2 } from "lucide-react";

export default function EngineStart() {
  const [playing, setPlaying] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function start() {
    if (playing) return;
    setPlaying(true);
    // A locally licensed/owned recording can replace this preview at /audio/bmw-g310r-start-rev.mp3.
    const audio = new Audio("/audio/bmw-g310r-start-rev.mp3");
    audioRef.current = audio;
    try {
      await audio.play();
      audio.onended = () => setPlaying(false);
      return;
    } catch {
      // Until a recording is supplied, play an original synthesized engine-style preview.
    }
    try {
      const ctx = new AudioContext();
      contextRef.current = ctx;
      await ctx.resume();
      const osc = ctx.createOscillator();
      const sub = ctx.createOscillator();
      const gain = ctx.createGain();
      const low = ctx.createBiquadFilter();
      const now = ctx.currentTime;
      osc.type = "sawtooth";
      sub.type = "triangle";
      low.type = "lowpass";
      low.frequency.value = 560;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.13, now + .35);
      gain.gain.setValueAtTime(.13, now + 1.1);
      gain.gain.exponentialRampToValueAtTime(.0001, now + 3.8);
      osc.frequency.setValueAtTime(36, now);
      osc.frequency.exponentialRampToValueAtTime(85, now + .4);
      osc.frequency.setValueAtTime(85, now + 1.1);
      osc.frequency.exponentialRampToValueAtTime(190, now + 2.4);
      osc.frequency.exponentialRampToValueAtTime(72, now + 3.6);
      sub.frequency.setValueAtTime(24, now);
      sub.frequency.exponentialRampToValueAtTime(95, now + 2.4);
      sub.frequency.exponentialRampToValueAtTime(36, now + 3.6);
      osc.connect(low); sub.connect(low); low.connect(gain); gain.connect(ctx.destination);
      osc.start(now); sub.start(now); osc.stop(now + 3.9); sub.stop(now + 3.9);
      osc.onended = () => { void ctx.close(); contextRef.current = null; setPlaying(false); };
    } catch { setPlaying(false); }
  }
  return <button className="rides-engine-button" type="button" onClick={start} disabled={playing} aria-label="Play motorcycle starting and revving sound">
    <Volume2 size={18} aria-hidden="true" />
    <span>{playing ? "ENGINE RUNNING…" : "START THE ENGINE"}</span>
  </button>;
}
