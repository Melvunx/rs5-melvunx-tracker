"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Weapon } from "../data/weapon";
import { ChartData } from "../lib/utils";
import { Loading } from "./Loading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

type ChartProps = {
  data: ChartData[];
  weapon: Weapon | null;
  pending: boolean;
};

const chartConfig = {
  accuracy: {
    label: "Précision",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function Chart({ data, weapon, pending }: ChartProps) {
  if (pending) return <Loading />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test pour la précision</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter className="flex w-full items-start gap-2 text-sm">
        <span>
          {weapon
            ? `Précision de l'arme ${weapon.getName()} en %`
            : "Précision de l'arme en %"}
        </span>
      </CardFooter>
    </Card>
  );
}
