import { ArrowRight, Shield, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-mental-health.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Mental health care" 
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50 dark:from-background dark:via-background/95 dark:to-background/70" />
      </div>
      
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Mental Health Platform for Zambia
          </div>
          
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-6 animate-slide-up">
            Your Mind
            <br />
            <span className="text-primary">Matters</span>
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Access personalized wellness tools, real-time mental health insights, and connect with support services throughout Zambia.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link 
              to="/wellness" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
            >
              Start Wellness Check
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/resources" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-foreground/20 bg-background/50 backdrop-blur-sm text-foreground rounded-full font-semibold hover:bg-background/80 hover:border-foreground/30 transition-all"
            >
              Explore Resources
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-border/50 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 backdrop-blur-sm">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-lg">Confidential</p>
                <p className="text-sm text-muted-foreground">100% Private</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 backdrop-blur-sm">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-lg">28,500+</p>
                <p className="text-sm text-muted-foreground">Screenings</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 backdrop-blur-sm">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-lg">112</p>
                <p className="text-sm text-muted-foreground">Centers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
