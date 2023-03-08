import Container from "typedi";
import { Player } from "../entity/player";
import { CollisionManager } from "../managers/collision.manager";
import { EnemyManager } from "../managers/enemy.manager";
import { LaserManager } from "../managers/laser.manager";
import { ScoreManager } from "../managers/score.manager";
import { SoundManager, SOUNDS_CONFIGS } from "../managers/sound.manager";

export default class MainScene extends Phaser.Scene {
    player: Player;
	laserManager: LaserManager = Container.get(LaserManager);
	scoreManager: ScoreManager = Container.get(ScoreManager);
	enemyManager: EnemyManager = Container.get(EnemyManager);
	soundManager: SoundManager = Container.get(SoundManager);
	collisionManager = Container.get(CollisionManager)

	constructor() {
		super(MainScene.name);
		this.player = new Player(this);
		this.laserManager.init(this, this.player);
		this.scoreManager.init(this);
		this.enemyManager.init(this.player, this);
		this.collisionManager.init(this);
		this.soundManager.init(this);
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
		this.collisionManager.create();
		this.soundManager.playSound(SOUNDS_CONFIGS.GAME_MUSIC)
	}

	update() {
		this.player.update();
		this.laserManager.update();
		this.scoreManager.update();
		this.enemyManager.update();
		this.collisionManager.update();

		console.log(this.scene.scene)
	}
}