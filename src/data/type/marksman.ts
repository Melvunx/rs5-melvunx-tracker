import { ImagePath, Weapon } from "../weapon";

const marksmanType = "MARKSMAN";

const G7Scout = new Weapon(
  "G7 Scout",
  marksmanType,
  ImagePath("G7", marksmanType),
  ImagePath("G7")
);

const tripleTake = new Weapon(
  "Triple Take",
  marksmanType,
  ImagePath("triple-take", marksmanType),
  ImagePath("triple-take")
);

export const markmans = [G7Scout, tripleTake];