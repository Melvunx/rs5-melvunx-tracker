"use client";

import { Challenge } from "@/app/generated/prisma";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Weapon } from "../data/weapon";
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
import { Spinner } from "./ui/spinner";

type ChartProps = {
  data: Challenge[];
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
  if (pending) {
    return (
      <Card>
        <CardContent className="flex py-10 items-center justify-center">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner /> Chargement du graphique
          </span>
        </CardContent>
      </Card>
    );
  }

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
              dataKey="id"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 1)}
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
