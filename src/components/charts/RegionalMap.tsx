
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, ArrowRight, AlertTriangle } from "lucide-react";

interface RegionalMapProps {
  timeRange: "day" | "week" | "month";
  onRegionSelect?: (region: string | null) => void;
  selectedRegion?: string | null;
}

interface RegionData {
  id: string;
  name: string;
  sentiment: "high" | "medium" | "low";
  crisisLevel: number;
  change: "up" | "down" | "stable";
  coordinates: { x: number; y: number };
  issues: string[];
  population: number;
}

const RegionalMap = ({ timeRange, onRegionSelect, selectedRegion }: RegionalMapProps) => {
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Generate more detailed region data based on time range
    const baseRegions: RegionData[] = [
      { 
        id: "lusaka", 
        name: "Lusaka", 
        sentiment: "medium", 
        crisisLevel: 3, 
        change: "up", 
        coordinates: { x: 45, y: 65 },
        issues: ["Anxiety", "Work Stress", "Sleep Disorders"],
        population: 3.2
      },
      { 
        id: "copperbelt", 
        name: "Copperbelt", 
        sentiment: "low", 
        crisisLevel: 4, 
        change: "up", 
        coordinates: { x: 30, y: 25 },
        issues: ["Depression", "Substance Abuse", "PTSD"],
        population: 2.5
      },
      { 
        id: "eastern", 
        name: "Eastern Province", 
        sentiment: "medium", 
        crisisLevel: 2, 
        change: "stable", 
        coordinates: { x: 75, y: 48 },
        issues: ["Anxiety", "Isolation", "Grief"],
        population: 1.8
      },
      { 
        id: "southern", 
        name: "Southern Province", 
        sentiment: "low", 
        crisisLevel: 5, 
        change: "up", 
        coordinates: { x: 40, y: 80 },
        issues: ["Depression", "Anxiety", "Trauma", "Suicidal Ideation"],
        population: 1.9
      },
      { 
        id: "northern", 
        name: "Northern Province", 
        sentiment: "high", 
        crisisLevel: 1, 
        change: "down", 
        coordinates: { x: 35, y: 12 },
        issues: ["Mild Stress"],
        population: 1.2
      },
      { 
        id: "western", 
        name: "Western Province", 
        sentiment: "medium", 
        crisisLevel: 3, 
        change: "stable", 
        coordinates: { x: 15, y: 60 },
        issues: ["Anxiety", "Depression", "Grief"],
        population: 1.0
      },
      { 
        id: "central", 
        name: "Central Province", 
        sentiment: "high", 
        crisisLevel: 2, 
        change: "down", 
        coordinates: { x: 50, y: 40 },
        issues: ["Stress", "Sleep Issues"],
        population: 1.5
      },
    ];
    
    // Adjust data based on time range if needed
    setRegions(baseRegions);
    
    // Simulate map loading
    setTimeout(() => setMapLoaded(true), 800);
  }, [timeRange]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "high": return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
      case "low": return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  const getCrisisLevelColor = (level: number) => {
    if (level <= 1) return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
    if (level <= 3) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
    return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
  };

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "up": return <ArrowUp className="h-4 w-4 text-red-600 dark:text-red-400" />;
      case "down": return <ArrowDown className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case "stable": return <ArrowRight className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
      default: return null;
    }
  };

  const handleRegionClick = (region: RegionData) => {
    if (onRegionSelect) {
      onRegionSelect(region.name === selectedRegion ? null : region.name);
    }
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 bg-blue-50 dark:bg-blue-950/30 rounded-lg relative overflow-hidden">
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {/* Zambia map outline */}
        <svg 
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`} 
          viewBox="0 0 100 100" 
          preserveAspectRatio="xMidYMid meet"
        >
          <path 
            d="M15,20 C20,15 35,10 50,12 C65,15 80,25 85,40 C90,55 80,75 70,80 C60,85 40,85 30,75 C20,65 10,25 15,20 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            className="text-blue-300 dark:text-blue-700"
          />
          
          {/* Rivers */}
          <path 
            d="M30,20 C35,30 40,50 30,70" 
            fill="none" 
            stroke="#60A5FA" 
            strokeWidth="0.5" 
            strokeDasharray="0.5,0.5" 
          />
          
          <path 
            d="M70,30 C65,40 50,50 45,75" 
            fill="none" 
            stroke="#60A5FA" 
            strokeWidth="0.5" 
            strokeDasharray="0.5,0.5" 
          />
          
          {/* Province boundaries */}
          <path 
            d="M30,30 C40,35 60,35 70,30" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.2" 
            strokeDasharray="0.5,0.5" 
            className="text-gray-400 dark:text-gray-600"
          />
          
          <path 
            d="M25,50 C40,45 60,45 75,50" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.2" 
            strokeDasharray="0.5,0.5"
            className="text-gray-400 dark:text-gray-600" 
          />
          
          {/* Alert zone for Southern Province */}
          {selectedRegion === "Southern Province" && (
            <circle 
              cx="40" 
              cy="80" 
              r="15" 
              fill="url(#alertGradient)" 
              opacity="0.3"
              className="animate-pulse"
            />
          )}
          
          {/* Gradient definitions */}
          <defs>
            <radialGradient id="alertGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="red" stopOpacity="1" />
              <stop offset="100%" stopColor="red" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        
        {/* Region markers */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {regions.map((region) => (
            <div 
              key={region.id}
              className={`absolute cursor-pointer transition-all duration-300 group`}
              style={{ 
                top: `${region.coordinates.y}%`, 
                left: `${region.coordinates.x}%`,
              }}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick(region)}
            >
              <div className={`
                relative w-6 h-6 rounded-full border-2 border-white shadow-md
                transition-all duration-300 hover:scale-110
                ${selectedRegion === region.name ? 'ring-2 ring-blue-500 ring-offset-2 scale-125' : ''}
                ${region.sentiment === 'high' ? 'bg-green-500 dark:bg-green-600' : 
                  region.sentiment === 'medium' ? 'bg-yellow-500 dark:bg-yellow-600' : 'bg-red-500 dark:bg-red-600'}
              `}>
                {region.crisisLevel >= 4 && (
                  <div className="absolute -top-1 -right-1 bg-red-600 rounded-full p-0.5 border border-white">
                    <AlertTriangle className="h-2 w-2 text-white" />
                  </div>
                )}
              </div>
              
              {/* Info bubble on hover */}
              <div className={`
                absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48
                bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 text-xs z-10
                transition-all duration-200
                ${hoveredRegion === region.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
              `}>
                <div className="font-bold mb-1">{region.name}</div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Population:</span>
                  <span>{region.population}M</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Crisis Level:</span>
                  <span className={`font-medium ${
                    region.crisisLevel >= 4 ? "text-red-600 dark:text-red-400" : 
                    region.crisisLevel >= 2 ? "text-yellow-600 dark:text-yellow-400" : 
                    "text-green-600 dark:text-green-400"
                  }`}>Level {region.crisisLevel}</span>
                </div>
                {region.issues.length > 0 && (
                  <div className="mt-1">
                    <span className="text-gray-600 dark:text-gray-400">Key Issues:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {region.issues.slice(0, 3).map((issue, i) => (
                        <span 
                          key={i} 
                          className={`px-1.5 py-0.5 rounded-full text-[10px] ${getCrisisLevelColor(region.crisisLevel)}`}
                        >
                          {issue}
                        </span>
                      ))}
                      {region.issues.length > 3 && <span className="text-[10px]">+{region.issues.length - 3} more</span>}
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Legends */}
        <div className="absolute bottom-2 left-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg text-xs">
          <div className="text-gray-700 dark:text-gray-300 font-medium mb-1">Sentiment</div>
          <div className="flex items-center gap-2">
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 dark:bg-green-600 inline-block mr-1"></span>
              High
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-yellow-500 dark:bg-yellow-600 inline-block mr-1"></span>
              Medium
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-500 dark:bg-red-600 inline-block mr-1"></span>
              Low
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-auto max-h-36">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead>
            <tr>
              <th className="py-2 text-left font-medium text-gray-500 dark:text-gray-400">Region</th>
              <th className="py-2 text-left font-medium text-gray-500 dark:text-gray-400">Sentiment</th>
              <th className="py-2 text-left font-medium text-gray-500 dark:text-gray-400">Crisis Level</th>
              <th className="py-2 text-left font-medium text-gray-500 dark:text-gray-400">Trend</th>
              <th className="py-2 text-left font-medium text-gray-500 dark:text-gray-400">Issues</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {regions.map((region) => (
              <tr 
                key={region.id} 
                className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors ${selectedRegion === region.name ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                onClick={() => handleRegionClick(region)}
              >
                <td className="py-2">{region.name}</td>
                <td className="py-2">
                  <Badge variant="outline" className={getSentimentColor(region.sentiment)}>
                    {region.sentiment}
                  </Badge>
                </td>
                <td className="py-2">
                  <Badge variant="outline" className={getCrisisLevelColor(region.crisisLevel)}>
                    Level {region.crisisLevel}
                  </Badge>
                </td>
                <td className="py-2">
                  <span className="flex justify-center">
                    {getChangeIcon(region.change)}
                  </span>
                </td>
                <td className="py-2 max-w-[150px] truncate">
                  {region.issues.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegionalMap;
