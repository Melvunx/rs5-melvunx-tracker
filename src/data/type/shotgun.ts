import { ImagePath, Weapon } from "../weapon";

const shotgunType = "SHOTGUN";

const mastiff = new Weapon(
  "Mastiff",
  shotgunType,
  ImagePath("mastiff", shotgunType),
  ImagePath("mastiff")
);

const peacekeeper = new Weapon(
  "Peacekeeper",
  shotgunType,
  ImagePath("peacekeeper", shotgunType),
  ImagePath("peacekeeper")
);

const mozambique = new Weapon(
  "Mozambique",
  shotgunType,
  ImagePath("mozambique", shotgunType),
  ImagePath("mozambique")
);

const eva8 = new Weapon(
  "EVA-8",
  shotgunType,
  ImagePath("eva8", shotgunType),
  ImagePath("eva8")
);

export const shotguns = [mastiff, peacekeeper, mozambique, eva8];
