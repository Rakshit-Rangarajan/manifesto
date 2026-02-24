import About from "@/components/about";
import Contact from "@/components/contact";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import JsonLd from "@/components/JsonLd";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Stats from "@/components/stats";
import { personalInfo } from "@/data/personal-details";

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.meta_title,
    url: "https://rakshitr.co.in",
    image: {
      "@type": "ImageObject",
      url: "https://rakshitr.co.in/opengraph-image",
      width: "1200",
      height: "630",
      caption: `Professional profile of ${personalInfo.meta_title}`,
    },
    sameAs: [
      "https://github.com/Rakshit-Rangarajan",
      "https://www.linkedin.com/in/rakshit-rangarajan-2084b2211/",
    ],
    knowsAbout: personalInfo.skills,
  };
  return (
    <>
      <JsonLd data={personSchema} />
      <Header />
      <main className="relative">
        <Hero />
        <Stats />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
