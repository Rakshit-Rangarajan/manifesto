"use client";

import { motion } from "framer-motion";
import { Award, Medal } from "lucide-react";

const certificatesData = [
  {
    id: 1,
    title: "Artificial Intelligence A-Z 2025",
    issuer: "Udemy",
    instructors: ["Hadelin de Ponteves", "Kirill Eremenko", "Luka Anicin"],
    year: "2025",
    description: "Comprehensive AI training covering machine learning, neural networks, and deep learning fundamentals.",
    link: "https://udemy-certificate.s3.amazonaws.com/image/UC-3c231775-d2e8-409e-a087-7dae949c59b4.jpg?v=1772096407000"
  },
  {
    id: 2,
    title: "Unit Testing For C# Developers",
    issuer: "Udemy",
    instructors: ["Mosh Hamedani"],
    year: "2024",
    description: "Master unit testing with xUnit, Moq, and FluentAssertions. Learn to write maintainable, testable C# code and build a solid testing foundation.",
    link: "https://udemy-certificate.s3.amazonaws.com/image/UC-7404e2b1-3740-4426-8f89-82e7725ece62.jpg?v=1717325808000"
  }
];

const achievementsData = [
  {
    id: 1,
    title: "2nd Runner-Up: Natural Language Processing Hackathon",
    issuer: "Cardiff University in colaboration with AMPLYFI",
    year: "2025",
    description: "Competed against the university students to architect and deploy a cutting-edge Natural Language Processing Application.",
  },
  {
    id: 2,
    title: "Delivered Guest Lecture on Selenium and Automated Testing",
    issuer: "Rajeev Institute of Technology, Hassan",
    year: "2024",
    description: "Delivered lectures and trained the junior students on Selenium and Automated Testing.",
  },
  {
    id: 3,
    title: "100% Compliance Score in Fixing Code Vulnerabilities",
    issuer: "BrandMuscle India Pvt Ltd",
    year: "2023-2024",
    description: "Successfully resolved 50+ critical zero-day vulnerabilities across legacy APIs.",
  },
  {
    id: 4,
    title: "15+ Engineers Training On Github Copilot and AI Utilisation",
    issuer: "BrandMuscle India Pvt Ltd",
    year: "2024",
    description: "Conducted training sessions for 15+ engineers on Github Copilot and AI Utilisation and helped better utilise AI in their daily tasks.",
  },
  {
    id: 5,
    title: "Delivered Lectures on Python Programming Basics",
    issuer: "Rajeev Institute of Technology, Hassan",
    year: "2020-2022",
    description: "Delivered lectures and trained the junior students on Python Programming Basics.",
  },
  {
    id: 6,
    title: "Delivered Lectures on Web Development Basics",
    issuer: "Rajeev Institute of Technology, Hassan",
    year: "2020-2022",
    description: "Delivered lectures and trained the junior students on Web Development Basics.",
  }
];

const Certificates = () => {
  return (
    <section id="certificates" className="relative z-20 bg-transparent w-full min-h-[80vh] py-32 md:py-48 px-6 md:px-20 border-t border-black/5 dark:border-white/5">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col items-start">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-sm md:text-base font-medium tracking-widest uppercase mb-4">
            Validated Skills
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-[1.1]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Certificates.</span>
          </h2>
          <p className="mt-6 text-xl text-zinc-600 dark:text-slate-400 max-w-2xl">
            Professional certifications that validate my technical expertise.
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificatesData.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/50 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500 shadow-xl dark:shadow-none min-h-[280px] group"
            >
              <div>
                <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Award size={24} />
                </div>
                <p className="text-sm font-medium text-primary tracking-widest uppercase mb-3">
                  {cert.year}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white leading-tight mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm font-medium text-zinc-500 dark:text-slate-500 uppercase tracking-wider mb-4">
                  {cert.issuer}
                </p>
                <p className="text-sm font-medium text-zinc-500 dark:text-slate-500 uppercase tracking-wider mb-4">
                  Instructors: {cert.instructors.join(", ")}
                </p>
              </div>

              <p className="text-zinc-600 dark:text-slate-400 font-light text-sm md:text-base leading-relaxed mb-6">
                {cert.description}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (cert.link && cert.link !== "#") {
                    window.open(cert.link, "_blank", "noopener,noreferrer");
                  } else {
                    alert("Certificate link not available yet!");
                  }
                }}
                className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors font-bold text-xs uppercase tracking-widest relative z-50 cursor-pointer"
              >
                <span>🎖</span>
                View Certificate
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

const Achievements = () => {
  return (
    <section id="achievements" className="relative z-20 bg-transparent w-full min-h-[80vh] py-32 md:py-48 px-6 md:px-20 border-t border-black/5 dark:border-white/5">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col items-start">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-sm md:text-base font-medium tracking-widest uppercase mb-4">
            Recognition
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-[1.1]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Achievements.</span>
          </h2>
          <p className="mt-6 text-xl text-zinc-600 dark:text-slate-400 max-w-2xl">
            Milestones that mark my journey of technical excellence.
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/50 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500 shadow-xl dark:shadow-none min-h-[240px] group"
            >
              <div>
                <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Medal size={24} />
                </div>
                <p className="text-sm font-medium text-primary tracking-widest uppercase mb-3">
                  {award.year}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white leading-tight mb-2">
                  {award.title}
                </h3>
                <p className="text-sm font-medium text-zinc-500 dark:text-slate-500 uppercase tracking-wider mb-4">
                  {award.issuer}
                </p>
              </div>

              <p className="text-zinc-600 dark:text-slate-400 font-light text-sm md:text-base leading-relaxed">
                {award.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export { Certificates, Achievements };
