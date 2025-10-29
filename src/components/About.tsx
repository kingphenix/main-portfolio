import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import profileImg from "@/assets/profile.jpg";
import FlickerText from "./ui/FlickerText";

// Initialize autoplay plugin with even faster speed
const autoplayOptions = { 
  delay: 1800, // 1.8 seconds per slide
  stopOnInteraction: false,
  stopOnMouseEnter: true,
  stopOnLastSnap: false
};

const autoplay = Autoplay(autoplayOptions);

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML", icon: <img src="/icons/html-5-svgrepo-com.svg" alt="HTML" className="w-8 h-8" /> },
  { name: "CSS", icon: <img src="/icons/css-3-svgrepo-com.svg" alt="CSS" className="w-8 h-8" /> },
  { name: "JavaScript", icon: <img src="/icons/js-svgrepo-com.svg" alt="JavaScript" className="w-8 h-8" /> },
  { name: "TypeScript", icon: <img src="/icons/typescript-official-svgrepo-com.svg" alt="TypeScript" className="w-8 h-8" /> },
  { name: "React", icon: <img src="/icons/react-svgrepo-com.svg" alt="React" className="w-8 h-8" /> },
  { name: "Angular", icon: <img src="/icons/angular-svgrepo-com.svg" alt="Angular" className="w-8 h-8" /> },
  { name: "Vue", icon: <img src="/icons/vue-svgrepo-com.svg" alt="Vue" className="w-8 h-8" /> },
  { name: "Node.js", icon: <img src="/icons/node-js-svgrepo-com.svg" alt="Node.js" className="w-8 h-8" /> },
  { name: "MongoDB", icon: <img src="/icons/mongodb-svgrepo-com.svg" alt="MongoDB" className="w-8 h-8" /> },
  { name: "PostgreSQL", icon: <img src="/icons/postgresql-svgrepo-com.svg" alt="PostgreSQL" className="w-8 h-8" /> },
  { name: "Docker", icon: <img src="/icons/dockertest-svgrepo-com.svg" alt="Docker" className="w-8 h-8" /> },
  { name: "Git", icon: <img src="/icons/git-svgrepo-com.svg" alt="Git" className="w-8 h-8" /> },
  { name: "NPM", icon: <img src="/icons/npm-svgrepo-com.svg" alt="NPM" className="w-8 h-8" /> },
  { name: "Tailwind CSS", icon: <img src="/icons/tailwind-svgrepo-com.svg" alt="Tailwind CSS" className="w-8 h-8" /> },
  { name: "Framer Motion", icon: <img src="/icons/framer-svgrepo-com.svg" alt="Framer Motion" className="w-8 h-8" /> },
  { name: "GSAP", icon: <img src="/icons/framer-svgrepo-com.svg" alt="GSAP" className="w-8 h-8 opacity-70" /> },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      dragFree: false,
      containScroll: 'keepSnaps',
      slidesToScroll: 1,
      duration: 20, // Even faster animation duration
      startIndex: 0
    },
    [autoplay] // Use the configured autoplay plugin
  );

  // Handle window resize
  const handleResize = useCallback(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  // Set up event listeners
  useEffect(() => {
    if (!emblaApi) return;
    
    const onResize = () => handleResize();
    
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [emblaApi, handleResize]);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const skillElements = sectionRef.current.querySelectorAll('.glass-card');
    if (skillElements.length === 0) return;

    const ctx = gsap.context(() => {
      // Animate the image and content sections
      const animatedElements = [
        imageRef.current,
        contentRef.current
      ].filter(Boolean) as HTMLElement[];

      // Animate the main content
      gsap.fromTo(animatedElements,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate skills with staggered entrance
      gsap.fromTo(skillElements,
        { opacity: 0, y: 20 },
        {
          opacity: 0.8,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "sine.out",
          scrollTrigger: {
            trigger: '.skills-container',
            start: "top 90%",
            toggleActions: "play none none none"
          }
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
              <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <FlickerText text="About Me" className="glow-text" flickerDuration={1000} />
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
            <div className="relative skills-container pt-4 md:pt-6 select-none">
              {/* Wider fade effect on sides */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background via-background/90 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background via-background/90 to-transparent z-10 pointer-events-none" />
              
              <div 
                className="overflow-hidden w-full" 
                ref={emblaRef}
                role="region" 
                aria-label="Skills carousel"
                aria-roledescription="carousel"
                onMouseEnter={() => autoplay.stop()}
                onMouseLeave={() => autoplay.play()}
              >
                <div className="flex" role="list">
                  {skills.map((skill, index) => (
                    <div 
                      key={skill.name}
                      className="flex-shrink-0 glass-card p-3 sm:p-4 md:p-5 rounded-xl hover:glow-effect transition-all duration-700 hover:scale-105 cursor-pointer group w-[120px] sm:w-[140px] md:w-[160px] mx-3 active:scale-95 opacity-80 hover:opacity-100"
                      style={{
                        transition: 'opacity 0.7s ease, transform 0.5s ease',
                      }}
                      role="listitem"
                      aria-label={skill.name}
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 group-hover:scale-125 transition-transform">
                          {skill.icon}
                        </div>
                        <p className="text-xs sm:text-sm text-center text-muted-foreground leading-tight">
                          {skill.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
