"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartData, formatedDate } from "../lib/utils";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { Spinner } from "./ui/spinner";

type ChartProps = {
  data: ChartData[];
  isChanges: boolean;
  timeRange: string;
};

const chartConfig = {
  accuracy: {
    label: "Précision",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function Chart({ data, isChanges, timeRange }: ChartProps) {
  const formatedData = data.map((item) => {
    return {
      ...item,
      day: formatedDate(new Date(item.day)),
    };
  });

  const onTimeRangeChange = (timeRange: string) => {
    switch (timeRange) {
      case "7d":
        return 369;
      case "30d":
        return 169;
      case "90d":
        return 68;
      default:
        return 34;
    }
  };

  if (isChanges)
    return (
      <div>
        <Spinner /> Chargement du graphique
      </div>
    );

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={formatedData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={onTimeRangeChange(timeRange)}
          tickFormatter={(value) => value.slice(0, 6)}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelClassName="text-indigo-200 italic"
              indicator="line"
            />
          }
        />
        <Area
          dataKey="accuracy"
          type="natural"
          fill="var(--chart-1)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
