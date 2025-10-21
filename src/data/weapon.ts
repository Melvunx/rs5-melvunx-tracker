import { WeaponType } from "../schema/weapon";

export class Weapon {
  name: string;
  type: WeaponType;
  image: string;

  constructor(name: string, type: WeaponType, image: string) {
    this.name = name;
    this.type = type;
    this.image = image;
  }

}
