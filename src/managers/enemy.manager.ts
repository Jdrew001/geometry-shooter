import Container, { Service } from "typedi";
import { Entity } from "../entity/base";
import { BaseEnemy } from "../entity/base.enemy";
import { Player } from "../entity/player";
import { ENEMY_OBJECTS } from "../utils/enemy.constant";

@Service()
export class EnemyManager {

    get ActiveEnemies() { return this.activeEnemies; }
    private activeEnemies: Array<BaseEnemy> = [];
    private player: Player;
    private scene: Phaser.Scene;
    private spawnRate: number = 850; //ms
    private currentTime: number;
    private maxEnemies = 25;

    constructor() {}

    init(player: Player, scene: Phaser.Scene) {
        this.player = player;
        this.scene = scene;
    }

    preload() {
        this.scene.load.image('main-square-enemy', 'assets/enemies/square_basic_lg.png');
    }

    create() {
        
    }

    update() {
        this.handleEnemyCreations();
        this.checkForPlayerIntersection(this.player.PlayerSprite);
    }

    checkForPlayerIntersection(
        player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
            this.scene.physics.collide(
                player,
                this.ActiveEnemies.map(o => o.sprite),
                (player, enemy) => enemy.destroy()
            )
    }

    private handleEnemyCreations() {
        if (this.currentTime > this.scene.time.now) return;
        this.createEnemy();

        this.currentTime = this.scene.time.now + this.spawnRate;
    }

    private createEnemy() {
        let newEnemy = new ENEMY_OBJECTS.squareLg(this.scene);
        newEnemy.create();
        this.activeEnemies.push(newEnemy);

        if (this.activeEnemies.length == this.maxEnemies) {
            this.activeEnemies[0].destroy();
            this.activeEnemies.splice(0, 1);
        }
    }
}