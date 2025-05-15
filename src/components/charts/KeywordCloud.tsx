
import { useEffect, useRef, useState } from "react";

interface KeywordCloudProps {
  timeRange: "day" | "week" | "month";
}

interface KeywordData {
  text: string;
  value: number;
  color: string;
}

const KeywordCloud = ({ timeRange }: KeywordCloudProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  
  useEffect(() => {
    // Generate keywords based on time range
    const baseKeywords = [
      { text: "Anxiety", value: 300, color: "#9333ea" },
      { text: "Depression", value: 280, color: "#3b82f6" },
      { text: "Stress", value: 250, color: "#ef4444" },
      { text: "School", value: 220, color: "#f97316" },
      { text: "Work", value: 200, color: "#22c55e" },
      { text: "Money", value: 190, color: "#eab308" },
      { text: "Family", value: 180, color: "#3b82f6" },
      { text: "COVID", value: 170, color: "#ef4444" },
      { text: "Unemployment", value: 160, color: "#f97316" },
      { text: "Sleep", value: 150, color: "#22c55e" },
      { text: "Therapy", value: 140, color: "#9333ea" },
      { text: "Relationships", value: 130, color: "#3b82f6" },
      { text: "Support", value: 120, color: "#f97316" },
      { text: "Self-care", value: 110, color: "#22c55e" },
      { text: "Overwhelm", value: 100, color: "#ef4444" },
      { text: "Hope", value: 90, color: "#eab308" },
      { text: "Medication", value: 80, color: "#9333ea" },
      { text: "Coping", value: 70, color: "#3b82f6" },
      { text: "Isolation", value: 60, color: "#f97316" },
    ];
    
    // Adjust values based on time range
    const multiplier = timeRange === "day" ? 0.7 : timeRange === "week" ? 1 : 1.5;
    const adjustedKeywords = baseKeywords.map(k => ({
      ...k,
      value: Math.floor(k.value * multiplier * (0.8 + Math.random() * 0.4))
    }));
    
    setKeywords(adjustedKeywords);
  }, [timeRange]);

  // Simulate a word cloud with CSS since we can't use D3 directly
  return (
    <div ref={containerRef} className="h-full w-full flex items-center justify-center overflow-hidden relative">
      <div className="flex flex-wrap justify-center items-center gap-2 p-4">
        {keywords.map((keyword, index) => (
          <div 
            key={index}
            style={{
              fontSize: `${Math.max(12, keyword.value / 20)}px`,
              color: keyword.color,
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
              opacity: 0.7 + (keyword.value / 1000),
            }}
            className="px-2 py-1 transition-transform duration-300 hover:scale-110 cursor-pointer"
          >
            {keyword.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordCloud;
