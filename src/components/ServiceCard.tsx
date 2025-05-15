
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
    <Card className="group overflow-hidden border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <div className="mb-5 inline-flex p-3 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <Link 
          to={link}
          className="text-blue-600 hover:text-blue-800 inline-flex items-center font-medium transition-all duration-200 group-hover:translate-x-1"
        >
          Explore <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
