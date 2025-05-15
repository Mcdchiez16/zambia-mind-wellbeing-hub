
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Phone, Book } from "lucide-react";

interface Resource {
  id: string;
  name: string;
  type: string;
  location: string;
  contact: string;
  description: string;
  services: string[];
  website?: string;
}

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const resources: Resource[] = [
    {
      id: "1",
      name: "Chainama Hills Hospital",
      type: "Hospital",
      location: "Lusaka",
      contact: "+260 211 123456",
      description: "Main psychiatric hospital offering comprehensive mental health services.",
      services: ["Psychiatric care", "Inpatient services", "Outpatient clinic", "Child & adolescent services"],
      website: "https://www.chainamahills.zm"
    },
    {
      id: "2",
      name: "Mental Health Zambia",
      type: "NGO",
      location: "Lusaka",
      contact: "+260 977 789012",
      description: "Non-profit organization providing community mental health support.",
      services: ["Counseling", "Support groups", "Mental health awareness", "Training programs"],
      website: "https://www.mentalhealthzambia.org"
    },
    {
      id: "3",
      name: "University Teaching Hospital - Mental Health Department",
      type: "Hospital",
      location: "Lusaka",
      contact: "+260 211 234567",
      description: "Mental health department within Zambia's largest hospital.",
      services: ["Psychiatric assessment", "Crisis intervention", "Medication management"]
    },
    {
      id: "4",
      name: "Copperbelt Mental Wellness Center",
      type: "Clinic",
      location: "Kitwe",
      contact: "+260 212 345678",
      description: "Specialized clinic serving the Copperbelt region.",
      services: ["Individual therapy", "Group therapy", "Addiction services", "Family counseling"]
    },
    {
      id: "5",
      name: "Youth Alive Zambia",
      type: "NGO",
      location: "Multiple locations",
      contact: "+260 966 456789",
      description: "Youth-focused organization with mental health programming.",
      services: ["Youth counseling", "Peer support", "Life skills", "Mental health education"],
      website: "https://www.youthalive.org.zm"
    },
    {
      id: "6",
      name: "Mindful Zambia",
      type: "Private Practice",
      location: "Lusaka",
      contact: "+260 955 567890",
      description: "Private mental health practice offering evidence-based treatments.",
      services: ["Cognitive Behavioral Therapy", "Mindfulness training", "Trauma therapy", "Online counseling"],
      website: "https://www.mindfulzambia.com"
    },
    {
      id: "7",
      name: "Rural Mental Health Initiative",
      type: "NGO",
      location: "Eastern Province",
      contact: "+260 977 678901",
      description: "Organization focused on bringing mental health services to rural communities.",
      services: ["Mobile clinics", "Community health workers", "Basic mental health training", "Teletherapy"]
    }
  ];

  const filteredResources = resources.filter(resource => 
    resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const getResourcesByType = (type: string) => {
    return filteredResources.filter(resource => resource.type === type);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mental Health Resources</h1>
      
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search for resources by name, location, or services..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="hospital">Hospitals</TabsTrigger>
          <TabsTrigger value="ngo">NGOs</TabsTrigger>
          <TabsTrigger value="other">Other Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No resources found matching your search.
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="hospital" className="mt-6">
          {getResourcesByType("Hospital").length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getResourcesByType("Hospital").map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No hospital resources found matching your search.
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="ngo" className="mt-6">
          {getResourcesByType("NGO").length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getResourcesByType("NGO").map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No NGO resources found matching your search.
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="other" className="mt-6">
          {filteredResources.filter(r => r.type !== "Hospital" && r.type !== "NGO").length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources
                .filter(r => r.type !== "Hospital" && r.type !== "NGO")
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))
              }
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No other resources found matching your search.
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="font-bold text-red-600">Crisis Hotline</div>
            <div className="text-lg font-bold">116</div>
            <div className="text-sm text-gray-500">Available 24/7, toll-free</div>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="font-bold text-blue-600">Text Support</div>
            <div className="text-lg font-bold">Text "HELP" to 5011</div>
            <div className="text-sm text-gray-500">Available daily, 8am-10pm</div>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="font-bold text-purple-600">WhatsApp Support</div>
            <div className="text-lg font-bold">+260 977 123456</div>
            <div className="text-sm text-gray-500">Available daily, 9am-9pm</div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-medium mb-3">Are we missing any resources?</h3>
        <p className="text-gray-600 mb-4">
          Help us improve our directory by suggesting mental health resources in Zambia.
        </p>
        <Button className="bg-green-600 hover:bg-green-700">
          Suggest a Resource
        </Button>
      </div>
    </div>
  );
};

const ResourceCard = ({ resource }: { resource: Resource }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{resource.name}</CardTitle>
            <CardDescription>{resource.type}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
            <span>{resource.location}</span>
          </div>
          <div className="flex items-start">
            <Phone className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
            <span>{resource.contact}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-start mb-1">
            <Book className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
            <span className="text-sm font-medium">Services:</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {resource.services.map((service, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={resource.website ? "default" : "outline"}
          asChild={!!resource.website}
          disabled={!resource.website}
        >
          {resource.website ? (
            <a href={resource.website} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          ) : (
            "No Website Available"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Resources;
