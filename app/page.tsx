import Header from "@/components/header";
import Experience from "@/components/experience";
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
        <Hero />
        <About />
        <PortfolioShowcase />
        <AIExpertise />
        <ImpactAndProof />
        <Manifesto />
        <AITools />
        <Skills />
        <Experience />
        <Education />
        <Achievements />
        <Certificates />
      </main>
      <Footer />
    </>
  );
}
