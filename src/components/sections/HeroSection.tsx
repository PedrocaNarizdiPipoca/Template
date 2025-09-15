import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../ui/enhanced-button';
import Orb from '../Orb';
export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.5
    });

    // Animate headline with blur to clear effect
    tl.fromTo(headlineRef.current, {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out'
    })
    // Animate subtitle
    .fromTo(subtitleRef.current, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')
    // Animate CTA button
    .fromTo(ctaRef.current, {
      opacity: 0,
      scale: 0.8
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)'
    }, '-=0.3')
    // Animate Orb container
    .fromTo(orbRef.current, {
      opacity: 0,
      scale: 0.8
    }, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out'
    }, '-=1');

    // Floating animation for background elements
    gsap.to('.glow-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5
    });
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Background floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-orb absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="glow-orb absolute top-40 right-32 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
        <div className="glow-orb absolute bottom-40 left-32 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Centered 3D Orb Background */}
      <div ref={orbRef} className="absolute inset-0 flex items-center justify-center pt-12">
        <div className="w-[672px] h-[672px] relative">
          <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
        </div>
      </div>

      {/* Centered Content Overlay */}
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          <h1 ref={headlineRef} className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight">
            <span className="gradient-text text-glow">From Raw to Wow:</span>
            <br />
            <span className="text-foreground">Editing that Makes a</span>
            <br />
            <span className="text-primary">Difference</span>
          </h1>

          <p ref={subtitleRef} className="text-xs md:text-sm text-foreground-muted max-w-xl leading-relaxed">
            I create videos that don't just tell stories — they immerse the audience in them. 
            Transforming content into unforgettable visual experiences.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3">
            <Button variant="glow" size="default" onClick={() => window.open('https://x.com/FlangoTheEditor', '_blank')}>
              Work Together
            </Button>
            <Button variant="hero" size="default" onClick={() => scrollToSection('portfolio')}>
              View Portfolio
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      
    </section>;
}