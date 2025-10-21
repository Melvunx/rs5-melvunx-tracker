"use client";

import { Button } from "@/src/components/ui/button";
import { Upload } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { getChallengesStats } from "./actions/challenge";
import { UploadChallengeFile } from "./actions/challenge-form";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Record<string, unknown> | null>(
    null
  );

  // useEffect(() => {
  //   const testAggregate = async () => {
  //     const challenge = await getChallengesStats();

  //     console.log(challenge);

  //     const tenChallenge = await getChallengesStats(true);
  //     console.log(tenChallenge);
  //   };

  //   testAggregate();
  // }, []);

  const onHandleFormAction = async (formData: FormData) => {
    if (!file) {
      setResponse({
        success: false,
        error: "Veuillez sélectionner un fichier",
      });
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      formData.append("file", file);

      const data = await UploadChallengeFile(formData);
      setResponse(data);

      if (data.success) {
        setFile(null);

        const fileInput = document.getElementById("file-upload");
        if (fileInput) fileInput.nodeValue = "";
      }
    } catch (error) {
      setResponse({
        success: false,
        error:
          error instanceof Error ? error.message : "Erreur lors de l'upload",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files;

    if (selectedFile) {
      const file = selectedFile[0];
      setFile(file);
      setResponse(null);
    }
  };

  return (
    <div>
      <form
        action={(formData) => onHandleFormAction(formData)}
        className="w-full flex items-center"
      >
        <div className="">
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center w-full px-6 py-4"
          >
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <Upload />
            <span>{file ? file.name : "Cliquer pour choisir un fichier"}</span>
          </label>
        </div>

        <Button className="cursor-pointer" variant="ghost" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}
