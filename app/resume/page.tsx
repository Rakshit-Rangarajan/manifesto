"use client";

import { useState, useEffect } from "react";
import { Download, Eye, ArrowLeft, Loader2, Mail, Phone, Github, Linkedin, Globe } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  const [isClient, setIsClient] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [PDFViewer, setPDFViewer] = useState<any>(null);
  const [PDFDownloadLink, setPDFDownloadLink] = useState<any>(null);
  const [ATSResumePDF, setATSResumePDF] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    import("@react-pdf/renderer").then((mod) => {
      setPDFViewer(() => mod.PDFViewer);
      setPDFDownloadLink(() => mod.PDFDownloadLink);
    });
    import("@/components/resume/ATSResumePDF").then((mod) => {
      setATSResumePDF(() => mod.default);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-600 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Portfolio</span>
        </Link>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">ATS-Optimized Resume</h1>
                <p className="text-zinc-600 mt-2">Plain white resume, optimized for all applicant tracking systems</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowPDF(!showPDF)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 rounded-full font-medium transition-colors"
                >
                  <Eye size={18} />
                  {showPDF ? "Hide Preview" : "Preview"}
                </button>

                {PDFDownloadLink && ATSResumePDF && (
                  <PDFDownloadLink
                    document={<ATSResumePDF />}
                    fileName="Rakshit_Rangarajan_Resume.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-zinc-800 text-white rounded-full font-medium transition-colors"
                  >
                    {({ loading }: { loading: boolean }) => (
                      <>
                        <Download size={18} />
                        {loading ? "Generating..." : "Download PDF"}
                      </>
                    )}
                  </PDFDownloadLink>
                )}
              </div>
            </div>

            {showPDF && PDFViewer && ATSResumePDF ? (
              <div className="h-[80vh] border border-zinc-300 rounded-lg overflow-hidden shadow-lg">
                <PDFViewer className="w-full h-full" showToolbar>
                  <ATSResumePDF />
                </PDFViewer>
              </div>
            ) : (
              <div className="bg-white p-8 shadow-lg max-w-3xl mx-auto font-sans text-sm pb-16">
                <div className="mb-6 flex flex-col items-center">
                  <h1 className="text-3xl tracking-[0.1em] font-bold text-blue-600 mb-2 uppercase">RAKSHIT RANGARAJAN</h1>
                  <p className="text-sm text-zinc-700 font-medium whitespace-nowrap">Full-Stack Developer | AI Enthusiast | Software Engineer</p>
                </div>

                <div className="flex flex-col gap-1.5 mb-8 items-start">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-pink-600" />
                    <a href="mailto:rakshitr2000@gmail.com" className="text-blue-800 hover:underline">rakshitr2000@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" width="16" height="16" className="text-emerald-500">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <a href="https://wa.me/447823640897" className="text-blue-800 hover:underline" target="_blank" rel="noreferrer">+44 78236 40897</a>
                    <span className="text-zinc-300 mx-1">|</span>
                    <Phone size={16} className="text-zinc-800" />
                    <a href="tel:+918217630327" className="text-blue-800 hover:underline">+91 82176 30327</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github size={16} className="text-zinc-800" />
                    <a href="https://github.com/Rakshit-Rangarajan" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline">https://github.com/Rakshit-Rangarajan</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin size={16} className="text-blue-600" />
                    <a href="https://www.linkedin.com/in/rakshit-rangarajan/" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline">https://www.linkedin.com/in/rakshit-rangarajan/</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-zinc-600" />
                    <a href="https://rakshitr.co.in" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline">https://rakshitr.co.in</a>
                  </div>
                </div>

                <section className="mb-6">
                  <div className="border-t-[3px] border-b-[2px] border-blue-600 py-1 mb-3">
                    <h2 className="text-[13px] font-bold uppercase tracking-wider text-blue-600">Professional Summary</h2>
                  </div>
                  <p className="text-sm text-zinc-700 text-justify">
                    Results-oriented Full-Stack Developer with over 2 years of experience in building enterprise-grade web applications. Recently completed MSc in Artificial Intelligence at Cardiff University with Merit. Skilled in leveraging AI tools to automate workflows, optimize development processes, and enhance application security. Passionate about building innovative, scalable solutions that combine cutting-edge AI with practical application development.
                  </p>
                </section>

                <section className="mb-6">
                  <div className="border-t-[3px] border-b-[2px] border-blue-600 py-1 mb-3">
                    <h2 className="text-[13px] font-bold uppercase tracking-wider text-blue-600">Professional Experience</h2>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <p className="font-bold">Software Engineer (Full-Stack Developer)</p>
                      <p className="text-sm text-zinc-600">Apr 2022 - Jun 2024</p>
                    </div>
                    <p className="font-bold text-blue-600 mb-2">BrandMuscle India Pvt Ltd (Acquired by Ansira in 2024)</p>
                    <ul className="text-sm text-zinc-700 space-y-1">
                      <li>• Managed and optimized MongoDB database operations, developing console applications for efficient data retrieval and reporting, reducing report generation time by 80%</li>
                      <li>• Developed automation workflows using Power Automate and Azure Data Factory to streamline data fetching and reporting processes</li>
                      <li>• Enhanced application security by resolving 50+ critical vulnerabilities flagged by SonarQube and Snyk, achieving 100% security compliance score</li>
                      <li>• Designed, tested, and automated complex business workflows using Camunda and JAMS for reliable execution of critical processes</li>
                      <li>• Led application upgrades including Formio, Angular, and .NET frameworks, improving performance and maintainability</li>
                      <li>• Spearheaded GitHub Copilot integration across the team, training 15 engineers and increasing coding efficiency by 10%</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-6">
                  <div className="border-t-[3px] border-b-[2px] border-blue-600 py-1 mb-3">
                    <h2 className="text-[13px] font-bold uppercase tracking-wider text-blue-600">Technical Skills</h2>
                  </div>

                  <div className="mb-2">
                    <p className="font-bold text-sm text-blue-600">Frontend:</p>
                    <p className="text-sm text-zinc-700">React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Bootstrap, Angular</p>
                  </div>

                  <div className="mb-2">
                    <p className="font-bold text-sm text-blue-600">Backend:</p>
                    <p className="text-sm text-zinc-700">Node.js, Python, .NET, C#, PHP, Java, SQL, MongoDB, REST APIs</p>
                  </div>

                  <div className="mb-2">
                    <p className="font-bold text-sm text-blue-600">AI and Automation:</p>
                    <p className="text-sm text-zinc-700">Cursor, Claude, ChatGPT, Gemini, Perplexity, Ollama, Pinecone, n8n, Power Automate, Camunda, Selenium</p>
                  </div>

                  <div>
                    <p className="font-bold text-sm text-blue-600">Tools and Platforms:</p>
                    <p className="text-sm text-zinc-700">VS Code, Git, Docker, Kubernetes, Azure, Firebase, Figma, Jira</p>
                  </div>
                </section>

                <section className="mb-6">
                  <div className="border-t-[3px] border-b-[2px] border-blue-600 py-1 mb-3">
                    <h2 className="text-[13px] font-bold uppercase tracking-wider text-blue-600">Projects</h2>
                  </div>

                  <div className="mb-4">
                    <p className="font-bold">OrbBot - AI Chat Widget</p>
                    <p className="text-xs text-blue-600">React, Next.js, Pinecone, Puter.js</p>
                    <p className="text-sm text-zinc-700 mt-1">Drop-in AI chat widget for any website featuring Pinecone RAG and zero-config deployment without backend or API keys.</p>
                  </div>

                  <div className="mb-4">
                    <p className="font-bold">Say Cymraeg - Welsh Language Learning App</p>
                    <p className="text-xs text-blue-600">Next.js, Ollama, Firebase, Bootstrap</p>
                    <p className="text-sm text-zinc-700 mt-1">AI-powered Welsh language learning platform with personalized learning paths. Deployed with 500+ active learners and 40% retention improvement.</p>
                  </div>

                  <div className="mb-4">
                    <p className="font-bold">ForgeFit - AI Fitness Trainer</p>
                    <p className="text-xs text-blue-600">Next.js, Docker, Node.js, Ollama, MongoDB</p>
                    <p className="text-sm text-zinc-700 mt-1">Privacy-focused, self-hostable AI training application for dynamic workout plans and fitness progress tracking.</p>
                  </div>

                  <div>
                    <p className="font-bold">Rakshantara - AI Journaling App</p>
                    <p className="text-xs text-blue-600">Next.js, Gemini API, Firebase</p>
                    <p className="text-sm text-zinc-700 mt-1">AI-powered digital journaling app with blog publishing, personal journals, and dream journals enhanced with Gemini AI.</p>
                  </div>
                </section>

                <section className="mb-6">
                  <div className="border-t-[3px] border-b-[2px] border-blue-600 py-1 mb-3">
                    <h2 className="text-[13px] font-bold uppercase tracking-wider text-blue-600">Education</h2>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between">
                      <p className="font-bold">Master of Science in Artificial Intelligence</p>
                      <p className="text-sm text-zinc-600">2024-2025</p>
                    </div>
                    <p className="text-blue-600">Cardiff University, UK</p>
                    <p className="text-sm text-zinc-600">Merit</p>
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <p className="font-bold">Bachelor of Engineering in Information Science</p>
                      <p className="text-sm text-zinc-600">2018-2022</p>
                    </div>
                    <p className="text-blue-600">Rajeev Institute of Technology (VTU), India</p>
                    <p className="text-sm text-zinc-600">First Class</p>
                  </div>
                </section>

                <section>
                  <div className="border-t-[3px] border-b-[2px] border-blue-600 py-1 mb-3">
                    <h2 className="text-[13px] font-bold uppercase tracking-wider text-blue-600">Achievements</h2>
                  </div>
                  <ul className="text-sm text-zinc-700 space-y-1">
                    <li>• 2nd Runner-up at Cardiff University AI Hackathon with AMPLYFI</li>
                    <li>• Resolved 50+ critical vulnerabilities, achieving 100% security compliance</li>
                    <li>• Led GitHub Copilot adoption for 15 engineers with documented 10% velocity increase</li>
                    <li>• Delivered workshops on Web Development, Python, QA Testing, and Generative AI</li>
                    <li>• Part of the core Technical Team and GLUG during Bachelor's</li>
                  </ul>
                </section>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}