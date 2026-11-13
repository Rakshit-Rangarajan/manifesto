"use client";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import "./ambient-effects.css";

/** Decorative, lightweight SVG/CSS ambience; no emoji or network assets. */
export default function AmbientEffects({ light }: { light: boolean }) {
  const [rain, setRain] = useState(false);
  useEffect(() => {
    let active = true;
    const update = async () => {
      try {
        // Coarse city coordinates only; no browser location permission required.
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current=rain,showers,precipitation&timezone=Asia%2FKolkata", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (active) setRain(Number(data?.current?.rain || 0) > 0 || Number(data?.current?.showers || 0) > 0);
      } catch { /* Offline: retain petal ambience. */ }
    };
    update();
    const interval = window.setInterval(update, 15 * 60 * 1000);
    return () => { active = false; window.clearInterval(interval); };
  }, []);
  return <div className={"evo-ambience " + (light ? "is-day" : "is-night") + (rain ? " is-raining" : "")} aria-hidden="true">
    <div className="evo-halo" />
    {<>
      {Array.from({length: 26}, (_, i) => <span key={i} className="evo-petal-flight" style={{left: `${3 + (i * 17.3) % 94}%`, animationDuration: `${11 + (i % 6) * 1.8}s`, animationDelay: `${-i * 1.65}s`, width: `${12 + (i % 4) * 3}px` } as CSSProperties}><svg className="evo-petal" viewBox="0 0 36 42" style={{animationDelay:`${-i*.31}s`,animationDuration:`${2.6+(i%5)*.45}s`}}><defs><linearGradient id={`petal-grad-${i}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff4f6"/><stop offset=".45" stopColor="#f6b0cb"/><stop offset="1" stopColor="#cf6b99"/></linearGradient></defs><path d="M17 39 C9 31 3 24 5 15 C6 8 12 4 17 3 C23 5 31 11 30 19 C29 27 23 34 17 39Z" fill={`url(#petal-grad-${i})`} stroke="#ffe6f1" strokeWidth=".7"/><path d="M17 38 Q12 22 17 4" fill="none" stroke="#c46c92" strokeOpacity=".42" strokeWidth=".85"/><path d="M17 38 Q25 23 29 19" fill="none" stroke="#fff6fa" strokeOpacity=".52" strokeWidth=".9"/></svg></span>)} 
      {!light && [0, 1].map(i => <span key={i} className={"evo-meteor evo-meteor-" + i}/>)}
    </>}
  </div>;
}
