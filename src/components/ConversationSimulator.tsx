
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Frown, MessageCircle, Smile, AlertTriangle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Message = {
  id: string;
  content: string;
  timestamp: Date;
  sentiment: "positive" | "negative" | "neutral";
  depressionIndicator: boolean;
  isUser: boolean;
};

type ConversationProps = {
  onDepressiveContentDetected?: (message: Message) => void;
};

const randomResponses = {
  positive: [
    "I'm feeling better today after talking with my therapist.",
    "I managed to accomplish all my tasks today, feeling proud.",
    "The meditation exercises are really helping me focus.",
    "I've been connecting more with my friends lately.",
    "I found a new hobby that brings me joy.",
  ],
  negative: [
    "I couldn't get out of bed again today.",
    "Nothing seems to matter anymore.",
    "I feel like I'm a burden to everyone around me.",
    "I haven't been able to sleep properly for weeks.",
    "Everything feels overwhelming and hopeless.",
  ],
  neutral: [
    "I went to the market today.",
    "The weather is changing.",
    "I watched a documentary last night.",
    "I need to schedule my next appointment.",
    "Just checking in as requested.",
  ],
};

const depressionKeywords = [
  "hopeless", "worthless", "suicide", "die", "end it all", "can't go on",
  "no reason to live", "burden", "no future", "trapped", "endless pain",
  "never get better", "alone", "no point", "exhausted constantly"
];

const ConversationSimulator = ({ onDepressiveContentDetected }: ConversationProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [simulationActive, setSimulationActive] = useState(false);
  const [depressiveContentDetected, setDepressiveContentDetected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to analyze text for depression indicators
  const analyzeForDepressionSigns = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return depressionKeywords.some(keyword => lowerText.includes(keyword));
  };

  // Function to determine sentiment
  const analyzeSentiment = (text: string): "positive" | "negative" | "neutral" => {
    // Very simple sentiment analysis
    const lowerText = text.toLowerCase();
    const positiveWords = ["good", "happy", "better", "joy", "hope", "grateful", "excited", "accomplished"];
    const negativeWords = ["bad", "sad", "worse", "hopeless", "tired", "exhausted", "depressed", "anxious"];
    
    const positiveScore = positiveWords.reduce((count, word) => 
      count + (lowerText.includes(word) ? 1 : 0), 0);
    
    const negativeScore = negativeWords.reduce((count, word) => 
      count + (lowerText.includes(word) ? 1 : 0), 0);

    if (positiveScore > negativeScore) return "positive";
    if (negativeScore > positiveScore) return "negative";
    return "neutral";
  };

  // Simulate a conversation with realistic timing
  useEffect(() => {
    if (!simulationActive) return;
    
    const interval = setInterval(() => {
      // Randomly decide message type
      const messageTypes = ["positive", "negative", "neutral"] as const;
      const randomType = messageTypes[Math.floor(Math.random() * messageTypes.length)] as "positive" | "negative" | "neutral";
      
      // Get random message of that type
      const responses = randomResponses[randomType];
      const randomMessage = responses[Math.floor(Math.random() * responses.length)];
      
      // Check for depression indicators
      const hasDepressionIndicators = analyzeForDepressionSigns(randomMessage);
      
      if (hasDepressionIndicators) {
        setDepressiveContentDetected(true);
        // Alert the parent component
        if (onDepressiveContentDetected) {
          const message = {
            id: Date.now().toString(),
            content: randomMessage,
            timestamp: new Date(),
            sentiment: randomType,
            depressionIndicator: true,
            isUser: false
          };
          onDepressiveContentDetected(message);
        }
      }
      
      // Add new message
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: randomMessage,
        timestamp: new Date(),
        sentiment: randomType,
        depressionIndicator: hasDepressionIndicators,
        isUser: false
      }]);
    }, 8000); // New message every 8 seconds
    
    return () => clearInterval(interval);
  }, [simulationActive, onDepressiveContentDetected]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleSimulation = () => {
    if (!simulationActive) {
      setMessages([]);
      setDepressiveContentDetected(false);
      toast.success("Conversation simulation started");
    } else {
      toast.info("Simulation stopped");
    }
    setSimulationActive(!simulationActive);
  };

  const getSentimentIcon = (sentiment: "positive" | "negative" | "neutral") => {
    switch (sentiment) {
      case "positive":
        return <Smile className="h-4 w-4 text-green-500" />;
      case "negative":
        return <Frown className="h-4 w-4 text-red-500" />;
      default:
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Card className="shadow-md border-gray-200 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950 overflow-hidden h-[500px] flex flex-col">
      <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-indigo-500" />
              Live Conversation Monitoring
            </CardTitle>
            <CardDescription>
              Real-time sentiment analysis of user conversations
            </CardDescription>
          </div>
          <Button 
            onClick={toggleSimulation}
            variant={simulationActive ? "destructive" : "default"}
            className={simulationActive ? 
              "bg-red-500 hover:bg-red-600" : 
              "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            }
          >
            {simulationActive ? "Stop Simulation" : "Start Simulation"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-0">
        {depressiveContentDetected && (
          <Alert className="m-4 border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
            <div className="flex items-center">
              <div className="mr-3">
                <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <div>
                <AlertTitle className="text-red-800 dark:text-red-400 font-medium">Depression Warning</AlertTitle>
                <AlertDescription className="text-red-700 dark:text-red-300">
                  Potential signs of depression detected in conversation. Consider reaching out directly.
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}
        
        <div className="p-4 space-y-4">
          {messages.length === 0 && !simulationActive && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No active conversations. Start the simulation to see real-time sentiment analysis.</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.depressionIndicator ? 'animate-pulse' : ''}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                  message.isUser
                    ? "bg-indigo-100 dark:bg-indigo-900 ml-auto"
                    : "bg-white dark:bg-gray-800"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <Badge 
                    className={`${
                      message.sentiment === "positive" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                      message.sentiment === "negative" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" :
                      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    } flex items-center gap-1 font-normal`}
                  >
                    {getSentimentIcon(message.sentiment)}
                    {message.sentiment.charAt(0).toUpperCase() + message.sentiment.slice(1)}
                  </Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {message.timestamp.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <p className={message.depressionIndicator ? "text-red-700 dark:text-red-400 font-medium" : ""}>{message.content}</p>
                {message.depressionIndicator && (
                  <div className="mt-1 flex items-center">
                    <AlertTriangle className="h-3 w-3 text-red-500 mr-1" />
                    <span className="text-xs text-red-500">Depression indicator</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationSimulator;
