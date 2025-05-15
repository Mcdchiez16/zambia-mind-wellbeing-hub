
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { HeartPulse } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WellnessResults from "@/components/WellnessResults";

const wellnessFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  age: z.string().regex(/^\d+$/, "Age must be a number").optional(),
  feelings: z.string().min(5, "Please share a bit more about how you're feeling"),
  sleepQuality: z.string().min(1, "Please rate your sleep quality"),
  stressLevel: z.string().min(1, "Please rate your stress level"),
});

type WellnessFormValues = z.infer<typeof wellnessFormSchema>;

const Wellness = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [wellnessScore, setWellnessScore] = useState(0);
  const [wellnessTips, setWellnessTips] = useState<string[]>([]);

  const form = useForm<WellnessFormValues>({
    resolver: zodResolver(wellnessFormSchema),
    defaultValues: {
      name: "",
      age: "",
      feelings: "",
      sleepQuality: "",
      stressLevel: "",
    },
  });

  function onSubmit(data: WellnessFormValues) {
    // Calculate a simple wellness score based on form inputs
    const getKeywordScore = (text: string) => {
      const negativeKeywords = ["stressed", "anxious", "sad", "depressed", "worried", "tired", "exhausted"];
      const positiveKeywords = ["happy", "calm", "relaxed", "peaceful", "joyful", "excited", "grateful"];
      
      let score = 50; // Start at neutral
      
      negativeKeywords.forEach(keyword => {
        if (text.toLowerCase().includes(keyword)) score -= 5;
      });
      
      positiveKeywords.forEach(keyword => {
        if (text.toLowerCase().includes(keyword)) score += 5;
      });
      
      // Cap the score between 0 and 100
      return Math.min(100, Math.max(0, score));
    };
    
    const feelingsScore = getKeywordScore(data.feelings);
    const sleepScore = parseInt(data.sleepQuality) * 10;
    const stressScore = 100 - (parseInt(data.stressLevel) * 10);
    
    // Average the scores
    const calculatedScore = Math.round((feelingsScore + sleepScore + stressScore) / 3);
    setWellnessScore(calculatedScore);
    
    // Generate wellness tips based on the score and inputs
    const tips = [];
    
    if (calculatedScore < 40) {
      tips.push("Consider talking to a mental health professional about how you're feeling.");
      tips.push("Take small breaks throughout your day to practice deep breathing.");
      tips.push("Connect with a trusted friend or family member for support.");
    } else if (calculatedScore < 70) {
      tips.push("Try to establish a consistent sleep schedule, aiming for 7-8 hours each night.");
      tips.push("Take a 10-minute walk outdoors to boost your mood.");
      tips.push("Practice mindfulness through a guided meditation.");
    } else {
      tips.push("Continue with your positive habits that support your wellbeing.");
      tips.push("Share your coping strategies with others who might benefit.");
      tips.push("Set aside time each day to engage in activities you enjoy.");
    }
    
    if (data.feelings.toLowerCase().includes("sleep") || parseInt(data.sleepQuality) < 5) {
      tips.push("Avoid screens an hour before bedtime to improve sleep quality.");
    }
    
    if (data.feelings.toLowerCase().includes("stress") || parseInt(data.stressLevel) > 5) {
      tips.push("Practice progressive muscle relaxation when feeling overwhelmed.");
    }
    
    setWellnessTips(tips);
    setSubmitted(true);
    
    toast({
      title: "Wellness check submitted",
      description: "Thank you for sharing how you're feeling today.",
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <HeartPulse className="h-8 w-8 text-purple-500" />
          <h1 className="text-3xl font-bold text-gray-800">Wellness Check-In</h1>
        </div>
        
        <p className="text-gray-600 mb-8">
          Take a moment to check in with yourself. This quick assessment will help gauge your current mental wellbeing and provide personalized tips based on how you're feeling.
        </p>

        {!submitted ? (
          <Card>
            <CardHeader>
              <CardTitle>How are you feeling today?</CardTitle>
              <CardDescription>
                Your responses are kept private and not stored.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your age" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="feelings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How are you feeling right now?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share a few words about your current emotions, thoughts, or concerns..." 
                            className="min-h-32" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="sleepQuality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How would you rate your sleep quality lately? (1-10)</FormLabel>
                          <FormControl>
                            <Input 
                              type="range" 
                              min="1" 
                              max="10" 
                              step="1" 
                              className="w-full" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                document.getElementById("sleepValue")!.innerText = e.target.value;
                              }}
                            />
                          </FormControl>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Poor (1)</span>
                            <span id="sleepValue">5</span>
                            <span>Excellent (10)</span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stressLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How would you rate your stress level? (1-10)</FormLabel>
                          <FormControl>
                            <Input 
                              type="range" 
                              min="1" 
                              max="10" 
                              step="1" 
                              className="w-full" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                document.getElementById("stressValue")!.innerText = e.target.value;
                              }}
                            />
                          </FormControl>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Low (1)</span>
                            <span id="stressValue">5</span>
                            <span>High (10)</span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <WellnessResults 
            score={wellnessScore} 
            tips={wellnessTips} 
            onReset={() => setSubmitted(false)} 
          />
        )}

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3">Need immediate support?</h2>
          <p className="mb-4">
            If you're experiencing a mental health crisis or need to talk to someone right now, help is available:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex justify-between">
              <span className="font-medium">Zambia Mental Health Helpline:</span>
              <span className="font-bold">116</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Crisis Text Line:</span>
              <span className="font-bold">Text "HELP" to 5011</span>
            </li>
          </ul>
          <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
            View More Resources
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wellness;
