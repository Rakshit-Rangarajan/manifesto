"use client";
import {useEffect,useState} from "react";
const names=["RAKSHIT RANGARAJAN","ರಕ್ಷಿತ್ ರಂಗರಾಜನ್","रक्षित रंगराजन","ரக்ஷித் ரங்கராஜன்","ラクシット・ランガラジャン"];
const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export default function JumbleName(){
 const [value,setValue]=useState(names[0]);
 useEffect(()=>{
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current=0;let animation:ReturnType<typeof setInterval>|undefined;
  const cycle=()=>{
   const next=(current+1)%names.length;const target=Array.from(names[next]);let frame=0;
   if(animation)clearInterval(animation);
   if(reduce){setValue(names[next]);current=next;return;}
   animation=setInterval(()=>{
    frame++;
    setValue(target.map((c,i)=>c===" "||c==="・"?" ":i<Math.floor(frame/2)?c:chars[(i*11+frame*7)%chars.length]).join(""));
    if(frame>=target.length*2+3){clearInterval(animation);animation=undefined;setValue(names[next]);current=next;}
   },45);
  };
  const timer=setInterval(cycle,4400);
  return()=>{clearInterval(timer);if(animation)clearInterval(animation)};
 },[]);
 return <span className="evo-name-jumble" aria-label="Rakshit Rangarajan">{value}</span>;
}
