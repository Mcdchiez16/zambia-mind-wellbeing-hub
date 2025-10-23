
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { HeartPulse, Map, Users, Check, Award, TrendingUp, Phone } from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { useEffect } from "react";
import { toast } from "sonner";

const Index = () => {
  const { toast: uiToast } = useToast();
  
  useEffect(() => {
    // Welcome toast for first-time visitors
    if (!localStorage.getItem('visited')) {
      uiToast({
        title: "Welcome to Zambia Mind Wellbeing Hub",
        description: "Explore mental health trends and resources across Zambia",
        duration: 5000,
      });
      localStorage.setItem('visited', 'true');
    }
  }, [uiToast]);

  const services = [
    {
      title: "Personal Wellness",
      description: "Check your emotional state and get personalized coping strategies",
      icon: <HeartPulse className="h-6 w-6" />,
      link: "/wellness"
    },
    {
      title: "Mental Health Map",
      description: "Explore mental health services and hotspots by region",
      icon: <Map className="h-6 w-6" />,
      link: "/resources"
    },
    {
      title: "Community Support",
      description: "Connect with support groups and mental health professionals",
      icon: <Users className="h-6 w-6" />,
      link: "/resources"
    }
  ];

  const stats = [
    { 
      title: "Mental Health Screenings", 
      value: "28,500+",
      change: "+15%",
      trend: "up"
    },
    { 
      title: "Support Centers", 
      value: "112",
      change: "+23",
      trend: "up"
    },
    { 
      title: "Rural Areas Covered", 
      value: "85%",
      change: "+5%",
      trend: "up"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <Hero />
      
      {/* Stats Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-muted/50 p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-foreground mt-1">{stat.value}</h3>
                  </div>
                  <div className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-accent' : 'text-destructive'}`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingUp className="h-4 w-4 mr-1 transform rotate-180" />
                    )}
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Check className="h-4 w-4 mr-1" />
            Supporting Mental Health Across Zambia
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Platform Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Our comprehensive approach provides real-time mental health trend analysis, resources, and personalized support for individuals, professionals, and organizations throughout Zambia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              link={service.link}
            />
          ))}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 border border-accent/20">
                <Award className="h-4 w-4 mr-2" />
                Our Approach
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                Advanced Analytics for Mental Health Insights
              </h2>
              <p className="text-lg text-muted-foreground">
                Empowering communities with data-driven insights and compassionate support across Zambia.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start group">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mt-1 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Check className="h-5 w-5 text-accent group-hover:text-white transition-colors" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1">Real-time Data Processing</h3>
                  <p className="text-muted-foreground">Our platform continuously processes mental health data from multiple sources across Zambia.</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mt-1 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Check className="h-5 w-5 text-accent group-hover:text-white transition-colors" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1">Sentiment Analysis</h3>
                  <p className="text-muted-foreground">Advanced NLP techniques detect emotional states and mental health concerns from conversations.</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mt-1 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Check className="h-5 w-5 text-accent group-hover:text-white transition-colors" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1">Localized Resources</h3>
                  <p className="text-muted-foreground">Connect users with the nearest mental health support centers and professionals.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl transform rotate-2"></div>
            <div className="relative bg-card shadow-2xl rounded-2xl p-8 border border-border">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 bg-muted rounded-full"></div>
                  <div className="h-8 w-8 rounded-full bg-accent/20"></div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-28 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center border border-primary/10">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <div className="col-span-2 h-28 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-5 border border-accent/10">
                    <div className="h-2 w-16 bg-accent/30 rounded-full mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-accent/20 rounded-full"></div>
                      <div className="h-2 w-4/5 bg-accent/15 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="h-40 bg-muted/30 rounded-xl p-5 border border-border/50">
                  <div className="h-2 w-20 bg-muted-foreground/20 rounded-full mb-4"></div>
                  <div className="grid grid-cols-5 gap-3 items-end h-24">
                    <div className="bg-primary/30 h-20 rounded-lg"></div>
                    <div className="bg-accent/30 h-16 rounded-lg"></div>
                    <div className="bg-primary/40 h-24 rounded-lg"></div>
                    <div className="bg-accent/40 h-18 rounded-lg"></div>
                    <div className="bg-primary/30 h-14 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Support Section */}
      <section className="bg-gradient-to-b from-accent/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
                <HeartPulse className="h-4 w-4 mr-2" />
                24/7 Support Available
              </div>
              <h2 className="text-4xl font-bold text-foreground leading-tight">
                Need Immediate Support?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                If you're experiencing a mental health crisis or need to talk to someone right now, help is available 24/7 throughout Zambia. You're not alone in this journey.
              </p>
            </div>
            
            <div className="md:pl-8">
              <Card className="border shadow-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10 border-b">
                  <CardTitle className="flex items-center text-foreground">
                    <Phone className="h-5 w-5 mr-2 text-accent" />
                    Emergency Hotlines
                  </CardTitle>
                  <CardDescription>Available 24/7 for all Zambians</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group">
                    <span className="font-medium text-foreground">Mental Health Helpline</span>
                    <span className="font-bold text-accent bg-accent/10 px-4 py-2 rounded-full group-hover:bg-accent group-hover:text-white transition-colors">116</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group">
                    <span className="font-medium text-foreground">Crisis Text Line</span>
                    <span className="font-bold text-accent bg-accent/10 px-4 py-2 rounded-full text-xs group-hover:bg-accent group-hover:text-white transition-colors">Text "HELP" to 5011</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group">
                    <span className="font-medium text-foreground">Lifeline Zambia</span>
                    <span className="font-bold text-accent bg-accent/10 px-4 py-2 rounded-full text-sm group-hover:bg-accent group-hover:text-white transition-colors">+260 211 123456</span>
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground bg-muted/30 border-t">
                  <p className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-accent" />
                    These services are confidential and free of charge
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-2">
            <Users className="h-4 w-4 mr-2" />
            Join Our Community
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Together, We Build Stronger Mental Health
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you're seeking help, offering support, or accessing resources, our platform is here to guide you every step of the way.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8">
            <Link to="/wellness" className="group">
              <div className="p-8 rounded-xl border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <HeartPulse className="h-6 w-6 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Check Your Wellbeing</h3>
                <p className="text-muted-foreground text-sm">Take a wellness assessment and get personalized support</p>
              </div>
            </Link>
            
            <Link to="/resources" className="group">
              <div className="p-8 rounded-xl border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                  <Map className="h-6 w-6 text-accent group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Find Resources</h3>
                <p className="text-muted-foreground text-sm">Discover mental health services and support near you</p>
              </div>
            </Link>
            
            <Link to="/resources" className="group">
              <div className="p-8 rounded-xl border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Users className="h-6 w-6 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Connect & Support</h3>
                <p className="text-muted-foreground text-sm">Join support groups and connect with professionals</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
