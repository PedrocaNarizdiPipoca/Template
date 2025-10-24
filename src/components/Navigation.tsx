import { useState, useEffect } from 'react';
import { Button } from './ui/enhanced-button';
import { gsap } from 'gsap';
import { BRAND_CONFIG } from '../config/brandConfig';
export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    // Animate navigation on load
    gsap.fromTo('.nav-item', {
      y: -20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.5
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
  return <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'glass-intense py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="nav-item">
          <h1 className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => scrollToSection('hero')}>
            {BRAND_CONFIG.name}
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          {[{
          name: 'Home',
          id: 'hero'
        }, {
          name: 'About',
          id: 'about'
        }, {
          name: 'Portfolio',
          id: 'portfolio'
        }, {
          name: 'Contact',
          id: 'contact'
        }].map((item, index) => <button key={item.id} onClick={() => scrollToSection(item.id)} className="nav-item text-foreground-muted hover:text-foreground transition-colors duration-300 hover:text-glow mx-[15px] my-0 py-0 px-[23px]">
              {item.name}
            </button>)}
        </div>

        {/* CTA Button */}
        <div className="nav-item">
          <Button variant="hero" size="lg" onClick={() => window.open(BRAND_CONFIG.socialMedia.twitter, '_blank')}>
            Let's Work Together
          </Button>
        </div>
      </div>
    </nav>;
}