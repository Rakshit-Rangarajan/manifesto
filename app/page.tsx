import Header from "@/components/header";
import Link from "next/link";
import Experience from "@/components/experience";
import ArcaneConstellation from "@/components/arcane-constellation";
import Skills from "@/components/skills";
import Background from "@/components/background";
import Hero from "@/components/hero";
import Manifesto from "@/components/manifesto";
import PortfolioShowcase from "@/components/portfolio-showcase";
import AIExpertise from "@/components/ai-expertise";
import ImpactAndProof from "@/components/impact-and-proof";
import About from "@/components/about";
import Education from "@/components/education";
import { Certificates, Achievements } from "@/components/achievements";
import Footer from "@/components/footer";
import ScrollProgress from "@/components/scroll-progress";
import AITools from "@/components/ai-tools";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <Background />
      <main id="main-content" className="relative flex flex-col items-center">
        <section aria-label="Arcane Engineer redesign preview" className="w-full border-b border-violet-400/20 bg-gradient-to-r from-[#0d1128] via-[#24143e] to-[#102b44] px-5 py-5 text-center text-white"><p className="text-xs font-bold uppercase tracking-[.25em] text-violet-200">New · The Arcane Engineer</p><p className="mt-2 font-serif text-xl italic md:text-2xl">Engineering the impossible, where logic meets a little magic.</p><Link href="/arcane-preview" className="mt-3 inline-flex rounded-full border border-violet-200/70 px-5 py-2 text-sm font-semibold transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Explore the interactive V3 experience →</Link></section>
        <Hero />
        <About />
        <PortfolioShowcase />
        <AIExpertise />
        <ImpactAndProof />
        <Manifesto />
        <AITools />
        <Skills />
        <ArcaneConstellation />
        <Experience />
        <Education />
        <Achievements />
        <Certificates />
      </main>
      <Footer />
    </>
  );
}
