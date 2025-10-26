"use server";

import prisma from "@/src/lib/prisma";
import { idsSchema } from "@/src/lib/utils";
import { CreateChallenge } from "@/src/schema/challenge";

export async function CreateChallenges(newChallenges: CreateChallenge[]) {
  try {
    const challenges = await prisma.challenge.createMany({
      data: newChallenges,
      skipDuplicates: false,
    });

    console.log(
      `✨ ${challenges.count} enregistrements importés avec succès !`
    );
  } catch (error) {
    console.error("❌ Erreur:", error);
  }
}

export async function getChallenges(weaponName?: string) {
  try {
    if (weaponName) {
      const challenges = await prisma.challenge.findMany({
        where: { weapon: weaponName },
      });

      return challenges;
    }

    const challenges = await prisma.challenge.findMany();
    return challenges;
  } catch (error) {
    console.error("❌ Erreur : ", error);
    return [];
  }
}

export async function getChallengesStats(getAll?: boolean) {
  try {
    let stats;

    // Si getAll est défini et est true on récupere les stats global
    if (getAll) {
      stats = await prisma.challenge.aggregate({
        _avg: {
          accuracy: true,
          damage: true,
          kills: true,
        },
        _max: {
          accuracy: true,
        },
        _min: {
          accuracy: true,
        },
      });
    } else {
      stats = await prisma.challenge.aggregate({
        _avg: {
          accuracy: true,
          damage: true,
          kills: true,
        },
        _max: {
          accuracy: true,
        },
        _min: {
          accuracy: true,
        },
        take: 10,
      });
    }

    const totalGamePlayed = await prisma.challenge.count();

    return {
      averge: {
        accuracy: stats._avg.accuracy ? stats._avg.accuracy : 0.0,
        damage: stats._avg.damage ? stats._avg.damage : 0,
        kills: stats._avg.kills ? stats._avg.kills : 0,
      },
      total_game_played: totalGamePlayed,
      max_accuracy: stats._max.accuracy ? stats._max.accuracy : 0,
      min_accuracy: stats._min.accuracy ? stats._min.accuracy : 0,
    };
  } catch (error) {
    console.error("❌ Erreur : ", error);

    return {
      averge: {
        accuracy: 0.0,
        damage: 0,
        kills: 0,
      },
      total_game_played: 0,
      max_accuracy: 0.0,
      min_accuracy: 0.0,
    };
  }
}

export async function deleteChallenges(ids: string[]) {
  try {
    const challengeIds = idsSchema.safeParse(ids);

    if (!challengeIds.success) {
      console.error("❌ Erreur: IDs invalides fournis pour la suppression.");
      return;
    }

    await prisma.challenge.deleteMany({
      where: {
        id: {
          in: challengeIds.data,
        },
      },
    });
  } catch (error) {
    console.error("❌ Erreur:", error);
  }
}
