"use server";

import { importChallenge } from "./import-challenge";

export async function UploadChallengeFile(data: FormData) {
  const file = data.get("file") as File;

  if (!file) {
    return {
      success: false,
      error: "Aucun fichier fourni",
    };
  }

  const text = await file.text();

  await importChallenge(text);

  return {
    success: true,
    message: "Fichier téléchargé avec succès",
  };
}
