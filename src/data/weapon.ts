import {
  getMaxWeaponAccuracy,
  getMaxWeaponShotsHit,
  getWeaponStats,
} from "@/app/actions/weapon";
import { WEAPON_TYPE, WeaponType } from "../schema/weapon";

export class Weapon {
  private name: string;
  private type: WeaponType;
  private image: string;

  constructor(name: string, type: WeaponType, image: string) {
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
