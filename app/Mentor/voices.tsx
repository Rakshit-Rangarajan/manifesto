'use client';
import {useState} from 'react';
type Quote={comment:string;name:string;session:string};
export default function Voices({quotes}:{quotes:Quote[]}){const [index,I]=useState(0);if(!quotes.length)return null;const q=quotes[index%quotes.length];return <div className="voice-carousel"><blockquote key={index}><span aria-hidden="true">“</span><p>{q.comment}</p><footer>{q.name} · {q.session}</footer></blockquote><div className="voice-control"><button type="button" aria-label="Previous testimonial" onClick={()=>I((index+quotes.length-1)%quotes.length)}>‹</button><span aria-live="polite">{index+1} / {quotes.length}</span><button type="button" aria-label="Next testimonial" onClick={()=>I((index+1)%quotes.length)}>›</button></div></div>}
