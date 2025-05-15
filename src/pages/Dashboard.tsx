
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import SentimentChart from "@/components/charts/SentimentChart";
import KeywordCloud from "@/components/charts/KeywordCloud";
import EmotionDistribution from "@/components/charts/EmotionDistribution";
import RegionalMap from "@/components/charts/RegionalMap";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mental Health Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Real-time mental health sentiment trends across Zambia
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as "day" | "week" | "month")}>
            <TabsList>
              <TabsTrigger value="day">24 Hours</TabsTrigger>
              <TabsTrigger value="week">7 Days</TabsTrigger>
              <TabsTrigger value="month">30 Days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Alert className="mb-8 border-yellow-500 bg-yellow-50">
        <AlertTriangle className="h-5 w-5 text-yellow-600" />
        <AlertTitle className="text-yellow-800">Crisis Alert</AlertTitle>
        <AlertDescription className="text-yellow-700">
          Significant increase in anxiety-related terms in the Southern Province. 
          <Button variant="link" className="p-0 h-auto text-yellow-800 font-semibold">
            View Details
          </Button>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Overall Sentiment Trends</CardTitle>
            <CardDescription>
              Positive, negative, and neutral sentiment across Zambia
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <SentimentChart timeRange={timeRange} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emotional Tone Analysis</CardTitle>
            <CardDescription>
              Distribution of detected emotions in mental health conversations
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <EmotionDistribution timeRange={timeRange} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Regional Mental Health Map</CardTitle>
            <CardDescription>
              Geographic distribution of mental health indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <RegionalMap timeRange={timeRange} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trending Keywords</CardTitle>
            <CardDescription>
              Common topics in mental health discussions
            </CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <KeywordCloud timeRange={timeRange} />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mt-4">
        <Button className="bg-blue-600 hover:bg-blue-700">
          Download Report
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
