
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sentimentText, setSentimentText] = useState("");
  const [sentimentResult, setSentimentResult] = useState<null | {
    score: number;
    sentiment: string;
    keywords: string[];
  }>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login - in a real app this would authenticate against a backend
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: "Welcome to the Admin Portal",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const analyzeSentiment = () => {
    if (!sentimentText.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to analyze",
        variant: "destructive",
      });
      return;
    }
    
    // Demo sentiment analysis - in a real app this would call an NLP API
    const words = sentimentText.toLowerCase().split(/\s+/);
    const positiveWords = ["good", "great", "happy", "positive", "better", "improve", "hope"];
    const negativeWords = ["bad", "sad", "depressed", "anxious", "worried", "stress", "fear"];
    
    let score = 50; // Neutral starting point
    
    const foundKeywords: string[] = [];
    
    words.forEach(word => {
      if (positiveWords.includes(word)) {
        score += 5;
        if (!foundKeywords.includes(word)) foundKeywords.push(word);
      }
      if (negativeWords.includes(word)) {
        score -= 5;
        if (!foundKeywords.includes(word)) foundKeywords.push(word);
      }
    });
    
    // Clamp score between 0 and 100
    score = Math.min(100, Math.max(0, score));
    
    setSentimentResult({
      score,
      sentiment: score > 60 ? "Positive" : score < 40 ? "Negative" : "Neutral",
      keywords: foundKeywords
    });
    
    toast({
      title: "Analysis complete",
      description: "Sentiment analysis has been processed",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Demo file upload - in a real app this would process the file
    if (e.target.files && e.target.files[0]) {
      toast({
        title: "File uploaded",
        description: `${e.target.files[0].name} has been uploaded successfully`,
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Access the admin dashboard to manage data and reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <p className="text-xs text-gray-500">For demo: use "admin" and "password"</p>
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Portal</h1>
          <p className="text-gray-600">Manage data, generate reports, and analyze sentiment</p>
        </div>
        <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Logout</Button>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="analysis">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">124</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Crisis Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">3</p>
                <p className="text-sm text-red-600">+2 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">User Check-ins</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">528</p>
                <p className="text-sm text-green-600">+48 from yesterday</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Crisis Alerts</CardTitle>
              <CardDescription>
                Current active mental health crisis alerts that may require attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-md p-4 flex">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800">Suicide-related terms spike in Southern Province</h4>
                    <p className="text-sm text-red-600 mt-1">
                      Detected 34 mentions in the past 24 hours, 180% increase from baseline.
                    </p>
                    <div className="mt-2">
                      <Button size="sm" variant="outline" className="mr-2">View Details</Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">Take Action</Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Anxiety surge in Lusaka among 18-24 age group</h4>
                    <p className="text-sm text-yellow-600 mt-1">
                      28% increase in anxiety-related terms over the past week, concentrated in urban areas.
                    </p>
                    <div className="mt-2">
                      <Button size="sm" variant="outline" className="mr-2">View Details</Button>
                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">Monitor</Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-md p-4 flex">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-orange-800">Depression mentions increasing in Eastern Province</h4>
                    <p className="text-sm text-orange-600 mt-1">
                      52% increase in depression-related terms over the past month, primarily in rural communities.
                    </p>
                    <div className="mt-2">
                      <Button size="sm" variant="outline" className="mr-2">View Details</Button>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">Monitor</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system activities and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Report Generated", user: "Dr. Mwanza", time: "10 minutes ago" },
                    { action: "New Data Uploaded", user: "Analyst Team", time: "2 hours ago" },
                    { action: "Crisis Alert Triggered", user: "System", time: "5 hours ago" },
                    { action: "User Data Exported", user: "Admin", time: "Yesterday" },
                    { action: "System Settings Updated", user: "System Admin", time: "2 days ago" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-gray-500">By {item.user}</p>
                      </div>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Sources</CardTitle>
                <CardDescription>Connected data sources and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Social Media API", status: "Active", lastUpdate: "5 minutes ago" },
                    { name: "Survey Data", status: "Active", lastUpdate: "1 hour ago" },
                    { name: "Helpline Reports", status: "Active", lastUpdate: "3 hours ago" },
                    { name: "Community Forums", status: "Inactive", lastUpdate: "2 days ago" },
                    { name: "Healthcare Data", status: "Active", lastUpdate: "Yesterday" }
                  ].map((source, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{source.name}</p>
                        <p className="text-sm text-gray-500">Last update: {source.lastUpdate}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        source.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {source.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Sentiment Analysis Tool</CardTitle>
                  <CardDescription>
                    Enter text to analyze sentiment and identify mental health indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="sentiment-text">Text to Analyze</Label>
                    <Textarea 
                      id="sentiment-text"
                      placeholder="Enter text from surveys, social media, or other sources to analyze..."
                      className="min-h-[150px]"
                      value={sentimentText}
                      onChange={(e) => setSentimentText(e.target.value)}
                    />
                  </div>
                  <Button onClick={analyzeSentiment}>Analyze Sentiment</Button>
                  
                  {sentimentResult && (
                    <div className="bg-blue-50 p-4 rounded-md mt-4">
                      <h3 className="font-medium text-lg mb-2">Analysis Results</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Sentiment Score:</p>
                          <div className="h-2 bg-gray-200 rounded-full mt-1">
                            <div 
                              className={`h-full rounded-full ${
                                sentimentResult.sentiment === "Positive" ? "bg-green-500" :
                                sentimentResult.sentiment === "Negative" ? "bg-red-500" : "bg-yellow-500"
                              }`}
                              style={{ width: `${sentimentResult.score}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>Negative</span>
                            <span>Neutral</span>
                            <span>Positive</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600">Overall Sentiment:</p>
                          <p className={`font-medium ${
                            sentimentResult.sentiment === "Positive" ? "text-green-600" :
                            sentimentResult.sentiment === "Negative" ? "text-red-600" : "text-yellow-600"
                          }`}>
                            {sentimentResult.sentiment}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600">Key Terms Identified:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {sentimentResult.keywords.length > 0 ? (
                              sentimentResult.keywords.map((keyword, index) => (
                                <span 
                                  key={index} 
                                  className="px-2 py-1 bg-white text-blue-700 border border-blue-200 rounded-full text-xs font-medium"
                                >
                                  {keyword}
                                </span>
                              ))
                            ) : (
                              <span className="text-sm text-gray-500">No significant keywords detected</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Upload Data</CardTitle>
                  <CardDescription>
                    Upload files for batch processing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      Drag and drop files or click to browse
                    </p>
                    <Input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Select Files
                    </Button>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    <p>Supported formats: CSV, TXT, XLSX</p>
                    <p>Maximum file size: 10MB</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Analysis History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    {[
                      { name: "Survey Responses May 2025", date: "Yesterday" },
                      { name: "Twitter Data Analysis", date: "3 days ago" },
                      { name: "Eastern Province Reports", date: "1 week ago" },
                      { name: "Youth Mental Health Survey", date: "2 weeks ago" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-gray-500">{item.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ReportCard 
              title="Weekly Sentiment Report"
              description="Summary of sentiment trends from the past week"
              date="May 15, 2025"
            />
            <ReportCard 
              title="Monthly Insights"
              description="Detailed analysis of April 2025 mental health data"
              date="May 1, 2025"
            />
            <ReportCard 
              title="Crisis Response Report"
              description="Review of crisis interventions and outcomes"
              date="April 28, 2025"
            />
            <ReportCard 
              title="Youth Mental Health"
              description="Focus study on mental health trends among 15-24 age group"
              date="April 15, 2025"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
              <CardDescription>
                Create custom reports based on available data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input id="report-name" placeholder="Enter report name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="report-type">Report Type</Label>
                    <select 
                      id="report-type" 
                      className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md"
                    >
                      <option value="weekly">Weekly Summary</option>
                      <option value="monthly">Monthly Insights</option>
                      <option value="crisis">Crisis Analysis</option>
                      <option value="demographic">Demographic Report</option>
                      <option value="custom">Custom Report</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date-range">Date Range</Label>
                    <select 
                      id="date-range" 
                      className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md"
                    >
                      <option value="7days">Last 7 days</option>
                      <option value="30days">Last 30 days</option>
                      <option value="90days">Last 90 days</option>
                      <option value="custom">Custom range</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regions">Regions</Label>
                    <select 
                      id="regions" 
                      className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md"
                    >
                      <option value="all">All Regions</option>
                      <option value="lusaka">Lusaka</option>
                      <option value="copperbelt">Copperbelt</option>
                      <option value="southern">Southern Province</option>
                      <option value="eastern">Eastern Province</option>
                      <option value="other">Other Regions</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="format">Format</Label>
                    <select 
                      id="format" 
                      className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md"
                    >
                      <option value="pdf">PDF Report</option>
                      <option value="xlsx">Excel Spreadsheet</option>
                      <option value="csv">CSV Data</option>
                      <option value="dashboard">Interactive Dashboard</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="report-notes">Additional Notes</Label>
                  <Textarea 
                    id="report-notes" 
                    placeholder="Add any specific requirements or notes for the report..." 
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button>Generate Report</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ReportCard = ({ title, description, date }: { title: string, description: string, date: string }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-gray-500 mb-2">Generated on: {date}</div>
      </CardContent>
      <div className="px-6 pb-6 pt-0 mt-auto">
        <Button variant="outline" className="w-full flex items-center justify-center">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </Card>
  );
};

export default Admin;
