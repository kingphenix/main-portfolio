import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import profileImg from "@/assets/profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML", icon: <img src="/icons/html-5-svgrepo-com.svg" alt="HTML" className="w-8 h-8" /> },
  { name: "CSS", icon: <img src="/icons/css-3-svgrepo-com.svg" alt="CSS" className="w-8 h-8" /> },
  { name: "JavaScript", icon: <img src="/icons/js-svgrepo-com.svg" alt="JavaScript" className="w-8 h-8" /> },
  { name: "React", icon: <img src="/icons/react-svgrepo-com.svg" alt="React" className="w-8 h-8" /> },
  { name: "TypeScript", icon: <img src="/icons/js-svgrepo-com.svg" alt="TypeScript" className="w-8 h-8" /> },
  { name: "Framer Motion", icon: <img src="/icons/framer-svgrepo-com.svg" alt="Framer Motion" className="w-8 h-8" /> },
  { name: "Tailwind", icon: <img src="/icons/tailwind-svgrepo-com.svg" alt="Tailwind" className="w-8 h-8" /> },
  { name: "GSAP", icon: <img src="/icons/framer-svgrepo-com.svg" alt="GSAP" className="w-8 h-8" /> },
  { name: "Angular", icon: <img src="/icons/angular-svgrepo-com.svg" alt="Angular" className="w-8 h-8" /> },
  { name: "Vue", icon: <img src="/icons/vue-svgrepo-com.svg" alt="Vue" className="w-8 h-8" /> },
  { name: "Git", icon: <img src="/icons/git-svgrepo-com.svg" alt="Git" className="w-8 h-8" /> },
  { name: "Node.js", icon: <img src="/icons/node-js-svgrepo-com.svg" alt="Node.js" className="w-8 h-8" /> },
  { name: "NPM", icon: <img src="/icons/npm-svgrepo-com.svg" alt="NPM" className="w-8 h-8" /> },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      direction: "ltr",
      duration: 20,
      align: "start",
      slidesToScroll: "auto",
      dragFree: true,
      containScroll: "trimSnaps",
      breakpoints: {
        '(max-width: 480px)': {
          slidesToScroll: 1,
          duration: 15
        },
        '(min-width: 481px) and (max-width: 640px)': {
          slidesToScroll: 2,
          duration: 15
        },
        '(min-width: 641px) and (max-width: 768px)': {
          slidesToScroll: 3,
          duration: 18
        },
        '(min-width: 769px)': {
          slidesToScroll: 4,
          duration: 20
        }
      }
    },
    [Autoplay({ delay: 2000, stopOnInteraction: true })]
  );

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Profile Image */}
          <div ref={imageRef} className="flex-shrink-0 mx-auto md:mx-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 group-hover:border-primary/60 transition-all group-hover:scale-105 duration-500">
                <img
                  src={profileImg}
                  alt="Pheenix - Frontend Developer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="flex-1 w-full space-y-4 md:space-y-6 max-w-none md:max-w-2xl text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold glow-text">
              About Me
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words hyphens-auto overflow-wrap-anywhere">
              I'm a passionate frontend developer who transforms ideas into
              stunning digital realities. With a keen eye for design and a deep
              understanding of modern web technologies, I create immersive
              experiences that captivate users and drive results.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words hyphens-auto overflow-wrap-anywhere">
              My expertise spans across cutting-edge frameworks and animation
              libraries, allowing me to build interfaces that are not just
              functional, but truly memorable.
            </p>

            {/* Skills Carousel */}
            <div ref={emblaRef} className="overflow-hidden pt-4 md:pt-6 select-none">
              <div className="flex gap-2 sm:gap-3 md:gap-4 touch-pan-x">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex-shrink-0 glass-card p-2 sm:p-3 md:p-4 rounded-xl hover:glow-effect transition-all duration-300 hover:scale-110 cursor-pointer group min-w-[80px] xs:min-w-[90px] sm:min-w-[100px] md:min-w-[120px] active:scale-95"
                  >
                    <div className="text-xl sm:text-2xl md:text-4xl mb-1 sm:mb-2 group-hover:scale-125 transition-transform">
                      {skill.icon}
                    </div>
                    <p className="text-xs text-center text-muted-foreground leading-tight">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
