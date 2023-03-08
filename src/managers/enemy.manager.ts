import Container, { Service } from "typedi";
import { BaseEnemy } from "../entity/base.enemy";
import { Player } from "../entity/player";
import { CoordinateUtil } from "../utils/coordiate.util";
import { ENEMY_OBJECTS } from "../utils/enemy.constant";
import { EventManager } from "./event.manager";

@Service()
export class EnemyManager {

    get ActiveEnemies() { return this.activeEnemies; }
    get ActiveChildEnemies() { return this.activeChildEnemies; }
    private activeEnemies: Array<BaseEnemy> = [];
    private activeChildEnemies: Array<BaseEnemy> = [];
    private player: Player;
    private scene: Phaser.Scene;
    private spawnRate: number = 850; //ms
    private currentTime: number;
    private maxEnemies = 35;
    private maxChildEnemies = 25;

    private eventManager = Container.get(EventManager);

    constructor() {}

    init(player: Player, scene: Phaser.Scene) {
        this.player = player;
        this.scene = scene;
        this.initSubscription();
    }

    preload() {}

    create() {
        
    }

    update() {
        this.handleEnemyCreations();
        this.checkForPlayerIntersection(this.player.PlayerSprite);
        this.checkForPlayerSmallIntersection(this.player.PlayerSprite);
    }

    checkForPlayerIntersection(
        player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
            this.scene.physics.collide(
                player,
                this.ActiveEnemies.map(o => o.sprite),
                (player, enemy) => enemy.destroy()
            )
    }

    checkForPlayerSmallIntersection(
        player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    ) {
        this.scene.physics.collide(
            player,
            this.ActiveChildEnemies.map(o => o.sprite),
            (player, enemy) => enemy.destroy()
        )
    }

    private initSubscription() {
        this.eventManager.createEnemy$.subscribe(result => {
            const position = result.position;
            const type = result.enemy;
            const count = result.count;

            this.createChildEnemy(position, type, count);      
        });
    }

    private handleEnemyCreations() {
        if (this.currentTime > this.scene.time.now) return;
        this.createEnemy();

        this.currentTime = this.scene.time.now + this.spawnRate;
    }

    

    private createEnemy() {
        let newEnemy = new ENEMY_OBJECTS.SQUARELG(this.scene);
        newEnemy.create();
        this.activeEnemies.push(newEnemy);

        if (this.activeEnemies.length == this.maxEnemies) {
            this.activeEnemies[0].destroy();
            this.activeEnemies.splice(0, 1);
        }
    }

    private createChildEnemy(position: Phaser.Math.Vector2, type, count) {
        let quadrant = CoordinateUtil.findQuadrantFromPosition(this.scene, position);
        for (let i = 0; i < 3; i++) {
            let newChildEnemy = new ENEMY_OBJECTS.SQUARESM(this.scene);
            let childPosition = this.handleSMSquarePosition(i);
            let newPosition = new Phaser.Math.Vector2(position.x + childPosition.x, position.y + childPosition.y);
            newChildEnemy.create(newPosition);

            this.activeChildEnemies.push(newChildEnemy);

            if (this.activeChildEnemies.length == this.maxEnemies) {
                this.activeChildEnemies[0].destroy();
                this.activeChildEnemies.splice(0, 1);
            }
        }
    }

    private handleSMSquarePosition(index) {
        let positions: {x: number, y: number}[] = [{x: -10, y: -10}, {x: 10, y: -10}, {x: 10, y:10}];
        return positions[index];
    }
}