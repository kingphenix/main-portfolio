import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import FlickerText from "./ui/FlickerText";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 ds-digital-bold">
          <FlickerText text="Let's Connect" className="glow-text" flickerDuration={1000} />
        </h2>

        {/* Main message text */}
        <div className="text-center mb-16">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-relaxed ds-digital-bold">
            Got a question, proposal, project, or want to work together on something?
          </p>
        </div>

        {/* Social Links */}
        <div
          ref={iconsRef}
          className="flex justify-center gap-8 mt-12"
        >
          <a
            href="https://github.com/kingphenix"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full glass-card flex items-center justify-center hover:glow-effect-accent transition-all hover:scale-110"
          >
            <Github className="w-8 h-8" />
          </a>
          <a
            href="https://twitter.com/pheenix_x"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full glass-card flex items-center justify-center hover:glow-effect-accent transition-all hover:scale-110"
          >
            <Twitter className="w-8 h-8" />
          </a>
          <a
            href="mailto:josephpheenix10@gmail.com"
            className="w-16 h-16 rounded-full glass-card flex items-center justify-center hover:glow-effect-accent transition-all hover:scale-110"
          >
            <Mail className="w-8 h-8" />
          </a>
        </div>

        {/* Call to action text */}
        <div className="text-center mt-16">
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            Don't hesitate to reach out
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
