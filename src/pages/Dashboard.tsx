
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

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [highRiskUsers] = useState<string[]>([]);
  const [newAlert, setNewAlert] = useState(true);

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
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center">
            <span className="inline-flex mr-3 p-2 rounded-lg bg-primary text-white">
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
              className="bg-background border-border"
              onClick={() => setNewAlert(false)}
            >
              <Bell className="h-4 w-4 mr-2 text-primary" />
              Notifications
              {newAlert && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse"></span>
              )}
            </Button>
          </div>
          
          <div className="flex items-center text-sm bg-accent/10 text-accent-foreground px-3 py-1 rounded-full shadow-sm border border-accent/20">
            <Activity className="h-4 w-4 mr-1 text-accent" />
            <span><span className="font-medium">2,547</span> active users</span>
          </div>
          
          {highRiskUsers.length > 0 && (
            <div className="flex items-center text-sm bg-gradient-to-r from-red-50 to-amber-50 dark:from-red-900/30 dark:to-amber-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full shadow-sm border border-red-100 dark:border-red-800">
              <AlertTriangle className="h-4 w-4 mr-1 text-red-600 dark:text-red-400" />
              <span><span className="font-medium">{highRiskUsers.length}</span> high-risk users</span>
            </div>
          )}
          
          <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as "day" | "week" | "month")} className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-3 bg-muted p-1">
              <TabsTrigger value="day" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">24 Hours</TabsTrigger>
              <TabsTrigger value="week" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">7 Days</TabsTrigger>
              <TabsTrigger value="month" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">30 Days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Key metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="card-hover shadow-md border overflow-hidden">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className={`rounded-full p-3 ${
                metric.title.includes("Index") ? "bg-primary/10 text-primary" :
                metric.title.includes("Support") ? "bg-accent/10 text-accent" :
                metric.title.includes("Crisis") ? "bg-destructive/10 text-destructive" :
                "bg-primary/10 text-primary"
              }`}>
                <metric.icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <div className="flex items-end">
                  <h4 className="text-2xl font-bold text-foreground">{metric.value}</h4>
                  <div className={`ml-2 flex items-center text-xs font-medium ${
                    metric.trend === "up" 
                      ? metric.title.includes("Crisis") ? "text-destructive" : "text-accent"
                      : metric.title.includes("Crisis") ? "text-accent" : "text-destructive"
                  }`}>
                    {metric.trend === "up" ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                    {metric.change}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRegion && (
        <Alert className="mb-6 border-primary bg-primary/5 shadow-md">
          <div className="flex items-center">
            <div className="mr-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div>
              <AlertTitle className="text-primary font-medium">Region Focus: {selectedRegion}</AlertTitle>
              <AlertDescription className="text-muted-foreground">
                Viewing mental health data specific to {selectedRegion}. 
                <Button variant="link" className="p-0 h-auto text-primary font-semibold" onClick={() => setSelectedRegion(null)}>
                  Clear Filter
                </Button>
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}

      <Alert className="mb-6 border-destructive bg-destructive/5 shadow-md">
        <div className="flex items-center">
          <div className="mr-3">
            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
          </div>
          <div>
            <AlertTitle className="text-destructive font-medium">Crisis Alert</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Significant increase in anxiety-related terms in the Southern Province in the past 24 hours.
              <Button variant="link" className="p-0 h-auto text-destructive font-semibold" onClick={() => setSelectedRegion("Southern Province")}>
                View Details
              </Button>
            </AlertDescription>
          </div>
        </div>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="card-hover shadow-md border overflow-hidden">
          <CardHeader className="pb-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5 text-primary" />
                  Sentiment Trends
                </CardTitle>
                <CardDescription>
                  Positive, negative, and neutral sentiment across Zambia
                </CardDescription>
              </div>
              <div className="flex items-center text-sm font-medium px-3 py-1 bg-accent/10 text-accent rounded-full">
                <TrendingUp className="mr-1 h-4 w-4" />
                <span>+12% positive</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-80">
            <SentimentChart timeRange={timeRange} />
          </CardContent>
        </Card>

        <Card className="card-hover shadow-md border overflow-hidden">
          <CardHeader className="pb-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-primary" />
                  Emotional Tone Analysis
                </CardTitle>
                <CardDescription>
                  Distribution of detected emotions in mental health conversations
                </CardDescription>
              </div>
              <div className="flex items-center text-sm font-medium px-3 py-1 bg-destructive/10 text-destructive rounded-full">
                <TrendingDown className="mr-1 h-4 w-4" />
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
        <Card className="lg:col-span-2 card-hover shadow-md border overflow-hidden">
          <CardHeader className="pb-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-accent" />
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
                <div className="text-xs text-muted-foreground">Click on a region to focus</div>
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

        <Card className="card-hover shadow-md border overflow-hidden">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-primary" />
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

      {/* Additional Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="card-hover shadow-md border overflow-hidden">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="flex items-center text-lg">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Demographics
            </CardTitle>
            <CardDescription>Age and gender distribution</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Ages 18-24</span>
                <span className="font-medium">32%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{width: '32%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Ages 25-34</span>
                <span className="font-medium">28%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{width: '28%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Ages 35-44</span>
                <span className="font-medium">22%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{width: '22%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Ages 45+</span>
                <span className="font-medium">18%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{width: '18%'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover shadow-md border overflow-hidden">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="flex items-center text-lg">
              <Clock className="mr-2 h-5 w-5 text-accent" />
              Response Times
            </CardTitle>
            <CardDescription>Average support response metrics</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">Hotline</span>
              <span className="text-lg font-bold text-accent">2.3 min</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">Chat Support</span>
              <span className="text-lg font-bold text-accent">5.7 min</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">In-Person</span>
              <span className="text-lg font-bold text-accent">24 hrs</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover shadow-md border overflow-hidden">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="flex items-center text-lg">
              <HeartPulse className="mr-2 h-5 w-5 text-primary" />
              Outcomes
            </CardTitle>
            <CardDescription>Success rates and follow-ups</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Successful Interventions</span>
                <span className="text-sm font-bold text-accent">89%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{width: '89%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Follow-up Completed</span>
                <span className="text-sm font-bold text-primary">76%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{width: '76%'}}></div>
              </div>
            </div>
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">1,247 lives impacted this month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mt-6">
        <Button 
          className="bg-primary hover:bg-primary/90 flex items-center shadow-lg"
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
