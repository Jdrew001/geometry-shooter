import { CoordinateUtil } from "../utils/coordiate.util";
import { RandomUtils } from "../utils/random.util";
import { Entity } from "./base";
import { BaseEnemy } from "./base.enemy";

export class MainSquareEnemy implements BaseEnemy {

    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    velocity: Phaser.Math.Vector2;
    position: Phaser.Math.Vector2;
    id: string;
    parent: BaseEnemy;
    scoreWeight: number;
    _scene: Phaser.Scene;
    angularVelocity = RandomUtils.randomNumber(95, 220);
    rotation: number = RandomUtils.randomNumber(0,6); // radians 0-6 in 360 degres
    randomBoolean: boolean = RandomUtils.randomBoolean();
    Vector2 = Phaser.Math.Vector2;

    constructor(scene: Phaser.Scene) {
        this._scene = scene;
    }
    
    preload() {
        this._scene.load.image('main-square-enemy', 'assets/enemies/square_basic_lg.png');
    }

    create() {
        this.position = RandomUtils.randomVector2(20, 20, window.innerWidth - 200, window.innerHeight - 200);
        this.sprite = this._scene.physics.add.sprite(this.position.x, this.position.y, 'main-square-enemy');
        this.sprite.setScale(1/6);
        this.sprite.body.angularVelocity = this.randomBoolean ? this.angularVelocity: this.angularVelocity*-1; // rand positive or negative;
        this.sprite.body.setAllowGravity(false);
        this.sprite.setRotation(this.rotation) //rand num
        this.sprite.setMaxVelocity(200);
        this.createMovement();
    }

    // any shooting/pulsing/etc
    update() {}

    destroy() {
        this.sprite.destroy();
    }

    createMovement() {
        let coordiates = CoordinateUtil.generateCoordinates(this._scene);

        let quadrant = coordiates.find(o => {
            let xCheck = this.position.x > o.min.x && this.position.x < o.max.x;
            let yCheck = this.position.y > o.min.y && this.position.y < o.max.y;

            return xCheck && yCheck;
        });

        let degree = RandomUtils.randomNumber(quadrant.minDegree, quadrant.maxDegree);
        this.sprite.body.acceleration.setToPolar(Phaser.Math.DegToRad(degree),100);
    }
}