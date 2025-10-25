import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { TwitterLogo, InstagramLogo, YoutubeLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Footer fade + slide-up animation
    gsap.fromTo(footer,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
        }
      }
    );

    // Floating particles animation
    gsap.to('.footer-particle', {
      y: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        amount: 2,
        from: 'random'
      }
    });

  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: TwitterLogo, href: BRAND_CONFIG.socialMedia.twitter, label: 'X (Twitter)' },
    { icon: InstagramLogo, href: BRAND_CONFIG.socialMedia.instagram, label: 'Instagram' },
    { icon: YoutubeLogo, href: BRAND_CONFIG.socialMedia.youtube, label: 'YouTube' }
  ];

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer ref={footerRef} className="relative py-16 bg-background-tertiary overflow-hidden">
      {/* Background floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="footer-particle absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 
              className="text-3xl font-light gradient-text mb-4 cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={scrollToTop}
            >
              {BRAND_CONFIG.name}
            </h3>
            <p className="text-foreground-muted mb-6 max-w-md">
              Transforming raw content into compelling visual stories that drive engagement and results.
              Professional video editing services.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass-intense rounded-lg hover:scale-110 hover:bg-primary/10 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <IconComponent 
                      size={20} 
                      className="text-foreground-muted group-hover:text-primary transition-colors duration-300" 
                      weight="light" 
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-foreground-muted hover:text-primary transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-foreground-muted">
              <li>Video Editing</li>
              <li>Content Creation</li>
              <li>Thumbnail Design</li>
              <li>Post Production</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-glass-border to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground-muted text-sm mb-4 md:mb-0">
            © 2024 {BRAND_CONFIG.name}. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="glass-intense px-4 py-2 rounded-lg text-sm text-primary hover:scale-105 transition-all duration-300"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}