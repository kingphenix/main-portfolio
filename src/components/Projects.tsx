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

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Optimized: Batch animation for all project cards
      const projectCards = gsap.utils.toArray('.glass-card');

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(projectCards,
            {
              opacity: 0,
              y: 40,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.15,
              ease: "power2.out"
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-40 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <FlickerText text="Featured Projects" className="glow-text" flickerDuration={1000} />
        </h2>

        {/* Projects Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden group hover:glow-effect transition-all duration-500 hover:-translate-y-2"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  {project.title}
                </h3>
                <p className="text-muted-foreground">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  variant="outline"
                  className="w-full group/btn border-primary/30 hover:border-primary hover:bg-primary/10"
                  asChild
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                    <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
