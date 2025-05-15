
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface SentimentChartProps {
  timeRange: "day" | "week" | "month";
}

const SentimentChart = ({ timeRange }: SentimentChartProps) => {
  // Generate demo data based on selected time range
  const generateDemoData = () => {
    let data = [];
    let pointCount = timeRange === "day" ? 24 : timeRange === "week" ? 7 : 30;
    
    for (let i = 0; i < pointCount; i++) {
      const positive = 30 + Math.floor(Math.random() * 25);
      const negative = 15 + Math.floor(Math.random() * 25);
      const neutral = 100 - positive - negative;
      
      data.push({
        name: timeRange === "day" 
          ? `${i}:00` 
          : timeRange === "week" 
            ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i % 7] 
            : `Day ${i+1}`,
        positive,
        negative,
        neutral
      });
    }
    
    return data;
  };

  const data = generateDemoData();

  const sentimentConfig = {
    positive: {
      label: "Positive",
      theme: {
        light: "#4ade80",
        dark: "#4ade80",
      },
    },
    negative: {
      label: "Negative",
      theme: {
        light: "#f87171",
        dark: "#f87171",
      },
    },
    neutral: {
      label: "Neutral",
      theme: {
        light: "#93c5fd",
        dark: "#93c5fd",
      },
    },
  };

  return (
    <ChartContainer config={sentimentConfig} className="h-full w-full">
      <ChartTooltip content={<ChartTooltipContent />} />
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <XAxis 
            dataKey="name" 
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Area
            type="monotone"
            dataKey="positive"
            stackId="1"
            stroke="var(--color-positive)"
            fill="var(--color-positive)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="neutral"
            stackId="1"
            stroke="var(--color-neutral)"
            fill="var(--color-neutral)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="negative"
            stackId="1"
            stroke="var(--color-negative)"
            fill="var(--color-negative)"
            fillOpacity={0.6}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default SentimentChart;
