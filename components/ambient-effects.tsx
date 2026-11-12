"use client";
import type { CSSProperties } from "react";
import "./ambient-effects.css";

/** Decorative, lightweight SVG/CSS ambience; no emoji or network assets. */
export default function AmbientEffects({ light }: { light: boolean }) {
  return <div className={"evo-ambience " + (light ? "is-day" : "is-night")} aria-hidden="true">
    <div className="evo-halo" />
    {<>
      {Array.from({length: 22}, (_, i) => <svg key={i} className="evo-petal" style={{left: `${3 + (i * 17.3) % 94}%`, animationDuration: `${10 + (i % 6) * 1.8}s`, animationDelay: `${-i * 1.65}s`, width: `${13 + (i % 4) * 3}px` } as CSSProperties} viewBox="0 0 28 28"><path d="M14 2 C24 7 27 16 14 26 C2 17 4 8 14 2Z" fill="#f8a7c4" fillOpacity=".78" stroke="#fff2f6" strokeWidth=".8"/><path d="M14 3Q18 15 14 25" stroke="#d96e99" strokeOpacity=".6" fill="none"/></svg>)}
      {!light && [0, 1].map(i => <span key={i} className={"evo-meteor evo-meteor-" + i}/>)}
    </>}
  </div>;
}
