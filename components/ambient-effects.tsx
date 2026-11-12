"use client";
import { useEffect, useState } from "react";
import "./ambient-effects.css";

/** Decorative, lightweight SVG/CSS ambience; no emoji or network assets. */
export default function AmbientEffects({ light }: { light: boolean }) {
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotion(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return <div className={"evo-ambience " + (light ? "is-day" : "is-night")} aria-hidden="true">
    <div className="evo-halo" />
    {motion && (light
      ? Array.from({length: 7}, (_, i) => <svg key={i} className="evo-petal" style={{"--petal-index": i} as React.CSSProperties} viewBox="0 0 28 28"><path d="M14 2 C24 7 27 16 14 26 C2 17 4 8 14 2Z" fill="#f8a7c4" fillOpacity=".72" stroke="#fff2f6" strokeWidth=".8"/><path d="M14 3Q18 15 14 25" stroke="#d96e99" strokeOpacity=".6" fill="none"/></svg>)
      : [0, 1].map(i => <span key={i} className={"evo-meteor evo-meteor-" + i}/>))}
  </div>;
}
