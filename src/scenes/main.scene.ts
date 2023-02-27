import Container from "typedi";
import { Player } from "../entity/player";
import { EnemyManager } from "../managers/enemy.manager";
import { LaserManager } from "../managers/laser.manager";
import { ScoreManager } from "../managers/score.manager";

export default class MainScene extends Phaser.Scene {
    player: Player;
	laserManager: LaserManager;
	scoreManager: ScoreManager;
	enemyManager: EnemyManager = Container.get(EnemyManager);

	constructor() {
		super("");
		this.player = new Player(this);
		this.laserManager = new LaserManager(this, this.player);
		this.scoreManager = new ScoreManager(this);
		this.enemyManager.init(this.player, this);
	}

	preload() {
        this.laserManager.preload();
		this.player.preload();
		this.scoreManager.preload();
		this.enemyManager.preload();
	}

	create() {
		this.player.create();
		this.laserManager.create();
		this.scoreManager.create();
		this.enemyManager.create();
	}

	update() {
		this.player.update();
		this.laserManager.update();
		this.scoreManager.update();
		this.enemyManager.update();
	}
}