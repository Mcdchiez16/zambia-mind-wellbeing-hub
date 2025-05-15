
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";

interface WellnessResultsProps {
  score: number;
  tips: string[];
  onReset: () => void;
}

const WellnessResults = ({ score, tips, onReset }: WellnessResultsProps) => {
  const getScoreCategory = () => {
    if (score < 40) return { title: "Could use support", color: "text-red-600" };
    if (score < 70) return { title: "Managing", color: "text-yellow-600" };
    return { title: "Doing well", color: "text-green-600" };
  };

  const scoreCategory = getScoreCategory();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Wellness Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Wellness Score</span>
            <span className={`font-bold ${scoreCategory.color}`}>{scoreCategory.title}</span>
          </div>
          <Progress value={score} className="h-3" />
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Needs Support</span>
            <span>Managing</span>
            <span>Thriving</span>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-3">Personalized Wellness Tips</h3>
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li key={index} className="bg-blue-50 p-3 rounded-md flex">
                <span className="font-semibold mr-2">💡</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onReset}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Take Another Assessment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WellnessResults;
