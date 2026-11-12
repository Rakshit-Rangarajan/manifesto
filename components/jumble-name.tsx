"use client";
import { useEffect, useState } from "react";
const names=["RAKSHIT RANGARAJAN","ರಕ್ಷಿತ್ ರಂಗರಾಜನ್","रक्षित रंगराजन","ரக்ஷித் ரங்கராஜன்","ラクシット・ランガラジャン"];
const noise="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export default function JumbleName(){
 const [value,setValue]=useState(names[0]);
 useEffect(()=>{
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index=0;let tick:ReturnType<typeof setInterval>|undefined;
  const cycle=()=>{
   const next=(index+1)%names.length;
   if(tick)clearInterval(tick);
   if(reduced){index=next;setValue(names[next]);return;}
   const from=Array.from(names[index]);const target=Array.from(names[next]);let frame=0;const steps=18;
   tick=setInterval(()=>{
    frame++;
    const reveal=Math.floor((frame/steps)*target.length);
    setValue(target.map((character,i)=>{
      if(i<reveal||character===" "||character==="・")return character;
      return noise[(frame*7+i*13)%noise.length];
    }).join(""));
    if(frame>=steps){if(tick)clearInterval(tick);tick=undefined;index=next;setValue(names[index]);}
   },55);
  };
  const timer=setInterval(cycle,4800);
  return()=>{clearInterval(timer);if(tick)clearInterval(tick)};
 },[]);
 return <span className="evo-name-jumble" aria-label="Rakshit Rangarajan" aria-live="off">{value}</span>;
}
