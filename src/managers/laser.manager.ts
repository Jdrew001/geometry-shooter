import { Game } from "phaser";
import Container, { Service } from "typedi";
import { Laser } from "../entity/laser";
import { Player } from "../entity/player";
import { EventManager } from "./event.manager";
import _ from "lodash";

@Service()
export class LaserManager {

    _player: Player;
    _scene: Phaser.Scene;
    fireRate: number = 200
    nextShot: number;

    get lasers() { return this._lasers; }
    private _lasers: Array<Laser> = [];

    spaceKey; 

    eventManager: EventManager = Container.get(EventManager);

    init(scene: Phaser.Scene, player: Player) {
        this._scene = scene;
        this._player = player;
    }

    preload() {
        this._scene.load.image('laser', 'assets/player/laser.png');
        this.spaceKey = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create() {
       
    }

    update() {
        this.removeDestroyedLasers();
        if (this.spaceKey.isDown) {
            if (this.nextShot > this._scene.time.now) return;
            this.fireLaser();

            this.nextShot = this._scene.time.now + this.fireRate;
        }
    }

    private removeDestroyedLasers() {
        this._lasers = this._lasers.filter(o => !o.IsDestroyed);
        this._lasers.forEach(laser => {
            laser.checkForBoundary();
        })
    }

    private fireLaser() {
        let tempLaser = _.clone(new Laser(this._scene)) as Laser;
        tempLaser.create();

        let playerBody = this._player.PlayerSprite.body; 
        let pos = playerBody.position;
        let middlePosX = pos.x + (playerBody.width / 2) - 49;
        let middlePosY = pos.y + (playerBody.height / 2)
        let playerRotation = this._player.PlayerSprite.body.rotation;
        let vecAngle = this._scene.physics.velocityFromAngle(this._player.PlayerSprite.angle, 250*0.2);        
        
        tempLaser.rotation = playerRotation;
        tempLaser.position = new Phaser.Math.Vector2(middlePosX+ vecAngle.x, middlePosY +  vecAngle.y);
        tempLaser.updateForFire();

        console.log('before add', this._lasers)
        this._lasers.push(tempLaser);
    }
}