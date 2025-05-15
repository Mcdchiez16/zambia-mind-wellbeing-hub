import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangle, Download, RefreshCw, TrendingDown, TrendingUp, Users, Clock, Brain, BarChart, Activity, MessageSquare } from "lucide-react";
import SentimentChart from "@/components/charts/SentimentChart";
import KeywordCloud from "@/components/charts/KeywordCloud";
import EmotionDistribution from "@/components/charts/EmotionDistribution";
import RegionalMap from "@/components/charts/RegionalMap";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [pulseEffect, setPulseEffect] = useState(false);

  // Simulate data refresh
  const refreshData = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setLastUpdated(new Date());
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 1000);
      toast.success("Insights data refreshed successfully");
    }, 1200);
  };

  // Initial load effect
  useEffect(() => {
    refreshData();
    
    // Set up auto-refresh interval (every 5 minutes)
    const interval = setInterval(() => {
      refreshData();
    }, 300000); // 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  // Format time for last updated
  const formatLastUpdated = () => {
    return lastUpdated.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <span className="inline-flex mr-3 p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Brain className="h-6 w-6" />
            </span>
            Mental Health Insights Center
          </h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Clock className="h-4 w-4 mr-1" /> 
            Live data as of: {formatLastUpdated()}
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2 h-8 w-8 p-0 relative" 
              onClick={refreshData}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {pulseEffect && <span className="absolute inset-0 bg-blue-300 rounded-full animate-ping opacity-75"></span>}
              <span className="sr-only">Refresh data</span>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex items-center text-sm bg-gradient-to-r from-green-50 to-blue-50 text-blue-700 px-3 py-1 rounded-full shadow-sm border border-blue-100">
            <Activity className="h-4 w-4 mr-1 text-green-600" />
            <span><span className="font-medium">2,547</span> active users</span>
          </div>
          
          <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as "day" | "week" | "month")} className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-3 bg-blue-50 p-1">
              <TabsTrigger value="day" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">24 Hours</TabsTrigger>
              <TabsTrigger value="week" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">7 Days</TabsTrigger>
              <TabsTrigger value="month" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">30 Days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {selectedRegion && (
        <Alert className="mb-6 border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 shadow-md">
          <div className="flex items-center">
            <div className="mr-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div>
              <AlertTitle className="text-blue-800 font-medium">Region Focus: {selectedRegion}</AlertTitle>
              <AlertDescription className="text-blue-700">
                Viewing mental health data specific to {selectedRegion}. 
                <Button variant="link" className="p-0 h-auto text-blue-800 font-semibold" onClick={() => setSelectedRegion(null)}>
                  Clear Filter
                </Button>
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}

      <Alert className="mb-6 border-yellow-500 bg-gradient-to-r from-yellow-50 to-amber-100 shadow-md">
        <div className="flex items-center">
          <div className="mr-3">
            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
          <div>
            <AlertTitle className="text-yellow-800 font-medium">Crisis Alert</AlertTitle>
            <AlertDescription className="text-yellow-700">
              Significant increase in anxiety-related terms in the Southern Province in the past 24 hours.
              <Button variant="link" className="p-0 h-auto text-yellow-800 font-semibold" onClick={() => setSelectedRegion("Southern Province")}>
                View Details
              </Button>
            </AlertDescription>
          </div>
        </div>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-md border-gray-200 bg-gradient-to-br from-white to-blue-50 overflow-hidden">
          <CardHeader className="pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5 text-blue-500" />
                  Sentiment Trends
                </CardTitle>
                <CardDescription>
                  Positive, negative, and neutral sentiment across Zambia
                </CardDescription>
              </div>
              <div className="flex items-center text-sm font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                <span>+12% positive</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-80">
            <SentimentChart timeRange={timeRange} />
          </CardContent>
        </Card>

        <Card className="shadow-md border-gray-200 bg-gradient-to-br from-white to-purple-50 overflow-hidden">
          <CardHeader className="pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-purple-500" />
                  Emotional Tone Analysis
                </CardTitle>
                <CardDescription>
                  Distribution of detected emotions in mental health conversations
                </CardDescription>
              </div>
              <div className="flex items-center text-sm font-medium px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
                <TrendingDown className="mr-1 h-4 w-4 text-amber-500" />
                <span>+8% anxiety</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-80">
            <EmotionDistribution timeRange={timeRange} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 shadow-md border-gray-200 bg-gradient-to-br from-white to-green-50 overflow-hidden">
          <CardHeader className="pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-green-500" />
                  Regional Mental Health Map
                </CardTitle>
                <CardDescription>
                  Geographic distribution of mental health indicators
                </CardDescription>
              </div>
              {selectedRegion ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedRegion(null)}
                  className="text-xs h-8"
                >
                  Clear Region Filter
                </Button>
              ) : (
                <div className="text-xs text-gray-500">Click on a region to focus</div>
              )}
            </div>
          </CardHeader>
          <CardContent className="h-96">
            <RegionalMap 
              timeRange={timeRange} 
              onRegionSelect={setSelectedRegion}
              selectedRegion={selectedRegion}
            />
          </CardContent>
        </Card>

        <Card className="shadow-md border-gray-200 bg-gradient-to-br from-white to-yellow-50 overflow-hidden">
          <CardHeader className="pb-4 border-b border-gray-100">
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-yellow-500" />
              Trending Keywords
            </CardTitle>
            <CardDescription>
              Common topics in mental health discussions
            </CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <KeywordCloud timeRange={timeRange} />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mt-6">
        <Button 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center shadow-lg"
          onClick={() => toast.success("Report download started!")}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
