import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quotes } from 'phosphor-react';
gsap.registerPlugin(ScrollTrigger);
const testimonials = [{
  id: 1,
  image: "/assets/testimonial-1.jpeg",
  client: "Content Creator",
  text: "I didn't even have to ask for any changes"
}, {
  id: 2,
  image: "/assets/testimonial-2.jpeg",
  client: "Business Owner",
  text: "I want to pay good and stay with you"
}, {
  id: 3,
  image: "/assets/testimonial-3.jpeg",
  client: "YouTuber",
  text: "You really nailed it and put every feedback into it!"
}, {
  id: 4,
  image: "/assets/testimonial-4.jpeg",
  client: "Video Enthusiast",
  text: "I'm binge watching your videos"
}, {
  id: 5,
  image: "/assets/testimonial-5.jpeg",
  client: "Social Media Manager",
  text: "Duc in case you forget, you're the man"
}];
export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate title
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

    // Cards fade/scale/y position with stagger
    gsap.fromTo('.testimonial-card', {
      opacity: 0,
      y: 60,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top 80%'
      }
    });
  }, []);
  return <section id="testimonials" ref={sectionRef} className="py-24 bg-background-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-6xl font-light mb-6">
            <span className="gradient-text text-glow">What My Clients Say</span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Real feedback from creators who trust me with their content
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={testimonial.id} className="testimonial-card group">
              <div className="glass-intense rounded-xl p-6 hover:scale-105 transition-all duration-500 hover-glow h-full">
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-6">
                  <Quotes size={32} className="text-primary opacity-60" weight="fill" />
                  
                </div>

                {/* Testimonial Text */}
                <p className="text-foreground-muted leading-relaxed mb-6 text-sm">
                  "{testimonial.text}"
                </p>

                {/* Screenshot Image */}
                <div className="relative">
                  <div className="rounded-lg overflow-hidden border border-glass-border/30">
                    <img src={testimonial.image} alt={`Testimonial from ${testimonial.client}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg pointer-events-none" />
                </div>
              </div>
            </div>)}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-foreground-muted mb-6">
            Ready to join these satisfied clients?
          </p>
          <button className="glass-intense px-8 py-4 rounded-lg text-primary border border-glass-border hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 font-medium" onClick={() => {
          const contactSection = document.getElementById('contact');
          contactSection?.scrollIntoView({
            behavior: 'smooth'
          });
        }}>
            Start Your Project
          </button>
        </div>
      </div>
    </section>;
}