"use client";

import { useEffect } from "react";
import { AreaChart } from "recharts";
import weapons from "../data/weapon-list";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChartConfig, ChartContainer } from "./ui/chart";

const chartConfig = {
  accuracy: {
    label: "Précision",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function Chart() {
  useEffect(() => {
    const weaponData = weapons
      .filter((weapon) => weapon.getName() === "R-99")
      .map(async (r99) => {
        const challenges = await r99.getWeaponChallenge();
        return challenges;
      });
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test pour la précision</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={}></AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
