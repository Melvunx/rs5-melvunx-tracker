import { ImagePath, Weapon } from "../weapon";
const smgType = "SMG";

const r99 = new Weapon(
  "R-99",
  smgType,
  ImagePath("r99", smgType),
  ImagePath("r99")
);

const alternator = new Weapon(
  "Alternator",
  smgType,
  ImagePath("alternator", smgType),
  ImagePath("alternator")
);

const volt = new Weapon(
  "Volt",
  smgType,
  ImagePath("volt", smgType),
  ImagePath("volt")
);

const prowler = new Weapon(
  "Prowler",
  smgType,
  ImagePath("prowler", smgType),
  ImagePath("prowler")
);

export const smgs = [r99, alternator, volt, prowler];
