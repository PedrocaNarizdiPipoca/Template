import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND_CONFIG } from '../../config/brandConfig';
gsap.registerPlugin(ScrollTrigger);
const portfolioVideos = BRAND_CONFIG.videos.map((src, index) => ({
  id: index + 1,
  title: `Portfolio Video ${index + 1}`,
  src,
  category: index >= 3 ? "Short Form" : "Long Form"
}));
export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Delay animations to ensure DOM is ready
    const animationTimeout = setTimeout(() => {
      // Animate title
      if (titleRef.current) {
        gsap.fromTo(titleRef.current, {
          opacity: 0,
          y: 50
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%'
          }
        });
      }

      // Videos fade/scale/y position with stagger
      const portfolioVideos = document.querySelectorAll('.portfolio-video');
      if (portfolioVideos.length > 0) {
        gsap.fromTo('.portfolio-video', {
          opacity: 0,
          y: 60,
          scale: 0.9
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 80%'
          }
        });
      }
    }, 100);
    return () => {
      clearTimeout(animationTimeout);
    };
  }, []);
  return <section id="portfolio" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-40 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-40 w-64 h-64 bg-secondary rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-6xl font-light mb-6">
            <span className="gradient-text text-glow">Portfolio</span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Recent work that showcases my skills in video editing and content creation
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {portfolioVideos.map(video => <div key={video.id} className="portfolio-video">
              {/* Direct Video Element */}
              <video className="w-full aspect-video rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" controls muted preload="metadata" playsInline poster={video.src}>
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>      
            </div>)}
        </div>

        {/* Call to Action */}
        
      </div>
    </section>;
}
