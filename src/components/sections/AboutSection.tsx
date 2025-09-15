import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  PlayCircle, 
  Pen, 
  Lightning, 
  Eye, 
  Palette,
  Monitor 
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { icon: PlayCircle, name: "Video Editing Mastery" },
  { icon: Monitor, name: "Social Media Expertise" },
  { icon: Eye, name: "Visual Creativity & Storytelling" },
  { icon: Palette, name: "Design & Branding Awareness" },
  { icon: Lightning, name: "Technical & Workflow Efficiency" }
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section fade + blur-clear
    gsap.fromTo(section,
      { opacity: 0, filter: 'blur(10px)' },
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Image enters from left with rotation effect
    gsap.fromTo(imageRef.current,
      { x: -100, opacity: 0, rotation: -10 },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 85%',
        }
      }
    );

    // Content slides in from right
    gsap.fromTo(contentRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
        }
      }
    );

    // Skills appear staggered
    gsap.fromTo('.skill-item',
      { y: 30, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 90%',
        }
      }
    );

  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-background-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-secondary rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative group">
              <div className="glass-intense rounded-full p-2 hover-glow transition-all duration-500 group-hover:scale-105">
                <div className="w-80 h-80 mx-auto rounded-full overflow-hidden border-2 border-glass-border">
                  <img 
                    src="/assets/profile-picture.jpg" 
                    alt="Flango - Video Editor & Social Media Expert"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Glowing ring effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl -z-10 group-hover:blur-xl transition-all duration-500" />
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                <span className="gradient-text">High-End Video Editing</span>
                <br />
                <span className="text-foreground">& Social Media Strategy</span>
              </h2>
              
              <p className="text-lg text-foreground-muted leading-relaxed">
                I create videos that don't just tell stories — they immerse the audience in them. 
                From cinematic edits to stunning thumbnails, I use After Effects and Premiere Pro 
                to transform content into unforgettable visual experiences for social media.
              </p>
            </div>

            {/* Core Skills */}
            <div ref={skillsRef}>
              <h3 className="text-2xl font-medium text-foreground mb-6">Core Skills</h3>
              <div className="space-y-3">
                {skills.map((skill, index) => {
                  const IconComponent = skill.icon;
                  return (
                    <div key={index} className="skill-item flex items-center gap-4 p-4 glass rounded-lg hover:bg-glass/30 transition-all duration-300 group">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <IconComponent size={24} className="text-primary" weight="light" />
                      </div>
                      <span className="text-foreground font-medium">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}