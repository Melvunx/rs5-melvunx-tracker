import {
  getMaxWeaponAccuracy,
  getMaxWeaponShotsHit,
  getWeaponStats,
} from "@/app/actions/weapon";
import { WEAPON_TYPE, WeaponType } from "../schema/weapon";

export function ImagePath(weaponName: string, type?: WeaponType) {
  if (type) return `./${type.toLowerCase()}/${weaponName}.png`;
  else return `./badges/${weaponName}.webp`;
}

export class Weapon {
  private name: string;
  private type: WeaponType;
  private image: string[];

  constructor(name: string, type: WeaponType, image: string[]) {
    this.name = name;
    this.type = type;
    this.image = image;
  }

  getName() {
    return this.name;
  }

  getType() {
    return WEAPON_TYPE[this.type];
  }

  getBadge() {
    return this.image[0];
  }
  getImage() {
    return this.image[1];
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

const weapons = {
  smg: {},
};
