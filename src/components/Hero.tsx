import { ArrowRight, Shield, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40 dark:from-background/98 dark:via-background/90 dark:to-background/60" />
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-card/80 backdrop-blur-sm text-primary text-sm font-medium mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Mental Health Platform for Zambia
          </div>
          
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight mb-6 animate-slide-up">
            Supporting Mental
            <br />
            <span className="text-primary">Wellbeing</span> Across Zambia
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Access real-time mental health insights, personalized wellness tools, and connect with support services throughout Zambia.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link 
              to="/wellness" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Start Wellness Check
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              to="/resources" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-card/80 backdrop-blur-sm text-foreground rounded-lg font-medium hover:bg-card transition-colors"
            >
              Explore Resources
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border/50 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 backdrop-blur-sm">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Confidential</p>
                <p className="text-sm text-muted-foreground">100% Private</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 backdrop-blur-sm">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">28,500+</p>
                <p className="text-sm text-muted-foreground">Screenings Done</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 backdrop-blur-sm">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">112</p>
                <p className="text-sm text-muted-foreground">Support Centers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
