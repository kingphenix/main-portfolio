import { useEffect, useState } from "react";
import { gsap } from "gsap";
import FlickerText from './ui/FlickerText';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // GSAP animation to fade out preloader
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.to(".progress-bar", {
        opacity: 0,
        duration: 0.3,
      })
      .to(".preloader", {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [progress, onComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow-pulse" />
      
      {/* Logo/Brand */}
      <div className="relative z-10 mb-12 text-center">
        <h1 className="text-6xl md:text-8xl font-bold glow-text ds-digital-bold mb-4">
          Pheenix
        </h1>
        <h2 className="text-2xl md:text-3xl text-primary ds-digital-bold">
          <FlickerText text="Welcome" className="text-primary" flickerDuration={1000} />
        </h2>
      </div>

      {/* Progress bar */}
      <div className="progress-bar relative z-10 w-64 md:w-96">
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out glow-effect"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-center mt-4 text-sm text-muted-foreground ds-digital-bold text-xl">
          {Math.floor(Math.min(progress, 100))}%
        </p>
      </div>
    </div>
  );
};

export default Preloader;
