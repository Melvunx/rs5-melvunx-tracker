import { ImagePath, Weapon } from "../weapon";
const pistolType = "PISTOL";

const wingman = new Weapon(
  "Wingman",
  pistolType,
  ImagePath("wingman", pistolType),
  ImagePath("wingman")
);

const re45 = new Weapon(
  "RE-45",
  pistolType,
  ImagePath("re45", pistolType),
  ImagePath("re45")
);

const p2020 = new Weapon(
  "P2020",
  pistolType,
  ImagePath("p2020", pistolType),
  ImagePath("p2020")
);

export const pistols = [wingman, re45, p2020];
