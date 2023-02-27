import { Player } from "../entity/player";
import { LaserManager } from "../managers/laser.manager";
import { ScoreManager } from "../managers/score.manager";

export default class MainScene extends Phaser.Scene {
    player: Player;
	laserManager: LaserManager;
	scoreManager: ScoreManager;

	constructor() {
		super("");
		this.player = new Player(this);
		this.laserManager = new LaserManager(this, this.player);
		this.scoreManager = new ScoreManager(this);
	}

	preload() {
        this.laserManager.preload();
		this.player.preload();
		this.scoreManager.preload();
	}

	create() {
		this.player.create();
		this.laserManager.create();
		this.scoreManager.create();
	}

	update() {
		this.player.update();
		this.laserManager.update();
		this.scoreManager.update();
	}
}