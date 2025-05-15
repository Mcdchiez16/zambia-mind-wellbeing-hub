
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ChartBar, HeartPulse, Map, Users, Check, Award, TrendingUp } from "lucide-react";
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
      title: "Live Dashboard",
      description: "Track real-time mental health sentiment trends across Zambia",
      icon: <ChartBar className="h-6 w-6" />,
      link: "/dashboard"
    },
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Hero />
      
      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-sm border border-blue-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                  </div>
                  <div className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
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
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <Check className="h-4 w-4 mr-1" />
            Supporting Mental Health Across Zambia
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Platform Services
          </h2>
          <p className="text-lg text-gray-600">
            Our comprehensive approach provides real-time mental health trend analysis, resources, and personalized support for individuals, professionals, and organizations throughout Zambia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4">
              <Award className="h-4 w-4 mr-1" />
              Our Approach
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Advanced Analytics for Mental Health Insights
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-800">Real-time Data Processing</h3>
                  <p className="text-gray-600 mt-1">Our platform continuously processes mental health data from multiple sources across Zambia.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-800">Sentiment Analysis</h3>
                  <p className="text-gray-600 mt-1">Advanced NLP techniques detect emotional states and mental health concerns from conversations.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-800">Localized Resources</h3>
                  <p className="text-gray-600 mt-1">Connect users with the nearest mental health support centers and professionals.</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 group">
                <Link to="/dashboard" className="flex items-center">
                  View Live Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-xl transform rotate-3"></div>
            <div className="relative bg-white shadow-lg rounded-xl p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="h-2 w-20 bg-blue-200 rounded-full"></div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-24 bg-blue-50 rounded-lg flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="col-span-2 h-24 bg-purple-50 rounded-lg p-4">
                    <div className="h-2 w-20 bg-purple-200 rounded-full mb-3"></div>
                    <div className="h-2 w-32 bg-purple-100 rounded-full mb-2"></div>
                    <div className="h-2 w-24 bg-purple-100 rounded-full"></div>
                  </div>
                </div>
                
                <div className="h-32 bg-gray-50 rounded-lg p-4">
                  <div className="h-2 w-20 bg-gray-200 rounded-full mb-3"></div>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="bg-blue-100 h-16 rounded-md"></div>
                    <div className="bg-green-100 h-12 rounded-md"></div>
                    <div className="bg-yellow-100 h-20 rounded-md"></div>
                    <div className="bg-purple-100 h-14 rounded-md"></div>
                    <div className="bg-red-100 h-10 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Support Section */}
      <section className="bg-blue-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Need Immediate Support?
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                If you're experiencing a mental health crisis or need to talk to someone right now, help is available 24/7 throughout Zambia.
              </p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 rounded-full">
                <Link to="/resources" className="flex items-center">
                  Find Help Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
                  <CardTitle>Emergency Hotlines</CardTitle>
                  <CardDescription>Available 24/7 for all Zambians</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                      <span className="font-medium">Zambia Mental Health Helpline:</span>
                      <span className="font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full">116</span>
                    </li>
                    <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                      <span className="font-medium">Crisis Text Line:</span>
                      <span className="font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full">Text "HELP" to 5011</span>
                    </li>
                    <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                      <span className="font-medium">Lifeline Zambia:</span>
                      <span className="font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full">+260 211 123456</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="text-sm text-gray-500 bg-gray-50 rounded-b-lg">
                  These services are confidential and free of charge
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Join Us in Supporting Mental Health Awareness
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Whether you're seeking help, offering support, or analyzing data, our platform provides the tools and resources you need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/dashboard">
                Explore Dashboard
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/wellness">
                Check Your Wellbeing
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
