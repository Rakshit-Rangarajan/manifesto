"use client";
import { useEffect, useRef, useState } from "react";
import "./cinematic-chapters.css";
import "./evo-character-stage.css";

const chapters = [
  {id:"home",label:"PROLOGUE",role:"THE DREAMER",tone:"night"},
  {id:"about",label:"01 / ORIGIN",role:"THE BUILDER",tone:"workshop"},
  {id:"lab",label:"02 / CURRENTLY BUILDING",role:"THE ARCHITECT",tone:"neural"},
  {id:"projects",label:"03 / CREATIONS",role:"THE CREATOR",tone:"creation"},
  {id:"skills",label:"04 / ARSENAL",role:"THE ENGINEER",tone:"engineering"},
  {id:"experience",label:"05 / JOURNEY",role:"THE STRATEGIST",tone:"strategy"},
  {id:"education",label:"06 / DISCOVERY",role:"THE SCHOLAR",tone:"study"},
  {id:"contact",label:"07 / HORIZON",role:"THE HUMAN",tone:"horizon"},
] as const;

/** A continuous, scroll-scrubbed visual stage. New character art can be swapped
 * into each layer without altering the navigation, content, or motion system. */
export default function CinematicChapters(){
 const [active,setActive]=useState(0);
 const [reduce,setReduce]=useState(true);
 const stage=useRef<HTMLDivElement>(null);
 useEffect(()=>{
   const media=window.matchMedia("(prefers-reduced-motion: reduce)");
   const sync=()=>setReduce(media.matches);
   sync();media.addEventListener("change",sync);
   return()=>media.removeEventListener("change",sync);
 },[]);
 useEffect(()=>{
   const sections=chapters.map(chapter=>document.getElementById(chapter.id));
   let raf=0,last=-1;
   const update=()=>{
     raf=0;
     // Use section boundaries rather than next-section height, so short and
     // long chapters receive the same predictable, reversible handoff.
     const viewport=window.innerHeight;
     const boundary=viewport*.5;
     const positions=sections.map(el=>el?.getBoundingClientRect().top??Infinity);
     let selected=0;
     for(let i=1;i<positions.length;i++){
       if(positions[i]<=boundary)selected=i;
     }
     if(selected!==last){last=selected;setActive(selected);}
     const nextTop=positions[selected+1];
          // Keep the current chapter visible until the following chapter enters
     // the viewport, then blend the two atmospheric and character layers.
     const upcoming=Number.isFinite(nextTop)&&nextTop>boundary;
     const current=upcoming?selected:Math.min(selected,chapters.length-1);
     const incoming=upcoming?Math.min(selected+1,chapters.length-1):current;
     const mix=upcoming?Math.max(0,Math.min(1,(viewport-nextTop)/Math.max(1,viewport-boundary))):0;
     stage.current?.style.setProperty("--cinema-blend",String(mix));
     const currentRect=sections[current]?.getBoundingClientRect();
     const travel=currentRect?Math.max(0,Math.min(1,-currentRect.top/Math.max(1,currentRect.height-viewport))):0;
     stage.current?.style.setProperty("--cinema-scroll",String(travel));
     stage.current?.style.setProperty("--cinema-active",String(current));
     stage.current?.style.setProperty("--cinema-incoming",String(incoming));
   };
   const schedule=()=>{if(!raf)raf=requestAnimationFrame(update);};
   update();
   window.addEventListener("scroll",schedule,{passive:true});
   window.addEventListener("resize",schedule);
   return()=>{window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);if(raf)cancelAnimationFrame(raf);};
 },[]);
 return <div ref={stage} className={"evo-cinema "+(reduce?"evo-cinema-static":"")} aria-hidden="true">
   {chapters.map((chapter,i)=><div key={chapter.id} className={"evo-cinema-scene evo-cinema-"+chapter.tone+(i===active?" is-active":"")+(i===active+1?" is-next":"")}>
      <div className="evo-cinema-atmosphere"/>
      <div className="evo-cinema-rings"/>
      <div className="evo-cinema-light"/>
   </div>)}
   <div className="evo-cinema-vignette"/>
 </div>;
}
