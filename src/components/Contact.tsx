import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current?.children || [],
        {
          opacity: 0,
          x: -50,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        iconsRef.current?.children || [],
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: iconsRef.current,
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully!");
      if (formRef.current) {
        formRef.current.reset();
      }
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 glow-text">
          Let's Connect
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Have a project in mind? Let's create something amazing together.
        </p>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="glass-card p-8 rounded-2xl space-y-6"
        >
          <div>
            <Input
              placeholder="Your Name"
              required
              className="bg-secondary/50 border-border/30 focus:border-primary focus:glow-effect transition-all"
            />
          </div>

          <div>
            <Input
              type="email"
              placeholder="Your Email"
              required
              className="bg-secondary/50 border-border/30 focus:border-primary focus:glow-effect transition-all"
            />
          </div>

          <div>
            <Textarea
              placeholder="Your Message"
              required
              rows={6}
              className="bg-secondary/50 border-border/30 focus:border-primary focus:glow-effect transition-all resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:scale-105 transition-all duration-300 glow-effect"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>

        {/* Social Links */}
        <div
          ref={iconsRef}
          className="flex justify-center gap-6 mt-12"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full glass-card flex items-center justify-center hover:glow-effect-accent transition-all hover:scale-110"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full glass-card flex items-center justify-center hover:glow-effect-accent transition-all hover:scale-110"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full glass-card flex items-center justify-center hover:glow-effect-accent transition-all hover:scale-110"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:pheenix@example.com"
            className="w-14 h-14 rounded-full glass-card flex items-center justify-center hover:glow-effect-accent transition-all hover:scale-110"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
