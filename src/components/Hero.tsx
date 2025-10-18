import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Swirl from "./swirl";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        headlineRef.current,
        {
          opacity: 0,
          y: 50,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        }
      )
      .fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://my.spline.design/vaporwavebackground-n4PxA5tFik5tmoDrZ7zqWZTA/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
          title="3D Background"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
        {/* Left Side - Text Content */}
        <div className="text-left space-y-6">
          <h1
            ref={headlineRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold glow-text"
          >
            Hi, I'm <span className="text-primary ds-digital-bold">Pheenix</span>
            <br />
            <span className="text-accent font-rajdhani">Frontend Developer</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground max-w-xl"
          >
            Crafting immersive digital experiences with cutting-edge technologies
          </p>

          <div ref={ctaRef}>
            <Button
              size="lg"
              onClick={scrollToContact}
              className="group bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:scale-105 transition-all duration-300 glow-effect text-lg px-8 py-6"
            >
              Let's Work Together
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Right Side - Swirl Animation */}
        <div className="hidden lg:block h-[500px] relative">
          <div className="relative w-full h-full">
            {/* Swirl Component */}
            <div className="absolute inset-0">
              <Swirl />
            </div>
          </div>
        </div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
    </section>
  );
};

export default Hero;
