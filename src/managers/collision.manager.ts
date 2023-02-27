import Container, { Service } from "typedi";
import { EnemyManager } from "./enemy.manager";
import { EventManager } from "./event.manager";
import { LaserManager } from "./laser.manager";
import { ScoreManager } from "./score.manager";

@Service()
export class CollisionManager {

    private _scene: Phaser.Scene;
    get scene() { return this._scene; }
    set scene(val) { this._scene = val; }

    private eventManager: EventManager = Container.get(EventManager);
    private enemyManager: EnemyManager = Container.get(EnemyManager);
    private laserManager: LaserManager = Container.get(LaserManager);
    private scoreManager: ScoreManager = Container.get(ScoreManager);


    constructor() {}

    init(scene: Phaser.Scene) {
        this.scene = scene;
    }

    create() {
    }

    update() {     
        this.scene.physics.collide(
            this.enemyManager.ActiveEnemies.map(o => o.sprite),
            this.laserManager.lasers.map(o => o.LaserSprite),
            (enemy, laser) => {this.handleLaserEnemyCollision(enemy, laser)}
        )
    }

    handleLaserEnemyCollision(enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody, laser: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        console.log('enemyname', enemy.name)
        enemy.destroy();
        laser.destroy();

        this.scoreManager.addScore(1);
    }
}