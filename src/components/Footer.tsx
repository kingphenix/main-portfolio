import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current, {
        opacity: 0,
        y: 60,
        filter: "blur(10px)"
      }, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%"
        }
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <footer ref={footerRef} className="relative py-12 overflow-hidden border-t border-border/30">
      {/* Background particles */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" style={{
      animationDelay: "2s"
    }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold glow-text">Pheenix</h3>
            <p className="text-sm text-muted-foreground mt-1">Frontend Developer
          </p>
          </div>

          {/* Navigation */}
          <nav className="flex gap-6">
            <button onClick={() => scrollToSection("home")} className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("about")} className="text-muted-foreground hover:text-primary transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("projects")} className="text-muted-foreground hover:text-primary transition-colors">
              Projects
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </button>
          </nav>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-8 border-t border-border/20">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pheenix. All rights reserved. Built with passion and GSAP.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;