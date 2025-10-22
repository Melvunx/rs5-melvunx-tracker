import { ImagePath, Weapon } from "../weapon";

const sniperType = "SNIPER";

const sentinel = new Weapon(
  "Sentinel",
  sniperType,
  ImagePath("sentinel", sniperType),
  ImagePath("sentinel")
);

const longbow = new Weapon(
  "Longbow",
  sniperType,
  ImagePath("longbow", sniperType),
  ImagePath("longbow")
);

const chargeRifle = new Weapon(
  "Charge Rifle",
  sniperType,
  ImagePath("charge-rifle", sniperType),
  ImagePath("charge-rifle")
);

const kraber = new Weapon(
  "Kraber",
  sniperType,
  ImagePath("kraber", sniperType),
  ImagePath("kraber")
);

export const snipers = [sentinel, longbow, chargeRifle, kraber];
