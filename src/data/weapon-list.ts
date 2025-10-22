import { assaultRifles } from "./type/assault_rifle";
import { lmgs } from "./type/lmg";
import { markmans } from "./type/marksman";
import { pistols } from "./type/pistol";
import { shotguns } from "./type/shotgun";
import { smgs } from "./type/smg";
import { snipers } from "./type/sniper";

const weapons = smgs.concat(
  assaultRifles,
  lmgs,
  shotguns,
  pistols,
  markmans,
  snipers
);

export default weapons;
