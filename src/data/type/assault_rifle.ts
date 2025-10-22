import { ImagePath, Weapon } from "../weapon";

const assaultType = "ASSAULT_RIFLE";

const r301 = new Weapon(
  "R-301",
  assaultType,
  ImagePath("r301", assaultType),
  ImagePath("r301")
);

const havoc = new Weapon(
  "Havoc",
  assaultType,
  ImagePath("havoc", assaultType),
  ImagePath("havoc")
);

const hemlok = new Weapon(
  "Hemlok",
  assaultType,
  ImagePath("hemlok", assaultType),
  ImagePath("hemlok")
);

const flatline = new Weapon(
  "Flatline",
  assaultType,
  ImagePath("flatline", assaultType),
  ImagePath("flatline")
);

export const assaultRifles = [r301, havoc, hemlok, flatline];
