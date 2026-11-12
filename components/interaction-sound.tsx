"use client";
import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function InteractionSound() {
 const [enabled,setEnabled]=useState(false);
 useEffect(()=>{
   if(!enabled)return;
   const AudioContextClass=window.AudioContext;
   if(!AudioContextClass)return;
   const context=new AudioContextClass();
   const play=(frequency:number,duration:number,volume:number)=>{
     if(context.state==="suspended")void context.resume();
     const oscillator=context.createOscillator(),gain=context.createGain();
     oscillator.type="triangle";oscillator.frequency.setValueAtTime(frequency,context.currentTime);
     oscillator.frequency.exponentialRampToValueAtTime(Math.max(80,frequency*.55),context.currentTime+duration);
     gain.gain.setValueAtTime(volume,context.currentTime);
     gain.gain.exponentialRampToValueAtTime(.0001,context.currentTime+duration);
     oscillator.connect(gain);gain.connect(context.destination);
     oscillator.start();oscillator.stop(context.currentTime+duration);
   };
   const onPointer=(event:PointerEvent)=>{
     const target=event.target;
     if(!(target instanceof Element))return;
     if(target.closest(".evo-primary,.evo-secondary,.evo-project-body>a"))play(420,.075,.018);
   };
   const onClick=(event:MouseEvent)=>{
     const target=event.target;
     if(!(target instanceof Element))return;
     if(target.closest(".evo-primary,.evo-secondary,.evo-project-body>a"))play(620,.11,.035);
   };
   document.addEventListener("pointerover",onPointer);
   document.addEventListener("click",onClick);
   return()=>{document.removeEventListener("pointerover",onPointer);document.removeEventListener("click",onClick);void context.close();};
 },[enabled]);
 return <button className="evo-sound-toggle" type="button" aria-label={enabled?"Mute interaction sounds":"Enable interaction sounds"} aria-pressed={enabled} onClick={()=>setEnabled(v=>!v)} title={enabled?"Mute sounds":"Enable sounds"}>{enabled?<Volume2 size={17}/>:<VolumeX size={17}/>}</button>;
}
