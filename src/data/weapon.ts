import {
  getMaxWeaponAccuracy,
  getMaxWeaponShotsHit,
  getWeaponStats,
} from "@/app/actions/weapon";
import { WEAPON_TYPE, WeaponType } from "../schema/weapon";
import { assaultRifles } from "./type/assault_rifle";
import { smgs } from "./type/smg";

export function ImagePath(weaponName: string, type?: WeaponType) {
  if (type) return `./${type.toLowerCase()}/${weaponName}.png`;
  else return `./badges/${weaponName}.webp`;
}

export class Weapon {
  private name: string;
  private type: WeaponType;
  private image: string;
  private badge: string;

  constructor(name: string, type: WeaponType, image: string, badge: string) {
    this.name = name;
    this.type = type;
    this.image = image;
    this.badge = badge;
  }

  getName() {
    return this.name;
  }

  getType() {
    return WEAPON_TYPE[this.type];
  }

  getBadge() {
    return this.badge;
  }
  getImage() {
    return this.image;
  }

  async getGlobalStats() {
    const stats = await getWeaponStats(this.getName());
    return stats;
  }

  async getMaxAccuracy() {
    const accuracy = await getMaxWeaponAccuracy(this.getName());
    return accuracy;
  }

  async getMaxShotsHit() {
    const shotsHit = await getMaxWeaponShotsHit(this.getName());
    return shotsHit;
  }
}

const weapons = smgs.concat(assaultRifles);

export default weapons;
