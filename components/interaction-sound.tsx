"use client";
import {useCallback,useEffect,useRef,useState} from "react";
import {Pause,Play,Volume2,VolumeX} from "lucide-react";

/**
 * Original ambient flute composition: "Moonlit Sakura".
 * Four eight-second phrases, 32-second seamless harmonic cycle.
 * Synthesised locally via Web Audio; no external audio files or licensing.
 */
const CHORDS=[
 [196,246.94,293.66,369.99], // Gmaj9
 [164.81,196,246.94,329.63], // Em7
 [130.81,164.81,196,261.63], // Cmaj7
 [146.83,220,261.63,329.63]  // Dm9-ish suspended colour
];
const NOTES=[392,440,493.88,392,329.63,392,440,329.63,392,493.88,440,392,293.66,329.63,392,293.66];
const BAR=8, LOOP=32;

function tone(ctx:AudioContext,bus:AudioNode,freq:number,when:number,duration:number,level:number,type:OscillatorType="sine"){
 const osc=ctx.createOscillator(),gain=ctx.createGain();
 osc.type=type;osc.frequency.setValueAtTime(freq,when);
 gain.gain.setValueAtTime(0,when);
 gain.gain.linearRampToValueAtTime(level,when+Math.min(.55,duration*.28));
 gain.gain.setTargetAtTime(.00001,when+Math.min(.7,duration*.4),Math.max(.4,duration*.18));
 gain.gain.setValueAtTime(.00001,when+duration);
 osc.connect(gain);gain.connect(bus);osc.start(when);osc.stop(when+duration+.02);
 osc.onended=()=>{osc.disconnect();gain.disconnect()};
}


/** Soft breathy bamboo-flute-like synth: fundamental + quiet upper partials,
 * gentle vibrato and a slow breath-shaped envelope. */
function flute(ctx:AudioContext,bus:AudioNode,freq:number,when:number,duration:number,level:number){
 const envelope=ctx.createGain();envelope.gain.setValueAtTime(0,when);
 envelope.gain.linearRampToValueAtTime(level*.72,when+.17);
 envelope.gain.linearRampToValueAtTime(level,when+.48);
 envelope.gain.setValueAtTime(level*.86,when+Math.max(.5,duration-.48));
 envelope.gain.linearRampToValueAtTime(.00001,when+duration);
 envelope.connect(bus);
 const vibrato=ctx.createOscillator(),vDepth=ctx.createGain();
 vibrato.frequency.value=4.6;vDepth.gain.value=freq*.0021;
 vibrato.connect(vDepth);
 for(const [mult,amp] of [[1,1],[2,.14],[3,.035]]){
  const osc=ctx.createOscillator(),partial=ctx.createGain();
  osc.type="sine";osc.frequency.setValueAtTime(freq*mult,when);
  partial.gain.value=amp;vDepth.connect(osc.frequency);
  osc.connect(partial);partial.connect(envelope);
  osc.start(when);osc.stop(when+duration+.03);
  osc.onended=()=>{osc.disconnect();partial.disconnect()};
 }
 vibrato.start(when);vibrato.stop(when+duration+.03);
 vibrato.onended=()=>{vibrato.disconnect();vDepth.disconnect();envelope.disconnect()};
}

export default function InteractionSound(){
 const [enabled,setEnabled]=useState(true);
 const [playing,setPlaying]=useState(false);
 const [needsGesture,setNeedsGesture]=useState(true);
 const context=useRef<AudioContext|null>(null);
 const master=useRef<GainNode|null>(null);
 const loopTimer=useRef<ReturnType<typeof setInterval>|null>(null);
 const nextCycle=useRef(0);
 const alive=useRef(true);
 const enabledRef=useRef(enabled);
 enabledRef.current=enabled;

 const schedule=useCallback((ctx:AudioContext,start:number)=>{
  const bus=master.current;if(!bus)return;
  for(let bar=0;bar<4;bar++){
   const t=start+bar*BAR;
   CHORDS[bar].forEach((f,i)=>{tone(ctx,bus,f,t,7.95,.010-i*.001,"sine");tone(ctx,bus,f/2,t,7.95,.0025,"triangle")});
   for(let step=0;step<4;step++){
    const note=NOTES[bar*4+step];
    flute(ctx,bus,note,t+step*2+.32,1.95,.028);
   }
  }
 },[]);

 const stop=useCallback(()=>{
  if(loopTimer.current){clearInterval(loopTimer.current);loopTimer.current=null}
  const ctx=context.current;
  if(ctx&&master.current){master.current.gain.cancelScheduledValues(ctx.currentTime);master.current.gain.setTargetAtTime(0,ctx.currentTime,.18)}
  if(alive.current)setPlaying(false);
 },[]);

 const start=useCallback(async()=>{
  if(!enabledRef.current)return;
  try{
   const ctx=context.current??new window.AudioContext();
   context.current=ctx;
   if(!master.current){const bus=ctx.createGain();bus.gain.value=0;bus.connect(ctx.destination);master.current=bus}
   await ctx.resume();
   if(!alive.current||!enabledRef.current)return;
   if(loopTimer.current)clearInterval(loopTimer.current);
   const now=ctx.currentTime;
   master.current.gain.cancelScheduledValues(now);
   master.current.gain.setTargetAtTime(.22,now,1.2); // very quiet, slow fade-in
   nextCycle.current=now+.12;
   schedule(ctx,nextCycle.current);nextCycle.current+=LOOP;
   loopTimer.current=setInterval(()=>{
    if(ctx.state!=="running")return;
    while(nextCycle.current<ctx.currentTime+3){schedule(ctx,nextCycle.current);nextCycle.current+=LOOP}
   },1000);
   setNeedsGesture(false);setPlaying(true);
  }catch{setPlaying(false)}
 },[schedule]);

 // Browsers require a user gesture for audio. Preference defaults ON, playback starts
 // on the first click/key interaction (or immediately where autoplay is permitted).
 useEffect(()=>{
  alive.current=true;
  const wake=()=>{if(enabledRef.current)void start()};
  const onVisibility=()=>{if(document.hidden){if(context.current&&context.current.state==="running")void context.current.suspend()}else if(enabledRef.current&&!loopTimer.current)void start();else if(enabledRef.current&&context.current?.state==="suspended")void context.current.resume()};
  const onPointer=()=>wake();
  const onKey=()=>wake();
  document.addEventListener("pointerdown",onPointer,{once:true});
  document.addEventListener("keydown",onKey,{once:true});
  document.addEventListener("visibilitychange",onVisibility);
  // Autoplay attempt is best-effort; rejected promises are handled.
  void start();
  return()=>{
   alive.current=false;
   document.removeEventListener("pointerdown",onPointer);
   document.removeEventListener("keydown",onKey);
   document.removeEventListener("visibilitychange",onVisibility);
   if(loopTimer.current)clearInterval(loopTimer.current);
   const ctx=context.current;context.current=null;master.current=null;
   if(ctx)void ctx.close();
  };
 },[start]);

 const toggle=()=>{
  if(enabled){enabledRef.current=false;setEnabled(false);stop()}
  else{enabledRef.current=true;setEnabled(true);void start()}
 };

 // Quiet UI sounds share the same mute switch and output level.
 useEffect(()=>{
  const click=(event:MouseEvent)=>{
   if(!enabledRef.current||!context.current||!master.current)return;
   const target=event.target;if(!(target instanceof Element))return;
   if(!target.closest(".evo-primary,.evo-secondary,.evo-project-body>a,.evo-topic-options button"))return;
   const ctx=context.current;
   if(ctx.state!=="running")return;
   tone(ctx,master.current,659.25,ctx.currentTime,.13,.012,"sine");
  };
  document.addEventListener("click",click);
  return()=>document.removeEventListener("click",click);
 },[]);

 return <div className="evo-audio-controller" aria-label="Ambient soundtrack controls">
  <button type="button" className="evo-sound-toggle" onClick={toggle} aria-label={enabled?"Pause ambient music and mute sounds":"Play ambient music and enable sounds"} aria-pressed={enabled} title={enabled?"Pause ambient soundtrack":"Play ambient soundtrack"}>
   {enabled&&playing?<Pause size={16}/>:enabled?<Play size={16}/>:<VolumeX size={16}/>}
  </button>
  <div className={"evo-audio-wave"+(playing&&enabled?" is-playing":"")} aria-hidden="true">{Array.from({length:13},(_,i)=><i key={i} style={{animationDelay:`${i*-.13}s`}}/>)}</div>
  <span className="evo-audio-label">{enabled?(playing?"MOONLIT FLUTE":needsGesture?"TAP TO PLAY":"READY"):"MUTED"}</span>
  {enabled?<Volume2 className="evo-audio-volume" size={14}/>:<VolumeX className="evo-audio-volume" size={14}/>}
 </div>;
}
