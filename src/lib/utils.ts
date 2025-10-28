import { Challenge } from "@/app/generated/prisma";
import { clsx, type ClassValue } from "clsx";
import { ExternalToast } from "sonner";
import { twMerge } from "tailwind-merge";
import z from "zod";
import weapons from "../data/weapon-list";

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

export const filteredWeapons = (
  challenges: Challenge[],
  weaponName: string
) => {
  return challenges
    .filter(
      (challenge) =>
        (challenge.weapon === weaponName ||
          weaponName === "Toutes les armes") &&
        challenge.challengeName === "STRAFING DUMMY" &&
        challenge.accuracy !== 0
    )
    .map((c) => {
      return {
        accuracy: c.accuracy,
        day: new Date(c.createdAt.getDate()).toLocaleString("fr-FR", {
          month: "short",
          day: "2-digit",
        }),
      };
    });
};

export function getAllWeaponName() {
  return weapons.map((weapon) => {
    return {
      name: weapon.getName(),
      path: {
        badge: weapon.getBadge(),
        image: weapon.getImage(),
      },
    };
  });
}
