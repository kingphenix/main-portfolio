import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import project1 from "@/assets/project-1.png";
import project2 from "@/assets/project-2.png";
import project3 from "@/assets/project-3.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Paintball with Policy",
    description: "An immersive gaming platform with epic sessions and top-tier gear for adventure seekers.",
    image: project1,
    tech: ["React", "Tailwind", "GSAP"],
    link: "#",
  },
  {
    id: 2,
    title: "Developer Portfolio",
    description: "A sophisticated portfolio showcasing projects with interactive bento grid layout.",
    image: project2,
    tech: ["React", "TypeScript", "Framer Motion"],
    link: "#",
  },
  {
    id: 3,
    title: "Product Designer Site",
    description: "Transforming ideas into reality with intuitive and engaging user experiences.",
    image: project3,
    tech: ["React", "Tailwind", "Three.js"],
    link: "#",
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description: "Modern shopping experience with seamless checkout and product discovery.",
    image: project1,
    tech: ["Next.js", "Stripe", "Supabase"],
    link: "#",
  },
  {
    id: 5,
    title: "SaaS Dashboard",
    description: "Analytics and management dashboard with real-time data visualization.",
    image: project2,
    tech: ["React", "D3.js", "Node.js"],
    link: "#",
  },
  {
    id: 6,
    title: "Creative Agency",
    description: "Award-winning agency website with stunning animations and storytelling.",
    image: project3,
    tech: ["GSAP", "React", "WebGL"],
    link: "#",
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children || [],
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        }
      );
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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 glow-text">
          Featured Projects
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
