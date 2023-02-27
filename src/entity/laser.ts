import Container from "typedi";
import { EventManager } from "../managers/event.manager";
import { Entity } from "./base";

export class Laser implements Entity {

    _scene: Phaser.Scene;
    rotation: number;
    position: Phaser.Math.Vector2;
    private isDestroyed = false;

    get IsDestroyed() { return this.isDestroyed; }

    private _laserSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    get LaserSprite() { return this._laserSprite; }
    private set LaserSprite(sprite) { this._laserSprite = sprite; } 

    eventManager = Container.get(EventManager);
    
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
        this.checkForBoundary();
    }

    destroy() {
        this.LaserSprite.destroy();
        this.isDestroyed = true;
    }

    updateForFire() {
        if (!this.LaserSprite) return;
        if (!this.LaserSprite.body) return;
        this.LaserSprite.setRotation(Phaser.Math.DegToRad(this.rotation));
        this.LaserSprite.body.position = this.position;
        this.LaserSprite.body.setAllowGravity(false);
        this.LaserSprite.body.velocity.setToPolar(Phaser.Math.DegToRad(this.rotation),700);
    }

    checkForBoundary() {
        if (this.LaserSprite?.body) {
            let width = this._scene.scale.width;
            let height = this._scene.scale.height;
            let position = this.LaserSprite?.body?.position;
    
            if (position.x < 0 || position.y < 0) {
                this.destroy();
            }
    
            if (position.x > width + 100 || position.y > height + 100) {
                this.destroy();
            }
        } else {
            this.isDestroyed = true;
        }
    }
}