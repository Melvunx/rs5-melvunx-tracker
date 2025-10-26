import { clsx, type ClassValue } from "clsx";
import { CSSProperties } from "react";
import { ExternalToast } from "sonner";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { buttonVariants } from "../components/ui/button";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const idsSchema = z.array(z.string());

export function toastParams(field: {
  success: boolean;
  message?: string;
}): ExternalToast {
  const { success, message } = field;

  const globalParams = {
    action: {
      label: "Fermer",
      onClick() {
        console.log("Fermé !");
      },
    },
    actionButtonStyle: buttonVariants({
      variant: "ghost",
    }) as CSSProperties,
  };

  if (success) {
    return {
      description: message || "Tout s'est bien passé ! 🏆",
      ...globalParams,
    };
  }
  return {
    description: message || "❌ Une erreur est survenue !",
    ...globalParams,
  };
}
