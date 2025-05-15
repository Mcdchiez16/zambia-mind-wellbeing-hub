
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

interface EmotionDistributionProps {
  timeRange: "day" | "week" | "month";
}

const EmotionDistribution = ({ timeRange }: EmotionDistributionProps) => {
  // Generate demo data based on time range
  const generateEmotionData = () => {
    // Base distribution that changes slightly based on time range
    const multiplier = timeRange === "day" ? 1 : timeRange === "week" ? 1.2 : 1.5;
    
    return [
      { name: "Anxiety", value: Math.floor(30 * multiplier), color: "#9333ea" },
      { name: "Sadness", value: Math.floor(25 * multiplier), color: "#3b82f6" },
      { name: "Anger", value: Math.floor(15 * multiplier), color: "#ef4444" },
      { name: "Fear", value: Math.floor(12 * multiplier), color: "#f97316" },
      { name: "Joy", value: Math.floor(10 * multiplier), color: "#22c55e" },
      { name: "Hope", value: Math.floor(8 * multiplier), color: "#eab308" },
    ];
  };

  const data = generateEmotionData();
  
  const emotionConfig = Object.fromEntries(
    data.map(item => [
      item.name.toLowerCase(),
      {
        label: item.name,
        color: item.color,
      },
    ])
  );

  return (
    <ChartContainer config={emotionConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default EmotionDistribution;
