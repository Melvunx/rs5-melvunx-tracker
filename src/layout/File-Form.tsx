"use client";

import { UploadChallengeFile } from "@/app/actions/challenge-form";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Form } from "../components/Form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { toastParams } from "../lib/utils";

export function FileForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onHandleFormAction = async (formData: FormData) => {
    if (!file) {
      toast(
        "⚠️ Attention !",
        toastParams({
          success: false,
          message: "Aucun fichier sélectionné",
        })
      );
      return;
    }

    startTransition(async () => {
      try {
        formData.append("file", file);
        const data = await UploadChallengeFile(formData);

        if (data.success) {
          setFile(null);

          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      } catch (error) {
        toast(
          "⚠️ Attention !",
          toastParams({
            success: false,
            message: "Erreur lors de l'upload",
          })
        );

        console.error("Error uploading file:", error);
      }
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) setFile(selectedFile);
  };

  const handleResetFile = () => {
    setFile(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Card className="px-4 py-6">
      <CardHeader>
        <CardTitle>Apex Legends Stats Importer !</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center max-w-3xl mx-auto py-4 bg-amber-50/20 rounded-2xl justify-center gap-4">
        <CardDescription className="italic">
          Sélectionnez votre fichier de résultats
        </CardDescription>
        <Form
          action={onHandleFormAction}
          onReset={handleResetFile}
          pending={isPending}
          onChange={handleFileChange}
          file={file}
          inputRef={fileInputRef}
        />
      </CardContent>
      <CardFooter>
        <span>Format accecptés : .txt</span>
        <span>Format attendu: CSV avec en-têtes</span>
      </CardFooter>
    </Card>
  );
}
