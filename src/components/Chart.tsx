"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartData } from "../lib/utils";
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
};

const chartConfig = {
  accuracy: {
    label: "Précision",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function Chart({ data, isChanges }: ChartProps) {
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
        data={data}
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
          tickFormatter={(value) => value.slice(0, 7)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
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
