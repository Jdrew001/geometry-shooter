import Container, { Service } from "typedi";
import { EnemyEnum } from "../utils/enemy.enum";
import { EnemyManager } from "./enemy.manager";
import { EventManager } from "./event.manager";
import { LaserManager } from "./laser.manager";
import { ScoreManager } from "./score.manager";
import { SoundManager, SOUNDS_CONFIGS } from "./sound.manager";

@Service()
export class CollisionManager {

    private _scene: Phaser.Scene;
    get scene() { return this._scene; }
    set scene(val) { this._scene = val; }

    private eventManager: EventManager = Container.get(EventManager);
    private enemyManager: EnemyManager = Container.get(EnemyManager);
    private laserManager: LaserManager = Container.get(LaserManager);
    private scoreManager: ScoreManager = Container.get(ScoreManager);
    private soundManager: SoundManager = Container.get(SoundManager);


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
        this.scene.physics.collide(
            this.enemyManager.ActiveChildEnemies.map(o => o.sprite),
            this.laserManager.lasers.map(o => o.LaserSprite),
            (enemy, laser) => {this.handleLaserEnemySMCollision(enemy, laser)}
        )
    }

    handleLaserEnemyCollision(enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody, laser: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        let lastEnemyPosition = enemy.body.position;
        enemy.destroy();
        laser.destroy();
        this.soundManager.playSound(SOUNDS_CONFIGS.EXPLOSION);

        this.eventManager.createEnemy$.next({position: lastEnemyPosition, count: 3, enemy: EnemyEnum.squareSM});
    }

    handleLaserEnemySMCollision(enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody, laser: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        let lastEnemyPosition = enemy.body.position;
        enemy.destroy();
        laser.destroy();
        this.soundManager.playSound(SOUNDS_CONFIGS.HURT);

        this.scoreManager.addScore(1);
    }
}