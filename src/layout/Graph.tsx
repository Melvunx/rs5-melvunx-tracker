"use client";

import { Challenge } from "@/app/generated/prisma";
import { useEffect, useState, useTransition } from "react";
import { Chart } from "../components/Chart";
import { Weapon } from "../data/weapon";
import weapons from "../data/weapon-list";

export function Graph() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [apexWeapon, setApexWeapon] = useState<Weapon | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const getChallenges = () => {
      startTransition(() => {
        // Reset state
        setApexWeapon(null);
        setChallenges([]);

        const r99Data = weapons.find((weapon) => weapon.getName() === "R-99");

        if (r99Data) {
          setApexWeapon(r99Data);
          r99Data.getWeaponChallenge().then((challenges) => {
            const sortedDate = new Set<string>();

            const sortedChallenges = challenges.filter((c) => {
              if (sortedDate.has(c.id) && c.challengeName !== "STRAFING DUMMY")
                return false;
              sortedDate.add(c.id);
              return true;
            });

            setChallenges(sortedChallenges);
          });
        }
      });
    };

    getChallenges();
  }, []);

  return <Chart data={challenges} weapon={apexWeapon} pending={isPending} />;
}
