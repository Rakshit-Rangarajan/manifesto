"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Shield, Users, MapPin, Coffee } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const About = () => {
  return (
    <section id="about" className="section-container bg-secondary/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="section-title text-center">About Me</h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-card border border-border rounded-xl p-8 mb-8"
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            I'm a software engineer who thrives at the intersection of
            <span className="text-foreground font-medium">
              {" "}
              full-stack development
            </span>{" "}
            and
            <span className="text-foreground font-medium">
              {" "}
              artificial intelligence
            </span>
            . After two years building production systems at BrandMuscle -
            squashing 50+ security vulnerabilities, automating workflows, and
            championing AI tools - I moved to Cardiff to pursue an MSc in AI.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            That journey led me to a 2nd place finish at the Cardiff University
            AI Hackathon with AMPLYFI, and projects like{" "}
            <span className="text-primary font-medium">Sanjana</span>, a
            cross-platform AI assistant I'm building with local and cloud LLMs.
            I believe the best software solves real problems - whether that's
            helping farmers sell produce directly or making the Welsh language
            more accessible through AI.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            When I'm not coding, I'm probably mentoring juniors on Python and
            GenAI, experimenting with new automation workflows, or exploring the
            Welsh countryside.
          </p>

          <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-4">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={14} className="text-primary" />
              {personalInfo.location}
            </span>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Coffee size={14} className="text-primary" />
              Open to opportunities
            </span>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: Brain,
              title: "AI & Innovation",
              desc: "MSc in AI with hands-on experience building LLM-powered apps using Ollama, Claude, and Gemini.",
            },
            {
              icon: Code2,
              title: "Full-Stack Craft",
              desc: "From Angular frontends to MongoDB backends, .NET APIs to Firebase - I build end-to-end.",
            },
            {
              icon: Shield,
              title: "Security-First",
              desc: "Resolved 50+ SonarQube/Snyk vulnerabilities. 100% compliance score on production apps.",
            },
            {
              icon: Users,
              title: "Team Multiplier",
              desc: "Trained 15 engineers on GitHub Copilot. Led weekend workshops on Python, QA, and GenAI tools.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 card-hover group"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
