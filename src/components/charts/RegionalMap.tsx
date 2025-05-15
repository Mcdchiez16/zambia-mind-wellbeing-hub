
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RegionalMapProps {
  timeRange: "day" | "week" | "month";
  onRegionSelect?: (region: string | null) => void;
  selectedRegion?: string | null;
}

const RegionalMap = ({ timeRange, onRegionSelect, selectedRegion }: RegionalMapProps) => {
  const [regions, setRegions] = useState<RegionData[]>([]);

  interface RegionData {
    id: string;
    name: string;
    sentiment: "high" | "medium" | "low";
    crisisLevel: number;
    change: "up" | "down" | "stable";
  }

  useEffect(() => {
    // Generate region data based on time range
    const baseRegions: RegionData[] = [
      { id: "lusaka", name: "Lusaka", sentiment: "medium", crisisLevel: 3, change: "up" },
      { id: "copperbelt", name: "Copperbelt", sentiment: "low", crisisLevel: 4, change: "up" },
      { id: "eastern", name: "Eastern Province", sentiment: "medium", crisisLevel: 2, change: "stable" },
      { id: "southern", name: "Southern Province", sentiment: "low", crisisLevel: 5, change: "up" },
      { id: "northern", name: "Northern Province", sentiment: "high", crisisLevel: 1, change: "down" },
      { id: "western", name: "Western Province", sentiment: "medium", crisisLevel: 3, change: "stable" },
      { id: "central", name: "Central Province", sentiment: "high", crisisLevel: 2, change: "down" },
    ];
    
    // Adjust data based on time range
    setRegions(baseRegions);
  }, [timeRange]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "high": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getCrisisLevelColor = (level: number) => {
    if (level <= 1) return "bg-green-100 text-green-800";
    if (level <= 3) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "up": return "↑";
      case "down": return "↓";
      case "stable": return "→";
      default: return "";
    }
  };

  const handleRegionClick = (region: RegionData) => {
    if (onRegionSelect) {
      onRegionSelect(region.name === selectedRegion ? null : region.name);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 bg-blue-50 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          {/* Placeholder for a real map visualization */}
          <p>Interactive map of Zambia would appear here</p>
        </div>
        
        {/* Region markers - in a real implementation these would be positioned correctly on the map */}
        <div className="absolute inset-0">
          {regions.map((region, index) => (
            <div 
              key={index}
              className={`absolute w-6 h-6 rounded-full border-2 border-white cursor-pointer transition-all duration-300 hover:scale-110 shadow-md
                ${selectedRegion === region.name ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                ${region.sentiment === 'high' ? 'bg-green-500' : 
                  region.sentiment === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ 
                top: `${20 + (index * 10)}%`, 
                left: `${20 + (index * 8)}%` 
              }}
              title={region.name}
              onClick={() => handleRegionClick(region)}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-auto max-h-36">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead>
            <tr>
              <th className="py-2 text-left font-medium text-gray-500">Region</th>
              <th className="py-2 text-left font-medium text-gray-500">Sentiment</th>
              <th className="py-2 text-left font-medium text-gray-500">Crisis Level</th>
              <th className="py-2 text-left font-medium text-gray-500">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {regions.map((region) => (
              <tr 
                key={region.id} 
                className={`hover:bg-gray-50 cursor-pointer transition-colors ${selectedRegion === region.name ? 'bg-blue-50' : ''}`}
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
                  <span className={`font-bold ${
                    region.change === 'up' ? 'text-red-600' : 
                    region.change === 'down' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {getChangeIcon(region.change)}
                  </span>
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
