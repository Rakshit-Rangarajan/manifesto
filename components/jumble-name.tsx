"use client";
import { useEffect, useRef, useState } from "react";
const names=["RAKSHIT RANGARAJAN","ರಕ್ಷಿತ್ ರಂಗರಾಜನ್","रक्षित रंगराजन","ரக்ஷித் ரங்கராஜன்","ラクシット・ランガラジャン"];
const noise="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export default function JumbleName(){
 const [value,setValue]=useState(names[0]);
 const element=useRef<HTMLSpanElement>(null);
 useEffect(()=>{
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible=true;
  let index=0;let tick:ReturnType<typeof setInterval>|undefined;
  const cycle=()=>{
   if(reduced.matches || document.hidden || !visible) return;
   const next=(index+1)%names.length;
   if(tick)clearInterval(tick);
   const target=Array.from(names[next]);let frame=0;const steps=18;
   tick=setInterval(()=>{
    if(reduced.matches || document.hidden || !visible){if(tick)clearInterval(tick);tick=undefined;setValue(names[index]);return;}
    frame++;
    const reveal=Math.floor((frame/steps)*target.length);
    setValue(target.map((character,i)=>{
      if(i<reveal||character===" "||character==="・")return character;
      return noise[(frame*7+i*13)%noise.length];
    }).join(""));
    if(frame>=steps){if(tick)clearInterval(tick);tick=undefined;index=next;setValue(names[index]);}
   },55);
  };
  const stop=()=>{if(tick)clearInterval(tick);tick=undefined;setValue(names[index]);};
  const sync=()=>{if(reduced.matches || document.hidden || !visible)stop();};
  const observer=element.current && "IntersectionObserver" in window ? new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();}) : null;
  if(observer && element.current)observer.observe(element.current);
  reduced.addEventListener("change",sync);
  document.addEventListener("visibilitychange",sync);
  const timer=setInterval(cycle,4800);
  return()=>{clearInterval(timer);if(tick)clearInterval(tick);observer?.disconnect();reduced.removeEventListener("change",sync);document.removeEventListener("visibilitychange",sync);};
 },[]);
 return <span ref={element} className="evo-name-jumble" aria-label="Rakshit Rangarajan" aria-live="off">{value}</span>;
}
