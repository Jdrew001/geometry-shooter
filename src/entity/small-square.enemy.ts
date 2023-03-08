import { CoordinateUtil } from "../utils/coordiate.util";
import { RandomUtils } from "../utils/random.util";
import { BaseEnemy } from "./base.enemy";

export class SmallSquareEnemy implements BaseEnemy {

    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    scoreWeight: number;
    _scene: Phaser.Scene;
    position: Phaser.Math.Vector2;
    angularVelocity = RandomUtils.randomNumber(95, 220);
    randomBoolean: boolean = RandomUtils.randomBoolean();
    rotation: number = RandomUtils.randomNumber(0,6); // radians 0-6 in 360 degres
    name: string = 'SQUARESM';

    constructor(scene: Phaser.Scene) {
        this._scene = scene;
    }

    preload() {
        this._scene.load.image('small-square-enemy', 'assets/enemies/square_basic_sm.png');
    }

    create(position?: Phaser.Math.Vector2) {
        this.position = position
        this.sprite = this._scene.physics.add.sprite(this.position.x, this.position.y, 'small-square-enemy');
        this.sprite.setScale(1/5);
        this.sprite.body.angularVelocity = this.randomBoolean ? this.angularVelocity: this.angularVelocity*-1; // rand positive or negative;
        this.sprite.body.setAllowGravity(false);
        this.sprite.setRotation(this.rotation) //rand num
        this.sprite.setMaxVelocity(200);
        this.createMovement();
        this.sprite.setName(this.name);
    }

    update() {
        
    }

    destroy() {
        this.sprite.destroy();
    }

    // TODO: Tweek this
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