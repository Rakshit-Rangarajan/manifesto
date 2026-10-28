"use client";

import { useState } from "react";

const workflows = [
  { name: "AERO", nodes: ["Requirement", "Analysis", "Engineering plan", "Human review"], notes: ["Capture an engineering request with its constraints.", "Organize context, dependencies and risks.", "Produce a reviewable implementation approach.", "Keep approval with the engineer before action."] },
  { name: "Athena", nodes: ["Commitment", "Local record", "Reminder", "Follow-up"], notes: ["Identify a task or commitment.", "Store the relevant context locally.", "Surface the next action at the right time.", "Track whether the commitment is resolved."] },
  { name: "PromptFlow Studio", nodes: ["Input", "Workflow steps", "Connections", "Inspection"], notes: ["Define an AI application input.", "Compose processing stages visually.", "Connect stages into an understandable flow.", "Inspect and refine the workflow design."] },
] as const;

export default function ArcaneArchitecture() {
  const [project, setProject] = useState(0);
  const [step, setStep] = useState(0);
  const current = workflows[project];
  return (
    <section id="architecture" aria-labelledby="architecture-heading" className="arcane-architecture">
      <p className="arcane-eyebrow">Interactive architecture · Conceptual</p>
      <h2 id="architecture-heading" className="arcane-systems-heading">Trace the thinking.</h2>
      <p className="arcane-systems-subtitle">Explore a simplified workflow for each project. These diagrams illustrate the engineering approach; they are not live system telemetry or verified production architecture.</p>
      <div className="arcane-architecture-tabs" role="group" aria-label="Select a project">
        {workflows.map((item,index)=><button type="button" key={item.name} aria-pressed={project===index} onClick={()=>{setProject(index);setStep(0)}}>{item.name}</button>)}
      </div>
      <div className="arcane-architecture-steps" aria-label={current.name+" workflow"}>
        {current.nodes.map((node,index)=><div className="arcane-architecture-step" key={node}><button type="button" aria-pressed={step===index} onClick={()=>setStep(index)}><span>0{index+1}</span>{node}</button>{index<current.nodes.length-1&&<span aria-hidden="true" className="arcane-architecture-arrow">→</span>}</div>)}
      </div>
      <div className="arcane-architecture-explanation" role="status" aria-live="polite"><strong>{current.nodes[step]}</strong><p>{current.notes[step]}</p></div>
      <style>{`
        .arcane-architecture{padding:3rem clamp(1.25rem,6vw,7rem) 7rem;max-width:1450px;margin:auto}.arcane-architecture-tabs{display:flex;flex-wrap:wrap;gap:.75rem;margin:2rem 0}.arcane-architecture-tabs button,.arcane-architecture-step button{color:#eee5ff;border:1px solid #64558a;background:#151a31;border-radius:12px;padding:.9rem 1.2rem;cursor:pointer}.arcane-architecture-tabs button[aria-pressed=true],.arcane-architecture-step button[aria-pressed=true]{background:#3b2866;border-color:#d2b5ff}.arcane-architecture-tabs button:focus-visible,.arcane-architecture-step button:focus-visible{outline:3px solid #f6dfb9;outline-offset:3px}.arcane-architecture-steps{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem}.arcane-architecture-step{display:flex;align-items:center;gap:.5rem}.arcane-architecture-step button{display:flex;flex-direction:column;align-items:flex-start;gap:.6rem;min-width:150px;min-height:95px;text-align:left}.arcane-architecture-step button span{color:#d3b7ff;font-size:.75rem}.arcane-architecture-arrow{color:#cbb2ff;font-size:1.4rem}.arcane-architecture-explanation{margin-top:1.5rem;padding:1.5rem;border:1px solid #6b558f;background:#17172e;border-radius:16px;color:#eee5ff;line-height:1.7}.arcane-architecture-explanation p{margin:.5rem 0 0;color:#c9c6df}@media(max-width:760px){.arcane-architecture-steps{flex-direction:column;align-items:stretch}.arcane-architecture-step{flex-direction:column;align-items:stretch}.arcane-architecture-step button{width:100%;min-height:70px}.arcane-architecture-arrow{transform:rotate(90deg);align-self:center}}
      `}</style>
    </section>
  );
}
