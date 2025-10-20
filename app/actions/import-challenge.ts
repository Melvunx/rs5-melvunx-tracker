"use server";

const { VERIF_LINE } = process.env;

const verifyChallengeLines = (lines: string[]) => {
  let successCount = 0;
  let errorCount = 0;
  const records = [];
  const errorDetails = [];

  for (let i = 0; i < lines.length; i++) {
    try {
      const line = lines[i];
      const columns = line.split(",").map((col) => col.trim());

      //Vérification du nombre des colonnes
      if (columns.length < 9) {
        errorCount++;
        errorDetails.push(`⚠️ Ligne ${i + 2}: format invalide`);
        continue;
      }

      // Initialisation des données
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
      ] = columns;

      if (!challengeName || !weapon) {
        errorCount++;
        errorDetails.push(`⚠️ Ligne ${i + 2}: données manquantes`);
        continue;
      }

      const accuracyValue = parseFloat(accuracy.replace("%", ""));

      if (isNaN(accuracyValue)) {
        errorCount++;
        errorDetails.push(`⚠️ Ligne ${i + 2}: données manquantes`);
        continue;
      }

      records.push({
        challengeName,
        shotsHit: parseInt(shotsHit),
        kills: parseInt(kills),
        weapon,
        accuracy: accuracyValue,
        damage: parseInt(damage),
        criticalShots: parseInt(criticalShots),
        totalShots: parseInt(totalShots),
        roundtime: parseInt(roundtime),
      });

      successCount++;
    } catch (error) {
      errorCount++;
      errorDetails.push(
        `Ligne ${i + 2}: ${
          error instanceof Error
            ? error.message
            : "❌ Une erreur est survenue !"
        }`
      );
    }
  }

  if (errorCount === 0 || errorDetails.length === 0)
    console.log("✔️ Aucune erreur n'a été trouver !");

  return {
    records,
    successCount,
    errorCount,
    errorDetails,
  };
};

export async function importChallenge(text: string) {
  try {
    console.log("📥 Début de l'import des données...\n");

    // Vérification de la variable d'environnement
    if (!VERIF_LINE) {
      const message =
        "❌ La variable d'environnement VERIF_LINE est introuvable";

      console.error(message);

      return {
        success: false,
        imported: 0,
        error: message,
        errors: 1,
        errorDetails: [message],
      };
    }
    // Lecture du fichier
    const lines = text.split("\n").filter((line) => line.trim());

    const header = lines[0];

    const types = lines[1].split(",").filter((type) => type.trim());

    //Vérification de la header et des types de données
    if (!header.includes(VERIF_LINE) || types.length !== 9) {
      const message = "❌ Erreur: Le fichier importé n'est pas valide";
      console.error(message);

      return {
        success: false,
        imported: 0,
        error: message,
        errors: 1,
        errorDetails: [message],
      };
    }

    const dataLines = lines.slice(2); // Récupération des données

    //Vérification des données
    const { records, successCount, errorCount, errorDetails } =
      verifyChallengeLines(dataLines);

    if (records.length === 0) {
      const message = "❌ Aucun enregistrement valide à importer";
      console.log(message);

      return {
        success: false,
        imported: 0,
        error: message,
        errors: errorDetails.length,
        errorDetails,
      };
    }

    // await CreateChallenges(records);

    return {
      success: true,
      imported: successCount,
      errors: errorCount,
      error: errorDetails[0],
      errorDetails: errorDetails.slice(0, 5),
    };
  } catch (error) {
    console.error("❌ Erreur lors de l'upload : ", error);

    return {
      success: false,
      imported: 0,
      errors: 1,
      error: "❌ Une erreur serveur est survenue !",
      errorDetails: [
        `${
          error instanceof Error
            ? error.message
            : "❌ Une erreur serveur est survenue !"
        }`,
      ],
    };
  }
}
