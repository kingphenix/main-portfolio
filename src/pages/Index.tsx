import { useState, lazy, Suspense } from "react";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Lazy load heavy components
const Hero = lazy(() => import("@/components/Hero"));
const About = lazy(() => import("@/components/About"));
const Projects = lazy(() => import("@/components/Projects"));
const Contact = lazy(() => import("@/components/Contact"));

const Index = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      {!showContent && <Preloader onComplete={() => setShowContent(true)} />}
      {showContent && (
        <>
          <Header />
          <main className="min-h-screen">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <Hero />
            </Suspense>
            <Suspense fallback={<div className="py-20 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <About />
            </Suspense>
            <Suspense fallback={<div className="py-20 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <Projects />
            </Suspense>
            <Suspense fallback={<div className="py-20 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <Contact />
            </Suspense>
            <Footer />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
