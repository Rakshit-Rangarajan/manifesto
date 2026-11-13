"use client";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import "./ambient-effects.css";

/** Decorative, lightweight SVG/CSS ambience; no emoji or network assets. */
export default function AmbientEffects({ light }: { light: boolean }) {
  type Climate = "sunny" | "cloudy" | "rain" | "storm" | "snow" | "fog" | "wind" | "hail";
  const [automatic, setAutomatic] = useState<Climate>("sunny");
  const [override, setOverride] = useState<Climate | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const hold = useRef<ReturnType<typeof setTimeout> | null>(null);
  const climate = override ?? automatic;
  const options: Climate[] = ["sunny","cloudy","rain","storm","snow","fog","wind","hail"];
  const classify = (code: number, wind: number): Climate => {
    if (code === 95) return "storm";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
    if ([96, 99].includes(code)) return "hail";
    if ([45, 48].includes(code)) return "fog";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
    if (wind >= 35) return "wind";
    if ([1, 2, 3].includes(code)) return "cloudy";
    return "sunny";
  };
  useEffect(() => {
    if (!panelOpen) return;
    const close = (event: PointerEvent) => { if (panelRef.current && !panelRef.current.contains(event.target as Node)) setPanelOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setPanelOpen(false); };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", escape); };
  }, [panelOpen]);
  useEffect(() => {
    let active = true;
    const update = async () => {
      try {
        // Coarse city coordinates only; no browser location permission required.
        const cacheKey = "evo-climate-city-v2";
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as { timestamp: number; code: number; wind: number };
          if (Date.now() - parsed.timestamp < 30 * 60_000) {
            if (active) setAutomatic(classify(parsed.code, parsed.wind));
            return;
          }
        }
        // City-level Bengaluru fallback; never request precise browser location.
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current=weather_code,wind_speed_10m&timezone=Asia%2FKolkata");
        if (!response.ok) return;
        const data = await response.json();
        if (active && typeof data?.current?.weather_code === "number") {
          const code = data.current.weather_code;
          const wind = Number(data.current.wind_speed_10m || 0);
          sessionStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), code, wind }));
          setAutomatic(classify(code, wind));
        }
      } catch { /* Offline: retain petal ambience. */ }
    };
    update();
    const interval = window.setInterval(update, 15 * 60 * 1000);
    return () => { active = false; window.clearInterval(interval); };
  }, []);
  return <><div className={"evo-ambience " + (light ? "is-day" : "is-night") + " climate-" + climate} aria-hidden="true">
    <div className="evo-halo" /><div className="evo-climate-light" /><div className="evo-climate-particles" />
    {<>
      {Array.from({length: 26}, (_, i) => <span key={i} className="evo-petal-flight" style={{left: `${3 + (i * 17.3) % 94}%`, animationDuration: `${11 + (i % 6) * 1.8}s`, animationDelay: `${-i * 1.65}s`, width: `${12 + (i % 4) * 3}px` } as CSSProperties}><svg className="evo-petal" viewBox="0 0 36 42" style={{animationDelay:`${-i*.31}s`,animationDuration:`${2.6+(i%5)*.45}s`}}><defs><linearGradient id={`petal-grad-${i}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff4f6"/><stop offset=".45" stopColor="#f6b0cb"/><stop offset="1" stopColor="#cf6b99"/></linearGradient></defs><path d="M17 39 C9 31 3 24 5 15 C6 8 12 4 17 3 C23 5 31 11 30 19 C29 27 23 34 17 39Z" fill={`url(#petal-grad-${i})`} stroke="#ffe6f1" strokeWidth=".7"/><path d="M17 38 Q12 22 17 4" fill="none" stroke="#c46c92" strokeOpacity=".42" strokeWidth=".85"/><path d="M17 38 Q25 23 29 19" fill="none" stroke="#fff6fa" strokeOpacity=".52" strokeWidth=".9"/></svg></span>)} 
      {!light && [0, 1].map(i => <span key={i} className={"evo-meteor evo-meteor-" + i}/>)}
    </>}
  </div>
    <div className="evo-climate-control" ref={panelRef}>
      <button type="button" className="evo-climate-trigger" aria-label="Atmosphere settings: long press or activate" aria-expanded={panelOpen}
        onPointerDown={() => { hold.current = setTimeout(() => setPanelOpen(true), 550); }}
        onPointerUp={() => { if (hold.current) clearTimeout(hold.current); }}
        onPointerCancel={() => { if (hold.current) clearTimeout(hold.current); }}
        onContextMenu={e => { e.preventDefault(); setPanelOpen(true); }}
        onClick={event => { if (event.detail === 0) setPanelOpen(value => !value); }}
        title="Hold for atmosphere controls">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg>
      </button>
      {panelOpen && <div className="evo-climate-panel" role="group" aria-label="Atmosphere controls">
        <div className="evo-climate-heading">Atmosphere <button type="button" onClick={() => setPanelOpen(false)} aria-label="Close atmosphere controls">×</button></div>
        <button type="button" className={override === null ? "selected" : ""} onClick={() => setOverride(null)}>Automatic</button>
        <div className="evo-climate-options">{options.map(option => <button key={option} type="button" className={override === option ? "selected" : ""} onClick={() => setOverride(option)}>{option}</button>)}</div>
      </div>}
    </div>
  </>;
}
