import { Entity } from "./base";

export class Laser implements Entity {

    _scene: Phaser.Scene;
    rotation: number;
    position: Phaser.Math.Vector2;

    private _laserSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    get LaserSprite() { return this._laserSprite; }
    private set LaserSprite(sprite) { this._laserSprite = sprite; } 
    
    constructor(scene: Phaser.Scene) {
        this._scene = scene;
    }
    
    preload() {
        this._scene.load.image('laser', 'assets/player/laser.png');
    }

    create() {
        this.LaserSprite = this._scene.physics.add.sprite(-100, -100, 'laser');
        this.LaserSprite.setScale(1/3);
    }

    update() {
        
    }

    destroy() {
        
    }

    updateForFire() {
        this.LaserSprite.setRotation(Phaser.Math.DegToRad(this.rotation));
        this.LaserSprite.body.position = this.position;
        this.LaserSprite.setCollideWorldBounds(false);
        this.LaserSprite.body.setAllowGravity(false);
        this.LaserSprite.body.velocity.setToPolar(Phaser.Math.DegToRad(this.rotation),700);
    }
}