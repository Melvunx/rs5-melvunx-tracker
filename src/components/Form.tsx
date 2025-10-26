"use client";

import { Upload } from "lucide-react";
import { RefObject } from "react";
import { Submit } from "./Submit";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type FormProps = {
  action: (formData: FormData) => Promise<void>;
  onReset: () => void;
  pending: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  file: File | null;
};

export function Form({
  action: onHandleFormAction,
  onReset,
  pending,
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

          {pending ? <Spinner /> : <Upload />}
          <span
            className={pending ? "text-amber-700 italic" : "text-amber-400"}
          >
            {file ? file.name : "Cliquer pour choisir un fichier"}
          </span>
        </label>
      </div>
      <Submit emptyInput={file ? false : true} />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button" variant="ghost" onClick={onReset}>
            X
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Reset</span>
        </TooltipContent>
      </Tooltip>
    </form>
  );
}
