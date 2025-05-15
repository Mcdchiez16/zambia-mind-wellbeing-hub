
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const ServiceCard = ({ title, description, icon, link }: ServiceCardProps) => {
  return (
    <Card className="group overflow-hidden border-gray-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full flex flex-col bg-white rounded-xl">
      <div className="absolute h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 top-0 left-0 transition-all duration-500 group-hover:w-full"></div>
      <CardContent className="pt-6 flex-grow relative z-10">
        <div className="mb-5 inline-flex p-3 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white transition-colors duration-500 shadow-md">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-700 transition-colors duration-300">{title}</h3>
        <p className="text-gray-600">{description}</p>
        
        {/* Background decoration */}
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-blue-50 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 z-0"></div>
      </CardContent>
      <CardFooter className="pt-0 pb-4 relative z-10">
        <Link 
          to={link}
          className="text-blue-600 hover:text-blue-800 inline-flex items-center font-medium transition-all duration-300 group-hover:translate-x-2 relative"
        >
          <span>Explore</span> 
          <span className="relative transition-all duration-300 ml-1 group-hover:ml-2">
            <ArrowRight className="h-4 w-4" />
            <span className="absolute top-1/2 -translate-y-1/2 left-0 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
