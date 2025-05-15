
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Brain, BarChart } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative">
      {/* Background with pattern and gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-800 overflow-hidden">
        {/* Abstract pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            backgroundSize: "20px 20px"
          }}
        />
        
        {/* Circular gradient elements for visual interest */}
        <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-2">
              <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
              <span>Live Mental Health Insights</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Zambia Mind <br className="hidden md:inline" />
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">Wellbeing Hub</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-lg">
              Analyzing mental health trends across Zambia to provide insights, 
              resources, and support for individuals and communities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 rounded-full shadow-lg group">
                <Link to="/dashboard" className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5" />
                  View Live Dashboard
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full backdrop-blur-sm">
                <Link to="/wellness" className="flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  Check Your Wellbeing
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Abstract visual representation */}
          <div className="hidden md:flex justify-center">
            <div className="relative h-80 w-80">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-xl"></div>
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="h-3 w-20 bg-blue-200/80 rounded-full animate-pulse" style={{animationDelay: "0s"}}></div>
                      <div className="h-3 w-10 bg-purple-200/80 rounded-full animate-pulse" style={{animationDelay: "0.2s"}}></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-3 w-14 bg-green-200/80 rounded-full animate-pulse" style={{animationDelay: "0.4s"}}></div>
                      <div className="h-3 w-16 bg-yellow-200/80 rounded-full animate-pulse" style={{animationDelay: "0.6s"}}></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-3 w-12 bg-blue-200/80 rounded-full animate-pulse" style={{animationDelay: "0.8s"}}></div>
                      <div className="h-3 w-18 bg-purple-200/80 rounded-full animate-pulse" style={{animationDelay: "1.0s"}}></div>
                    </div>
                    
                    <div className="mt-6 h-24 w-full bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-lg flex items-end p-2">
                      <div className="h-[30%] w-[12%] bg-blue-400/80 rounded-sm mx-[2%]"></div>
                      <div className="h-[60%] w-[12%] bg-blue-400/80 rounded-sm mx-[2%]"></div>
                      <div className="h-[80%] w-[12%] bg-blue-400/80 rounded-sm mx-[2%]"></div>
                      <div className="h-[40%] w-[12%] bg-blue-400/80 rounded-sm mx-[2%]"></div>
                      <div className="h-[50%] w-[12%] bg-blue-400/80 rounded-sm mx-[2%]"></div>
                      <div className="h-[70%] w-[12%] bg-blue-400/80 rounded-sm mx-[2%]"></div>
                    </div>
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
