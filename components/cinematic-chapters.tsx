"use client";
import { useEffect, useRef, useState } from "react";
import "./cinematic-chapters.css";
import "./evo-character-stage.css";

const chapters = [
  {id:"home",label:"PROLOGUE",role:"THE DREAMER",tone:"night"},
  {id:"about",label:"01 / ORIGIN",role:"THE BUILDER",tone:"workshop"},
  {id:"projects",label:"02 / CREATIONS",role:"THE CREATOR",tone:"creation"},
  {id:"skills",label:"03 / ARSENAL",role:"THE ENGINEER",tone:"engineering"},
  {id:"experience",label:"04 / JOURNEY",role:"THE STRATEGIST",tone:"strategy"},
  {id:"lab",label:"05 / PANTHEON",role:"THE ARCHITECT",tone:"neural"},
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
   const sections=chapters.map(c=>document.getElementById(c.id));
   let raf=0,last=-1;
   const update=()=>{
     raf=0;
     const center=window.innerHeight*.5;
     let selected=0;
     for(let i=0;i<sections.length;i++){
       const el=sections[i];if(el&&el.getBoundingClientRect().top<=center)selected=i;
     }
     if(selected!==last){last=selected;setActive(selected);}
     const next=sections[selected+1];
     const distance=next?Math.max(1,next.getBoundingClientRect().height):1;
     const nextTop=next?.getBoundingClientRect().top??window.innerHeight;
     const blend=next?Math.max(0,Math.min(1,(window.innerHeight-nextTop)/(window.innerHeight*.85))):0;
     stage.current?.style.setProperty("--cinema-blend",String(blend));
     stage.current?.style.setProperty("--cinema-scroll",String(Math.min(1,Math.max(0,1-nextTop/distance))));
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
