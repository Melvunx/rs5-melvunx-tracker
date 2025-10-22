import { ImagePath, Weapon } from "../weapon";
const lmgType = "LMG";
const spitfire = new Weapon(
  "Spitfire",
  lmgType,
  ImagePath("spitfire", lmgType),
  ImagePath("spitfire")
);

const devotion = new Weapon(
  "Devotion",
  lmgType,
  ImagePath("devotion", lmgType),
  ImagePath("devotion")
);

const Lstar = new Weapon(
  "L-Star",
  lmgType,
  ImagePath("L-star", lmgType),
  ImagePath("L-star")
);

export const lmgs = [spitfire, devotion, Lstar];
