import { Entity } from "./base";

export abstract class BaseEnemy extends Entity {

    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    velocity: Phaser.Math.Vector2;
    position: Phaser.Math.Vector2;
    id: string; // enum
    parent: BaseEnemy;
    scoreWeight: number;
    rotation;
}