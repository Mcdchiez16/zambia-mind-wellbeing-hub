
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  AlertTriangle, Download, RefreshCw, TrendingDown, TrendingUp, Users, 
  Clock, Brain, BarChart, Activity, MessageSquare, Bell, Shield, HeartPulse 
} from "lucide-react";
import SentimentChart from "@/components/charts/SentimentChart";
import KeywordCloud from "@/components/charts/KeywordCloud";
import EmotionDistribution from "@/components/charts/EmotionDistribution";
import RegionalMap from "@/components/charts/RegionalMap";
import ConversationSimulator from "@/components/ConversationSimulator";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [highRiskUsers, setHighRiskUsers] = useState<string[]>([]);
  const [newAlert, setNewAlert] = useState(true);

  // Handle depression detection
  const handleDepressionDetected = (message: any) => {
    // In a real application, this would add the user to a monitoring list
    const userId = `user-${Math.floor(Math.random() * 100)}`;
    if (!highRiskUsers.includes(userId)) {
      setHighRiskUsers(prev => [...prev, userId]);
      toast.error(`Depression indicators detected from User ${userId.split('-')[1]}`, {
        description: "This user has been added to the high-risk monitoring list.",
        duration: 5000,
      });
    }
  };

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

  const healthMetrics = [
    { 
      title: "Mental Health Index", 
      value: "72/100", 
      change: "+4%", 
      trend: "up", 
      description: "Overall mental health score across Zambia",
      icon: Brain
    },
    { 
      title: "Active Support Cases", 
      value: "187", 
      change: "-12%", 
      trend: "down", 
      description: "Currently active mental health support cases",
      icon: HeartPulse
    },
    { 
      title: "Crisis Interventions", 
      value: "23", 
      change: "+5%", 
      trend: "up", 
      description: "Crisis interventions in the past period",
      icon: AlertTriangle
    },
    { 
      title: "Resource Utilization", 
      value: "86%", 
      change: "+14%", 
      trend: "up", 
      description: "Mental health resource utilization rate",
      icon: Shield
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 dark:bg-gray-950 transition-colors">
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
            <span className="inline-flex mr-3 p-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
              <Brain className="h-6 w-6" />
            </span>
            Mental Health Insights Center
          </h1>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
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
              {pulseEffect && <span className="absolute inset-0 bg-violet-300 dark:bg-violet-700 rounded-full animate-ping opacity-75"></span>}
              <span className="sr-only">Refresh data</span>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700"
              onClick={() => setNewAlert(false)}
            >
              <Bell className="h-4 w-4 mr-2 text-violet-500" />
              Notifications
              {newAlert && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </Button>
          </div>
          
          <div className="flex items-center text-sm bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full shadow-sm border border-blue-100 dark:border-blue-800">
            <Activity className="h-4 w-4 mr-1 text-green-600 dark:text-green-400" />
            <span><span className="font-medium">2,547</span> active users</span>
          </div>
          
          {highRiskUsers.length > 0 && (
            <div className="flex items-center text-sm bg-gradient-to-r from-red-50 to-amber-50 dark:from-red-900/30 dark:to-amber-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full shadow-sm border border-red-100 dark:border-red-800">
              <AlertTriangle className="h-4 w-4 mr-1 text-red-600 dark:text-red-400" />
              <span><span className="font-medium">{highRiskUsers.length}</span> high-risk users</span>
            </div>
          )}
          
          <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as "day" | "week" | "month")} className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-3 bg-violet-50 dark:bg-violet-900/30 p-1">
              <TabsTrigger value="day" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-fuchsia-500 data-[state=active]:text-white">24 Hours</TabsTrigger>
              <TabsTrigger value="week" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-fuchsia-500 data-[state=active]:text-white">7 Days</TabsTrigger>
              <TabsTrigger value="month" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-fuchsia-500 data-[state=active]:text-white">30 Days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Key metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="shadow-md border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className={`rounded-full p-3 ${
                metric.title.includes("Index") ? "bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400" :
                metric.title.includes("Support") ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400" :
                metric.title.includes("Crisis") ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400" :
                "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
              }`}>
                <metric.icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.title}</p>
                <div className="flex items-end">
                  <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{metric.value}</h4>
                  <div className={`ml-2 flex items-center text-xs font-medium ${
                    metric.trend === "up" 
                      ? metric.title.includes("Crisis") ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                      : metric.title.includes("Crisis") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}>
                    {metric.trend === "up" ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                    {metric.change}
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRegion && (
        <Alert className="mb-6 border-violet-500 bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-900/30 dark:to-fuchsia-800/20 dark:border-violet-800 shadow-md">
          <div className="flex items-center">
            <div className="mr-3">
              <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center">
                <Users className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
            </div>
            <div>
              <AlertTitle className="text-violet-800 dark:text-violet-300 font-medium">Region Focus: {selectedRegion}</AlertTitle>
              <AlertDescription className="text-violet-700 dark:text-violet-400">
                Viewing mental health data specific to {selectedRegion}. 
                <Button variant="link" className="p-0 h-auto text-violet-800 dark:text-violet-300 font-semibold" onClick={() => setSelectedRegion(null)}>
                  Clear Filter
                </Button>
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}

      <Alert className="mb-6 border-yellow-500 bg-gradient-to-r from-yellow-50 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/20 dark:border-yellow-800 shadow-md">
        <div className="flex items-center">
          <div className="mr-3">
            <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div>
            <AlertTitle className="text-yellow-800 dark:text-yellow-300 font-medium">Crisis Alert</AlertTitle>
            <AlertDescription className="text-yellow-700 dark:text-yellow-400">
              Significant increase in anxiety-related terms in the Southern Province in the past 24 hours.
              <Button variant="link" className="p-0 h-auto text-yellow-800 dark:text-yellow-300 font-semibold" onClick={() => setSelectedRegion("Southern Province")}>
                View Details
              </Button>
            </AlertDescription>
          </div>
        </div>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-md border-gray-200 bg-gradient-to-br from-white to-violet-50 dark:from-gray-900 dark:to-violet-950 dark:border-gray-800 overflow-hidden">
          <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5 text-violet-500" />
                  Sentiment Trends
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Positive, negative, and neutral sentiment across Zambia
                </CardDescription>
              </div>
              <div className="flex items-center text-sm font-medium px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500 dark:text-green-400" />
                <span>+12% positive</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-80">
            <SentimentChart timeRange={timeRange} />
          </CardContent>
        </Card>

        <Card className="shadow-md border-gray-200 bg-gradient-to-br from-white to-fuchsia-50 dark:from-gray-900 dark:to-fuchsia-950 dark:border-gray-800 overflow-hidden">
          <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-fuchsia-500" />
                  Emotional Tone Analysis
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Distribution of detected emotions in mental health conversations
                </CardDescription>
              </div>
              <div className="flex items-center text-sm font-medium px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full">
                <TrendingDown className="mr-1 h-4 w-4 text-amber-500 dark:text-amber-400" />
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
        <Card className="lg:col-span-2 shadow-md border-gray-200 bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950 dark:border-gray-800 overflow-hidden">
          <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-green-500" />
                  Regional Mental Health Map
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
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
                <div className="text-xs text-gray-500 dark:text-gray-400">Click on a region to focus</div>
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

        <Card className="shadow-md border-gray-200 bg-gradient-to-br from-white to-yellow-50 dark:from-gray-900 dark:to-yellow-950 dark:border-gray-800 overflow-hidden">
          <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-yellow-500" />
              Trending Keywords
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Common topics in mental health discussions
            </CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <KeywordCloud timeRange={timeRange} />
          </CardContent>
        </Card>
      </div>

      {/* Conversation simulator with improved UI */}
      <Card className="mb-8 shadow-lg overflow-hidden border-violet-200 dark:border-violet-800">
        <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-950/50 dark:to-fuchsia-950/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-2 rounded-lg mr-3 text-white">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Conversation Sentiment Analyzer</CardTitle>
                <CardDescription>Test the mental health detection system with sample conversations</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-300 border-violet-200 dark:border-violet-800">
              AI-Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ConversationSimulator onDepressiveContentDetected={handleDepressionDetected} />
        </CardContent>
      </Card>

      <div className="flex justify-end mt-6">
        <Button 
          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 flex items-center shadow-lg"
          onClick={() => toast.success("Report download started!")}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Insights Report
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
