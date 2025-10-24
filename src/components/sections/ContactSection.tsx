import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { Button } from '../ui/enhanced-button';
import { TwitterLogo, Envelope, MapPin } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate title
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        }
      }
    );

    // Animate content from left
    gsap.fromTo(contentRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
        }
      }
    );

    // Animate contact methods
    gsap.fromTo('.contact-method',
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.contact-methods',
          start: 'top 90%',
        }
      }
    );

  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-secondary rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-16">
            <h2 ref={titleRef} className="text-4xl md:text-6xl font-light mb-6">
              <span className="gradient-text text-glow">Let's Create Something</span>
              <br />
              <span className="text-foreground">Amazing Together</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Ready to transform your content into visual masterpieces? 
              Let's discuss your project and bring your vision to life.
            </p>
          </div>

          {/* Main CTA */}
          <div ref={contentRef} className="mb-16">
            <Button 
              variant="glow" 
              size="xl"
              className="text-lg px-12 py-6 mb-8"
              onClick={() => window.open(BRAND_CONFIG.socialMedia.twitter, '_blank')}
            >
              <TwitterLogo size={24} className="mr-3" weight="fill" />
              Let's Work Together
            </Button>
            
            <p className="text-foreground-muted">
              Click above to message me directly on X (Twitter)
            </p>
          </div>

          {/* Alternative Contact Methods */}
          <div className="contact-methods space-y-6">
            <h3 className="text-2xl font-light text-foreground mb-8">
              Or reach out through:
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Email */}
              <div className="contact-method glass-intense rounded-xl p-6 hover:scale-105 transition-all duration-300 hover-glow group">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                    <Envelope size={24} className="text-primary" weight="light" />
                  </div>
                </div>
                <h4 className="text-lg font-medium text-foreground mb-2">Email</h4>
                <p className="text-foreground-muted text-sm">
                  {BRAND_CONFIG.email}
                </p>
              </div>

              {/* Location */}
              <div className="contact-method glass-intense rounded-xl p-6 hover:scale-105 transition-all duration-300 hover-glow group">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-secondary/10 rounded-full group-hover:bg-secondary/20 transition-colors duration-300">
                    <MapPin size={24} className="text-secondary" weight="light" />
                  </div>
                </div>
                <h4 className="text-lg font-medium text-foreground mb-2">Location</h4>
                <p className="text-foreground-muted text-sm">
                  Available Worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="mt-20">
            <h3 className="text-2xl font-light text-foreground mb-8">My Process</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Consultation", desc: "We discuss your vision and requirements" },
                { step: "02", title: "Creation", desc: "I craft your content with precision and creativity" },
                { step: "03", title: "Delivery", desc: "You receive your polished, ready-to-publish content" }
              ].map((item, index) => (
                <div key={index} className="contact-method text-center">
                  <div className="text-4xl font-light gradient-text mb-4">{item.step}</div>
                  <h4 className="text-lg font-medium text-foreground mb-2">{item.title}</h4>
                  <p className="text-foreground-muted text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}