"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative z-20 bg-zinc-50 dark:bg-[#0a0a0a] w-full pt-32 pb-12 px-6 md:px-20 border-t border-black/5 dark:border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full">

        {/* Massive Typography CTA */}
        <div className="mb-24 md:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[12vw] md:text-[10vw] font-bold tracking-tighter text-zinc-900 dark:text-white leading-none uppercase"
          >
            Let's <br /> <span className="text-zinc-400 dark:text-slate-600">Collaborate.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Contact Details & Socials */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xl md:text-2xl font-light text-zinc-600 dark:text-slate-400 max-w-md leading-relaxed mb-10">
                Open for high-end web architecture, Full-Stack engineering, and AI automation opportunities.
              </p>

              <a
                href="mailto:rakshitr2000@gmail.com"
                className="group inline-flex items-center gap-4 text-3xl md:text-5xl font-semibold text-zinc-900 dark:text-white tracking-tight mb-16"
              >
                rakshitr2000@gmail.com
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all">
                  <ArrowUpRight size={24} />
                </div>
              </a>
            </div>

            <div className="flex gap-6">
              {[
                { icon: <Github size={20} />, href: "https://github.com/Rakshit-Rangarajan" },
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/rakshit-rangarajan-2084b2211/" },
                { icon: <Mail size={20} />, href: "mailto:rakshitr2000@gmail.com" },
                { icon: <BookOpen size={20} />, href: "/blogs" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target={social.href.startsWith("/") ? "_self" : "_blank"}
                  rel={social.href.startsWith("/") ? "" : "noopener noreferrer"}
                  className="w-14 h-14 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-all hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Functional Contact Form mapped to the actual NextJS Route */}
          <div className="bg-white dark:bg-[#0f0f11] border border-black/5 dark:border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl dark:shadow-none">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Send a Message</h3>
            <p className="text-zinc-500 dark:text-slate-400 mb-8 font-light">Fill out the form below and I'll get back to you shortly.</p>

            <form
              className="flex flex-col gap-6"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);

                formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");

                try {
                  const res = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                  });
                  if (res.ok) {
                    alert("Message transmitted successfully! I will be in touch soon.");
                    e.currentTarget.reset();
                  } else {
                    alert("Submission failed. Please try again.");
                  }
                } catch {
                  alert("Network error. Please try again later.");
                }
              }}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-slate-300">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-zinc-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-slate-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-zinc-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-700 dark:text-slate-300">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-zinc-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full mt-2 py-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors active:scale-[0.98]"
              >
                Transmit Message
              </button>
            </form>
          </div>

        </div>

        <div className="mt-32 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 dark:text-slate-500 text-sm font-medium">
          <p>© {new Date().getFullYear()} Rakshit Rangarajan. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Engineered with a lot of<span className="animate-pulse">sleep-less nights</span> and litres of <span className="animate-pulse">coffee</span>.
          </p>
        </div>

      </div>
    </footer>
  );
}
