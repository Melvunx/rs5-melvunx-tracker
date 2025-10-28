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

export const filteredDataDate = (data: ChartData[], timeRange: string) => {
  return data.filter((item) => {
    const date = new Date(item.day);

    const referenceDate = new Date(); // Current date
    console.log(`Filtered date data: ${JSON.stringify(data[1])}`);

    switch (timeRange) {
      case "7d":
        referenceDate.setDate(referenceDate.getDate() - 7);
        break;
      case "30d":
        referenceDate.setDate(referenceDate.getDate() - 30);
        break;
      case "90d":
        referenceDate.setDate(referenceDate.getDate() - 90);
        break;
      default:
        break;
    }
    return date >= referenceDate;
  });
};

export const filteredWeapons = (
  challenges: Challenge[],
  weaponName: string,
  timeRange?: string
) => {
  const data = challenges
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
        day: c.createdAt.toISOString().split("T")[0],
      };
    });
  console.log(`Filtered weapon data: ${JSON.stringify(data[0])}`);

  if (timeRange) return filteredDataDate(data, timeRange);
  else return data;
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

export function formatedDate(date: Date) {
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
