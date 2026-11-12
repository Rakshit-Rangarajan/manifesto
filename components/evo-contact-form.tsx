"use client";
import {useState,type FormEvent} from "react";
import {ArrowUpRight,Send,ShieldCheck} from "lucide-react";
export default function ContactForm(){
 const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
 const [message,setMessage]=useState("");
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(status==="sending")return;
  const form=e.currentTarget;const data=new FormData(form);
  if(String(data.get("_honey")||"").trim())return;
  setStatus("sending");setMessage("");
  try{
   const response=await fetch("https://formsubmit.co/ajax/rakshitr2000@gmail.com",{method:"POST",headers:{"Accept":"application/json"},body:data});
   const result=await response.json();
   if(!response.ok||result.success===false||result.success==="false")throw new Error("Delivery request could not be accepted.");
   setStatus("success");setMessage("Message submitted. If this is the first submission, the inbox owner must activate FormSubmit before delivery begins.");form.reset();
  }catch{setStatus("error");setMessage("The message could not be sent. Please email me directly instead.");}
 }
 return <form className="evo-message-form" onSubmit={submit} aria-label="Send Rakshit a message">
  <div className="evo-form-heading"><div><span className="evo-kicker">/ DIRECT CHANNEL</span><h3>Start a conversation</h3><p>Tell me what you're building, solving, or imagining.</p></div><Send size={25}/></div>
  <div className="evo-form-two"><label>Your name <input name="name" autoComplete="name" required minLength={2} maxLength={120} placeholder="Your name"/></label><label>Your email <input type="email" name="email" autoComplete="email" required maxLength={254} placeholder="you@example.com"/></label></div>
  <label>What is this about?<select name="topic" required defaultValue=""><option value="" disabled>Select a topic</option><option>AI & automation project</option><option>Engineering collaboration</option><option>Job opportunity</option><option>General conversation</option></select></label>
  <label>Your message <textarea name="message" required minLength={15} maxLength={5000} rows={5} placeholder="The problem, your idea, or what you'd like to discuss…"/></label>
  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="evo-form-trap" aria-hidden="true"/>
  <input type="hidden" name="_subject" value="New message from Rakshit's portfolio"/>
  <input type="hidden" name="_captcha" value="true"/>
  <input type="hidden" name="_template" value="table"/>
  <button type="submit" disabled={status==="sending"}>{status==="sending"?"Sending…":"Send message"} <ArrowUpRight size={18}/></button>
  <div className="evo-form-footnote"><ShieldCheck size={15}/> Sent to rakshitr2000@gmail.com via FormSubmit. No account required.</div>
  {message&&<p role="status" className={status==="error"?"evo-form-error":"evo-form-success"}>{message}</p>}
 </form>;
}
