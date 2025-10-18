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
    console.error("❌ Erreur:", error);
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
