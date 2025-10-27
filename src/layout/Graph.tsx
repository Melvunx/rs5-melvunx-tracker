"use client";

import { useEffect, useState, useTransition } from "react";
import { Chart } from "../components/Chart";
import { Weapon } from "../data/weapon";
import weapons from "../data/weapon-list";
import { ChartData } from "../lib/utils";

export function Graph() {
  const [challenges, setChallenges] = useState<ChartData[]>([]);
  const [apexWeapon, setApexWeapon] = useState<Weapon | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const getChallengesData = () => {
      startTransition(() => {
        // Reset state
        setApexWeapon(null);
        setChallenges([]);

        const r99Data = weapons.find((weapon) => weapon.getName() === "R-99");

        if (r99Data) {
          setApexWeapon(r99Data);
          r99Data.getWeaponChallenge().then((challenges) => {
            const sortedChallenges = challenges.filter((c) => {
              if (c.challengeName !== "STRAFING DUMMY") return false; // Filter only STRAFING DUMMY challenges
              return true;
            });

            const chartChallenges = sortedChallenges.map((challenge) => {
              return {
                accuracy: challenge.accuracy,
                day: new Date(
                  challenge.createdAt.getFullYear(),
                  challenge.createdAt.getMonth(),
                  challenge.createdAt.getDate()
                ).toLocaleString("fr-FR", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }),
              } satisfies ChartData;
            });

            setChallenges(chartChallenges);
          });
        }
      });
    };

    getChallengesData();
  }, []);

  return <Chart data={challenges} weapon={apexWeapon} pending={isPending} />;
}
