import Header from "@/components/header";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import Background from "@/components/background";
import Hero from "@/components/hero";
import Manifesto from "@/components/manifesto";
import Projects from "@/components/projects";
import About from "@/components/about";
import Education from "@/components/education";
import { Certificates, Achievements } from "@/components/achievements";
import Preloader from "@/components/preloader";
import Footer from "@/components/footer";
import ScrollProgress from "@/components/scroll-progress";
import AITools from "@/components/ai-tools";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  return (
    <>
      <AnimatePresence mode="wait">
        <Preloader key="preloader" />
      </AnimatePresence>
      <ScrollProgress />
      <Header />
      <Background />
      <main id="main-content" className="relative flex flex-col items-center">
        <Hero />
        <About />
        <Manifesto />
        <Projects />
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
