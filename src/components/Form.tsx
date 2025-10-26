"use client";

import { Upload } from "lucide-react";
import { RefObject } from "react";
import { Submit } from "./Submit";

type FormProps = {
  action: (formData: FormData) => Promise<void>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  file: File | null;
};

export function Form({
  action: onHandleFormAction,
  onChange: handleFileChange,
  inputRef: ref,
  file,
}: FormProps) {
  return (
    <form
      action={(formData) => onHandleFormAction(formData)}
      className="w-full flex items-center"
    >
      <div>
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center w-full px-6 py-4"
        >
          <input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            ref={ref}
            className="hidden"
            id="file-upload"
          />
          <Upload />
          <span>{file ? file.name : "Cliquer pour choisir un fichier"}</span>
        </label>
      </div>
      <Submit />
    </form>
  );
}
