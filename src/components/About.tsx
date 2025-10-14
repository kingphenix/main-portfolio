import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "@/assets/profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML", icon: "🌐" },
  { name: "CSS", icon: "🎨" },
  { name: "JavaScript", icon: "⚡" },
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
  { name: "Framer Motion", icon: "🎬" },
  { name: "Tailwind", icon: "🎯" },
  { name: "GSAP", icon: "🚀" },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          x: -100,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          x: 100,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        iconsRef.current?.children || [],
        {
          opacity: 0,
          scale: 0.5,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: iconsRef.current,
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
      id="about"
      className="relative py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/30 group-hover:border-primary/60 transition-all group-hover:scale-105 duration-500">
                <img
                  src={profileImg}
                  alt="Pheenix - Frontend Developer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold glow-text">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate frontend developer who transforms ideas into
              stunning digital realities. With a keen eye for design and a deep
              understanding of modern web technologies, I create immersive
              experiences that captivate users and drive results.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My expertise spans across cutting-edge frameworks and animation
              libraries, allowing me to build interfaces that are not just
              functional, but truly memorable.
            </p>

            {/* Skills Grid */}
            <div ref={iconsRef} className="grid grid-cols-4 gap-4 pt-6">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="glass-card p-4 rounded-xl hover:glow-effect transition-all duration-300 hover:scale-110 cursor-pointer group"
                >
                  <div className="text-4xl mb-2 group-hover:scale-125 transition-transform">
                    {skill.icon}
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
