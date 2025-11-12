import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import FlickerText from "./ui/FlickerText";
import project1 from "@/assets/project-1.png";
import project2 from "@/assets/project-2.png";
import project3 from "@/assets/project-3.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Paintball with Policy",
    description: "A stunning webshop built for one of the biggest paintball brands in Nigeria. Designed for paintball enthusiasts, offering a seamless online experience for players, teams, and event organizers.",
    image: project1,
    tech: ["React", "Tailwind", "Typescrip"],
    link: "https://policypaintball.vercel.app",
  },
  {
    id: 2,
    title: "Crypto Price Track",
    description: "A real-time cryptocurrency monitoring webapp to help users track market trends, prices, and portfolio performance. Built with modern web technologies, this app provides a seamless and intuitive user experience.",
    image: project2,
    tech: ["React", "TypeScript", "ShadCN"],
    link: "#https://github.com/kingphenix/crypto-price-watch",
  },
  {
    id: 3,
    title: "Framer Portfolio Site",
    description: "A sleek and modern portfolio site designed to showcase my skills and projects. Built with Framer, this site features a clean and intuitive interface, smooth animations, and seamless interactions.",
    image: project3,
    tech: ["Framer", "HTML", "CSS"],
    link: "#",
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    // Check for reduced motion preference
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!sectionRef.current || prefersReducedMotion.current) return;

    const ctx = gsap.context(() => {
      const projectCards = gsap.utils.toArray<HTMLElement>('.glass-card');
      
      // Only animate if not already visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo(entry.target,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                clearProps: "transform"
              }
            );
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      projectCards.forEach(card => observer.observe(card));

      return () => observer.disconnect();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10 md:opacity-20" />
      <div className="absolute top-20 right-0 left-0 mx-auto w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 lg:mb-20">
          <FlickerText 
            text="Featured Projects" 
            className="glow-text text-3xl sm:text-4xl lg:text-5xl" 
            flickerDuration={1000} 
          />
        </h2>

        {/* Projects Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project) => (
            <article
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden group hover:glow-effect transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
              aria-labelledby={`project-${project.id}-title`}
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt=""
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-70" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 space-y-4">
                <h3 
                  id={`project-${project.id}-title`}
                  className="text-xl sm:text-2xl font-bold text-foreground line-clamp-2"
                >
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[10px] sm:text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 group/btn border-primary/20 hover:border-primary hover:bg-primary/10 h-10 sm:h-9 text-sm"
                  asChild
                >
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    View Project
                    <ExternalLink className="ml-2 h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
