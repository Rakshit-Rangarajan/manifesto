import Header from "@/components/header";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import Background from "@/components/background";
import Hero from "@/components/hero";
import PortfolioShowcase from "@/components/portfolio-showcase";
import About from "@/components/about";
import Education from "@/components/education";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Background />
      <main id="main-content" className="anime-portfolio relative flex flex-col items-center">
        <Hero />
        <About />
        <PortfolioShowcase />
        <Skills />
        <Experience />
        <Education />
      </main>
      <Footer />
    </>
  );
}
