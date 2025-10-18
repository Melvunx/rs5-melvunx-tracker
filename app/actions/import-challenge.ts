"use server";

import { readFile } from "fs/promises";
import { CreateChallenges } from "./challenge";
const { VERIF_LINE } = process.env;

if (!VERIF_LINE) {
  throw new Error("La variable d'environnement VERIF_LINE est introuvable.");
}

export async function importChallenge(fileName: string) {
  try {
    console.log("📥 Début de l'import des données...\n");

    // Lecture du fichier
    const fileContent = await readFile(`../../${fileName}`, "utf-8");
    const lines = fileContent.split("\n").filter((line) => line.trim());

    const verifLine = lines[0];
    if (verifLine !== VERIF_LINE) {
      console.error("❌ Erreur: Le fichier importé n'est pas valide.");
      return;
    }

    const dataLines = lines.slice(3);

    const challenges = dataLines.map((line) => {
      const [
        challengeName,
        shotsHit,
        kills,
        weapon,
        accuracy,
        damage,
        criticalShots,
        totalShots,
        roundtime,
      ] = line.split(",").map((col) => col.trim());

      return {
        challengeName,
        shotsHit: parseInt(shotsHit),
        kills: parseInt(kills),
        weapon,
        accuracy: parseFloat(accuracy.replace("%", "")),
        damage: parseInt(damage),
        criticalShots: parseInt(criticalShots),
        totalShots: parseInt(totalShots),
        roundtime: parseFloat(roundtime),
      };
    });

    await CreateChallenges(challenges);
  } catch (error) {
    console.error("❌ Erreur:", error);
  }
}
