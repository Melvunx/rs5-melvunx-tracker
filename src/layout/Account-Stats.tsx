"use client";

import { useEffect, useState, useTransition } from "react";
import { Carrousel } from "../components/Carrousel";
import weapons from "../data/weapon-list";
import { WeaponStat } from "../lib/utils";

export function AccountStats() {
  const [isPending, startTransition] = useTransition();
  const [weaponStats, setWeaponStats] = useState<WeaponStat[]>([]);

  useEffect(() => {
    startTransition(() => {
      setWeaponStats([]);

      weapons.map((weapon) => {
        weapon.getGlobalStats().then((w) => {
          setWeaponStats((prevStats) => [
            ...prevStats,
            {
              weapon_name: weapon.getName(),
              image_path: {
                badge: weapon.getBadge(),
                image: weapon.getImage(),
              },
              ...w,
            },
          ]);
        });
      });
    });
  }, []);

  return (
    <Carrousel
      stats={weaponStats.filter((stat) => stat.challenge_played !== 0)}
      pending={isPending}
    />
  );
}
