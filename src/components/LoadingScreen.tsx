import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { BRAND_CONFIG } from '../config/brandConfig';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate progress bar
    tl.to({}, {
      duration: 2,
      ease: "power2.out",
      onUpdate: function() {
        const prog = Math.round(this.progress() * 100);
        setProgress(prog);
      }
    });

    // After loading completes
    tl.to(".preloader", {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Animated Logo/Text */}
      <div className="mb-12">
        <h1 className="text-6xl md:text-8xl font-light gradient-text text-glow translate-y-[-12%]">
          Welcome
        </h1>
        <p className="text-center text-foreground-muted mt-4 text-lg tracking-wide">
          Video Editor
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-80 max-w-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-foreground-muted">Loading</span>
          <span className="text-sm text-primary font-medium">{progress}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 bg-background-secondary rounded-full overflow-hidden">
          <div 
            className="h-full loading-bar transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}