import { Game } from "phaser";
import { Laser } from "../entity/laser";
import { Player } from "../entity/player";

export class LaserManager {

    _player: Player;
    _scene: Phaser.Scene;
    entityCount = 25;
    entityIndex = 0;
    fireRate: number = 200
    nextShot: number;

    private _lasers: Array<Laser> = [];

    spaceKey; 

    constructor(scene: Phaser.Scene, player: Player) {
        this._scene = scene;
        this._player = player;
    }

    preload() {
        this._scene.load.image('laser', 'assets/player/laser.png');
        this.spaceKey = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create() {
        // add "entity count" to array
        for(let i = 0; i < this.entityCount; i++) {
            let tempLaser = new Laser(this._scene);
            tempLaser.preload();
            tempLaser.create();
            this._lasers.push(tempLaser);
        }
    }

    update() {
        if (this.spaceKey.isDown) {
            if (this.nextShot > this._scene.time.now) return;
            this.fireLaser();

            this.nextShot = this._scene.time.now + this.fireRate;
        }
    }

    private fireLaser() {
        let playerBody = this._player.PlayerSprite.body; 
        let pos = playerBody.position;
        let middlePosX = pos.x + (playerBody.width / 2) - 15;
        let middlePosY = pos.y + (playerBody.height / 2)
        let playerRotation = this._player.PlayerSprite.body.rotation;
        let vecAngle = this._scene.physics.velocityFromAngle(this._player.PlayerSprite.angle, 250*0.2);    
        console.log(vecAngle)      
        

        let item = this._lasers[this.entityIndex] ;
        item.rotation = playerRotation;
        item.position = new Phaser.Math.Vector2(middlePosX+ vecAngle.x, middlePosY +  vecAngle.y);
        item.updateForFire();
        item.update();

        // increment laser
        this.entityIndex == this.entityCount-1? this.entityIndex = 0: this.entityIndex++;
    }
}