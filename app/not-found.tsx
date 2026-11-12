"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Compass, Moon, Sun, Sparkles } from "lucide-react";
import "./not-found.css";

export default function NotFound() {
  const [light, setLight] = useState(false);
  return (
    <main className={`evo-lost ${light ? "evo-lost-light" : ""}`}>
      <div className="evo-lost-sky" aria-hidden="true" />
      <div className="evo-lost-haze" aria-hidden="true" />
      <div className="evo-lost-petals" aria-hidden="true">{Array.from({length:12},(_,i)=><span key={i} style={{"--i":i} as React.CSSProperties} />)}</div>
      <header className="evo-lost-nav">
        <Link href="/" className="evo-lost-brand"><span className="evo-lost-brand-mark"><img src={light?"/rr-emblem-logo-light.png":"/images/rr-emblem-logo-dark.png"} alt="Rakshit Rangarajan dragon emblem" width="43" height="43"/></span><span>RAKSHIT <em>RANGARAJAN</em></span></Link>
        <button type="button" onClick={()=>setLight(v=>!v)} className="evo-lost-theme" aria-label={light?"Switch to night theme":"Switch to morning theme"}>{light?<Moon size={18}/>:<Sun size={18}/>}</button>
      </header>
      <section className="evo-lost-content">
        <p className="evo-lost-eyebrow"><Sparkles size={15}/> / A DETOUR IN THE MULTIVERSE</p>
        <div className="evo-lost-numeral" aria-label="Error 404">4<span>0</span>4</div>
        <h1>This chapter hasn&apos;t <em>been written.</em></h1>
        <p className="evo-lost-description">You&apos;ve wandered beyond the pages of my universe. The story continues somewhere else — let me guide you back.</p>
        <div className="evo-lost-actions">
          <Link href="/" className="evo-lost-primary"><ArrowLeft size={17}/> Return to the beginning</Link>
          <Link href="/#projects" className="evo-lost-secondary"><Compass size={17}/> Explore my projects <ArrowUpRight size={15}/></Link>
        </div>
        <div className="evo-lost-coordinates"><span>ERROR / 404</span><span>LOST CHAPTER · FOUND POSSIBILITY</span><span>EST. IN THE UNKNOWN</span></div>
      </section>
      <div className="evo-lost-signature" aria-hidden="true">The story is still unfolding.</div>
    </main>
  );
}
