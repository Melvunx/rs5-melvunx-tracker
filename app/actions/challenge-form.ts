"use server";

export async function UploadChallengeFile(data: FormData) {
  const file = data.get("file");

  if (!file) {
    return {
      success: false,
      error: "Aucun fichier fourni",
    };
  }

  const text = await file.toString();
  console.log(text);

  return {
    success: true,
    message: "Fichier téléchargé avec succès",
  };
}
