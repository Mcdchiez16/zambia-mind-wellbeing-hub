
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ChartBar, HeartPulse, Map, Users } from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { useEffect } from "react";

const Index = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Welcome toast for first-time visitors
    if (!localStorage.getItem('visited')) {
      toast({
        title: "Welcome to Zambia Mind Wellbeing Hub",
        description: "Explore mental health trends and resources across Zambia",
        duration: 5000,
      });
      localStorage.setItem('visited', 'true');
    }
  }, [toast]);

  const services = [
    {
      title: "Live Dashboard",
      description: "Track real-time mental health sentiment trends across Zambia",
      icon: <ChartBar className="h-8 w-8 text-blue-500" />,
      link: "/dashboard"
    },
    {
      title: "Personal Wellness",
      description: "Check your emotional state and get personalized coping strategies",
      icon: <HeartPulse className="h-8 w-8 text-purple-500" />,
      link: "/wellness"
    },
    {
      title: "Mental Health Map",
      description: "Explore mental health services and hotspots by region",
      icon: <Map className="h-8 w-8 text-green-500" />,
      link: "/resources"
    },
    {
      title: "Admin Portal",
      description: "Secure access for professionals to analyze detailed data",
      icon: <Users className="h-8 w-8 text-amber-500" />,
      link: "/admin"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Hero />
      
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Supporting Mental Health Across Zambia
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform provides real-time mental health trend analysis, resources, and personalized support for individuals, professionals, and organizations throughout Zambia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      
      <section className="bg-blue-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Need Immediate Support?
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                If you're experiencing a mental health crisis or need to talk to someone right now, help is available.
              </p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link to="/resources">
                  Find Help Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Hotlines</CardTitle>
                  <CardDescription>Available 24/7 for all Zambians</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="font-medium">Zambia Mental Health Helpline:</span>
                      <span className="font-bold">116</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Crisis Text Line:</span>
                      <span className="font-bold">Text "HELP" to 5011</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Lifeline Zambia:</span>
                      <span className="font-bold">+260 211 123456</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="text-sm text-gray-500">
                  These services are confidential and free of charge
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
