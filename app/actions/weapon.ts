"use server";

import prisma from "@/src/lib/prisma";

export async function getWeaponStats(weaponName: string) {
  try {
    const weapon = await prisma.challenge.findFirst({
      where: {
        weapon: weaponName,
      },
    });

    if (!weapon) {
      console.log(
        `❌ Les stats de l'arme "${weaponName}" n'a pas été trouvée !`
      );

      return {
        challenge_played: 0,
        averge: {
          accuracy: 0.0,
          damage: 0,
          kills: 0,
          shots_hit: 0,
        },
      };
    }

    const stats = await prisma.challenge.aggregate({
      where: {
        weapon: weaponName,
      },
      _count: {
        weapon: true,
      },
      _avg: {
        accuracy: true,
        damage: true,
        kills: true,
        shotsHit: true,
      },
    });

    return {
      challenge_played: stats._count.weapon ? stats._count.weapon : 0,
      averge: {
        accuracy: stats._avg.accuracy ? stats._avg.accuracy : 0.0,
        damage: stats._avg.damage ? stats._avg.damage : 0,
        kills: stats._avg.kills ? stats._avg.kills : 0,
        shots_hit: stats._avg.shotsHit ? stats._avg.shotsHit : 0,
      },
    };
  } catch (error) {
    console.error("❌ Erreur:", error);
    return {
      challenge_played: 0,
      averge: {
        accuracy: 0.0,
        damage: 0,
        kills: 0,
        shots_hit: 0,
      },
    };
  }
}

export async function getMaxWeaponAccuracy(weaponName: string) {
  try {
    const weapon = await prisma.challenge.findFirst({
      where: {
        weapon: weaponName,
      },
    });

    if (!weapon) {
      console.log(
        `❌ Les stats de l'arme "${weaponName}" n'a pas été trouvée !`
      );

      return {
        accuracy: 0.0,
      };
    }

    const stats = await prisma.challenge.aggregate({
      where: {
        weapon: weaponName,
      },
      _max: {
        accuracy: true,
      },
    });

    return {
      accuracy: stats._max.accuracy ? stats._max.accuracy : 0.0,
    };
  } catch (error) {
    console.error("❌ Erreur:", error);

    return {
      accuracy: 0,
    };
  }
}

export async function getMaxWeaponShotsHit(weaponName: string) {
  try {
    const weapon = await prisma.challenge.findFirst({
      where: {
        weapon: weaponName,
      },
    });

    if (!weapon) {
      console.log(
        `❌ Les stats de l'arme "${weaponName}" n'a pas été trouvée !`
      );

      return {
        shots_hit: 0,
      };
    }

    const stats = await prisma.challenge.aggregate({
      where: {
        weapon: weaponName,
      },
      _max: {
        shotsHit: true,
      },
    });

    return {
      shots_hit: stats._max.shotsHit ? stats._max.shotsHit : 0,
    };
  } catch (error) {
    console.error("❌ Erreur:", error);

    return {
      shots_hit: 0,
    };
  }
}
