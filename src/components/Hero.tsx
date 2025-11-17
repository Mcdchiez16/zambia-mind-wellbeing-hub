
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Brain, BarChart } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative">
      {/* Professional gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-accent overflow-hidden">
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            backgroundSize: "20px 20px"
          }}
        />
        
        {/* Subtle gradient orbs */}
        <div className="absolute top-[15%] left-[8%] w-64 h-64 rounded-full bg-primary-foreground/5 blur-3xl"></div>
        <div className="absolute bottom-[15%] right-[8%] w-80 h-80 rounded-full bg-accent-foreground/5 blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-2 border border-primary-foreground/20">
              <span className="flex h-2 w-2 rounded-full bg-accent mr-2"></span>
              <span>Professional Mental Health Support</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              Zambia Mind <br className="hidden md:inline" />
              <span className="text-primary-foreground/90">Wellbeing Hub</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-lg">
              Analyzing mental health trends across Zambia to provide insights, 
              resources, and support for individuals and communities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-lg shadow-lg group">
                <Link to="/wellness" className="flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  Check Your Wellbeing
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                <Link to="/resources" className="flex items-center">
                  Find Resources
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Professional visual representation */}
          <div className="hidden md:flex justify-center">
            <div className="relative h-80 w-80">
              <div className="absolute inset-0 bg-primary-foreground/10 rounded-full blur-xl"></div>
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="p-8 bg-primary-foreground/10 backdrop-blur-md rounded-3xl shadow-2xl border border-primary-foreground/20">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="h-3 w-20 bg-primary-foreground/60 rounded-full"></div>
                      <div className="h-3 w-10 bg-primary-foreground/40 rounded-full"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-3 w-16 bg-primary-foreground/40 rounded-full"></div>
                      <div className="h-3 w-24 bg-primary-foreground/60 rounded-full"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-3 w-12 bg-primary-foreground/60 rounded-full"></div>
                      <div className="h-3 w-20 bg-primary-foreground/40 rounded-full"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-3 w-24 bg-primary-foreground/40 rounded-full"></div>
                      <div className="h-3 w-14 bg-primary-foreground/60 rounded-full"></div>
                    </div>
                    <div className="pt-4 border-t border-primary-foreground/20">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-accent"></div>
                          <span className="text-xs text-primary-foreground/70">Active</span>
                        </div>
                        <div className="text-xl font-bold text-primary-foreground">100%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-blue-50" />
    </div>
  );
};

export default Hero;
