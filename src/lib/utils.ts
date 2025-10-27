import { clsx, type ClassValue } from "clsx";
import { ExternalToast } from "sonner";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const idsSchema = z.array(z.string());

export type LinkType = {
  link: string;
  label: string;
  classname?: string;
  size?: "sm" | "lg";
  variant?: "outline" | "ghost" | "link" | "destructive" | "secondary";
};

export type ChartData = {
  accuracy: number;
  day: string;
};

export type WeaponStat = {
  weapon_name: string;
  challenge_played: number;
  image_path: {
    badge: string;
    image: string;
  };
  averge: {
    accuracy: number;
    damage: number;
    kills: number;
    shots_hit: number;
  };
};

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
  } satisfies ExternalToast;

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
