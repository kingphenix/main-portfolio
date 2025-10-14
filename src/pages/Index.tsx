import { useState } from "react";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      {!showContent && <Preloader onComplete={() => setShowContent(true)} />}
      {showContent && (
        <>
          <Header />
          <main className="min-h-screen">
            <Hero />
            <About />
            <Projects />
            <Contact />
            <Footer />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
