import { Entity } from "./base";

export abstract class BaseEnemy extends Entity {

    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    scoreWeight: number;
    rotation;
}