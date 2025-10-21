export const WEAPON_TYPE = {
  ASSAULT_RIFLE: "Fusils d'assaut",
  SMG: "Mitraillettes",
  LMG: "Mitrailleuse",
  MARKSMAN: "Armes à longue portée",
  SNIPER: "Fusils de précision",
  PISTOL: "Pistolets",
  SHOTGUN: "Fusils à pompe",
} as const;

export type WeaponType =
  | "ASSAULT_RIFLE"
  | "SMG"
  | "LMG"
  | "MARKSMAN"
  | "SNIPER"
  | "PISTOL"
  | "SHOTGUN";

export type Weapon = {
  name: string;
  type: WeaponType;
  image: string;
};
