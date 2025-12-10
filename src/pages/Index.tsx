import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { HeartPulse, Map, Users, Check, ArrowRight, Phone } from "lucide-react";
import Hero from "@/components/Hero";
import { useEffect } from "react";

const Index = () => {
  const { toast: uiToast } = useToast();
  
  useEffect(() => {
    if (!localStorage.getItem('visited')) {
      uiToast({
        title: "Welcome to Zambia Mind Wellbeing Hub",
        description: "Explore mental health trends and resources across Zambia",
        duration: 5000,
      });
      localStorage.setItem('visited', 'true');
    }
  }, [uiToast]);

  const features = [
    {
      icon: <Check className="h-5 w-5" />,
      title: "Real-time Data Processing",
      description: "Our platform continuously processes mental health data from multiple sources across Zambia."
    },
    {
      icon: <Check className="h-5 w-5" />,
      title: "Sentiment Analysis",
      description: "Advanced NLP techniques detect emotional states and mental health concerns from conversations."
    },
    {
      icon: <Check className="h-5 w-5" />,
      title: "Localized Resources",
      description: "Connect users with the nearest mental health support centers and professionals."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-medium text-sm mb-2">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How We Can Help
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive mental health support tailored for Zambia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/wellness" className="group">
              <div className="h-full p-6 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <HeartPulse className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Personal Wellness</h3>
                <p className="text-muted-foreground text-sm mb-4">Check your emotional state and get personalized coping strategies</p>
                <span className="inline-flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Get Started <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </div>
            </Link>
            
            <Link to="/resources" className="group">
              <div className="h-full p-6 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Map className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Mental Health Map</h3>
                <p className="text-muted-foreground text-sm mb-4">Explore mental health services and hotspots by region</p>
                <span className="inline-flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </div>
            </Link>
            
            <Link to="/resources" className="group">
              <div className="h-full p-6 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Users className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Community Support</h3>
                <p className="text-muted-foreground text-sm mb-4">Connect with support groups and mental health professionals</p>
                <span className="inline-flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Connect <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-medium text-sm mb-2">Our Approach</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Advanced Analytics for Mental Health
              </h2>
              <p className="text-muted-foreground mb-8">
                Empowering communities with data-driven insights and compassionate support across Zambia.
              </p>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Visual element */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl" />
              <div className="relative bg-card border border-border rounded-2xl p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-24 bg-muted rounded-full" />
                    <div className="h-8 w-8 rounded-full bg-primary/20" />
                  </div>
                  <div className="grid grid-cols-5 gap-3 items-end h-32">
                    <div className="bg-primary/20 h-[40%] rounded-lg" />
                    <div className="bg-primary/30 h-[60%] rounded-lg" />
                    <div className="bg-primary/40 h-[80%] rounded-lg" />
                    <div className="bg-primary/30 h-[50%] rounded-lg" />
                    <div className="bg-primary/20 h-[70%] rounded-lg" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 w-full bg-muted rounded-full" />
                    <div className="h-3 w-4/5 bg-muted rounded-full" />
                    <div className="h-3 w-3/5 bg-muted rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Emergency Support Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-medium text-sm mb-2">24/7 Support</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Need Immediate Help?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                If you're experiencing a mental health crisis or need to talk to someone right now, help is available 24/7 throughout Zambia. You're not alone.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">Emergency Hotlines</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <span className="text-foreground font-medium">Mental Health Helpline</span>
                  <span className="font-bold text-primary bg-primary/10 px-4 py-2 rounded-full">116</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <span className="text-foreground font-medium">Crisis Text Line</span>
                  <span className="font-bold text-primary bg-primary/10 px-3 py-2 rounded-full text-sm">Text "HELP" to 5011</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <span className="text-foreground font-medium">Lifeline Zambia</span>
                  <span className="font-bold text-primary bg-primary/10 px-3 py-2 rounded-full text-sm">+260 211 123456</span>
                </div>
              </div>
              <div className="px-6 py-4 bg-muted/30 border-t border-border">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  These services are confidential and free of charge
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Take the First Step?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Whether you're seeking help, offering support, or exploring resources, we're here to guide you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/wellness" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Check Your Wellbeing
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              to="/resources" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-card text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Browse Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
