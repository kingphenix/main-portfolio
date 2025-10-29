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

  return (
    <footer ref={footerRef} className="relative py-12 overflow-hidden border-t border-border/30">
      {/* Background particles */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" style={{
        animationDelay: "2s"
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pheenix. All rights reserved. Built Typescript and lots of coffee.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;