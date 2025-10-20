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

export async function getChallenges() {
  try {
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

    return {
      averge: {
        accuracy: stats._avg.accuracy === null ? 0.0 : stats._avg.accuracy,
        damage: stats._avg.damage === null ? 0 : stats._avg.damage,
        kills: stats._avg.kills === null ? 0 : stats._avg.kills,
      },
      max_accuracy: stats._max.accuracy === null ? 0.0 : stats._max.accuracy,
      min_accuracy: stats._min.accuracy === null ? 0.0 : stats._min.accuracy,
    };
  } catch (error) {
    console.error("❌ Erreur : ", error);

    return {
      averge: {
        accuracy: 0.0,
        damage: 0,
        kills: 0,
      },
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
