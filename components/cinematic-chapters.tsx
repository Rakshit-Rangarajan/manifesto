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
   const scenes=Array.from(stage.current?.querySelectorAll<HTMLElement>(".evo-cinema-scene")??[]);
   const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
   let raf=0;
   const clamp=(value:number)=>Math.max(0,Math.min(1,value));
   const update=()=>{
     raf=0;
     const viewport=Math.max(1,window.innerHeight);
     const focus=viewport*.55;
     const tops=sections.map(section=>section?.getBoundingClientRect().top??Infinity);
     let chapter=0;
     for(let i=1;i<tops.length;i++)if(tops[i]<=focus)chapter=i;
     // Blend across a boundary centered around the reading focus. Both
     // directions use the same scroll coordinates, avoiding a visible snap.
     const width=Math.min(420,viewport*.55);
     const next=chapter+1<chapters.length?chapter+1:-1;
     const previous=chapter>0?chapter-1:-1;
     let from=chapter,to=-1,mix=0;
     if(next>=0&&tops[next]<focus+width/2){
       to=next;
       mix=clamp((focus+width/2-tops[next])/width);
     }else if(previous>=0&&tops[chapter]>focus-width/2){
       from=previous;
       to=chapter;
       mix=clamp((focus+width/2-tops[chapter])/width);
     }
     scenes.forEach((scene,i)=>{
       const opacity=i===0?0:(reduced.matches?(i===chapter?0.3:0):(i===from?(to<0?1:1-mix):i===to?mix:0));
       scene.style.opacity=String(opacity);
       scene.style.visibility=opacity>0?"visible":"hidden";
     });
     const rect=sections[chapter]?.getBoundingClientRect();
     const travel=rect?clamp(-rect.top/Math.max(1,rect.height-viewport*.5)):0;
     stage.current?.style.setProperty("--cinema-scroll",String(reduced.matches?0:travel));
     stage.current?.style.setProperty("--cinema-blend",String(reduced.matches?0:mix));
   };
   const schedule=()=>{if(!raf)raf=requestAnimationFrame(update);};
   update();
   window.addEventListener("scroll",schedule,{passive:true});
   window.addEventListener("resize",schedule);
   reduced.addEventListener("change",schedule);
   return()=>{
     window.removeEventListener("scroll",schedule);
     window.removeEventListener("resize",schedule);
     reduced.removeEventListener("change",schedule);
     if(raf)cancelAnimationFrame(raf);
   };
 },[]);
 return <div ref={stage} className={"evo-cinema "+(reduce?"evo-cinema-static":"")} aria-hidden="true">
   {chapters.map((chapter,i)=><div key={chapter.id} className={"evo-cinema-scene evo-cinema-"+chapter.tone+}>
      {i>0&&<div className="evo-cinema-character" style={{backgroundImage:`url(/evo/chapters/${chapter.id}.webp)`}}/>}
      <div className="evo-cinema-atmosphere"/>
      <div className="evo-cinema-rings"/>
      <div className="evo-cinema-light"/>
   </div>)}
   <div className="evo-cinema-vignette"/>
 </div>;
}
