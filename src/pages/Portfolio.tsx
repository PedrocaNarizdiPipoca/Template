import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from '../components/LoadingScreen';
import Navigation from '../components/Navigation';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';
import FooterSection from '../components/sections/FooterSection';

// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Smooth scroll setup with Locomotive would go here in a real implementation
// For now, we'll use regular GSAP ScrollTrigger

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Set up smooth scrolling behavior
    const initSmoothScroll = () => {
      // In a real implementation, you would initialize Locomotive Scroll here
      // For now, we'll use CSS smooth scrolling and GSAP
      ScrollTrigger.refresh();
    };

    if (!isLoading) {
      initSmoothScroll();
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
      // Animate content fade in with proper selector after DOM is ready
      setTimeout(() => {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
          gsap.fromTo('.main-content',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
          );
        }
      }, 50);
    }, 300);
  };

  useEffect(() => {
    // Update page title and meta
    document.title = "Flango - Video Editor & Social Media Expert";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional video editor and social media expert specializing in cinematic edits, social media content, and visual storytelling. Transform your raw footage into engaging visual experiences.');
    }
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {/* Main Content */}
      {showContent && (
        <div className="main-content">
          {/* Navigation */}
          <Navigation />
          
          {/* Main Sections */}
          <main>
            <HeroSection />
            <AboutSection />
            <PortfolioSection />
            <TestimonialsSection />
            <ContactSection />
          </main>
          
          {/* Footer */}
          <FooterSection />
        </div>
      )}
    </>
  );
}