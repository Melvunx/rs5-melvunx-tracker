"use server";

export async function UploadChallengeFile(data: FormData) {
  try {
    const file = data.get("file") as File;

    if (!file) {
      return {
        success: false,
        error: "Aucun fichier fourni",
      };
    }

    const text = await file.text();

    // await importChallenge(text);

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    console.error("❌ Erreur:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "❌ Une erreur est survenue !",
    };
  }
}
