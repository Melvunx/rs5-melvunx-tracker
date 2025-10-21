import { ImagePath, Weapon } from "../weapon";

const assType = "ASSAULT_RIFLE";

const r301 = new Weapon(
  "R-301",
  assType,
  ImagePath("r301", assType),
  ImagePath("r301")
);

export const assaultRifles = [r301];
