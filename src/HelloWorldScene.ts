import Phaser from 'phaser';
import { Laser } from './entity/laser';
import { Player } from './entity/player';
import { LaserManager } from './managers/laser.manager';

export default class HelloWorldScene extends Phaser.Scene {

	player: Player;
	laserManager: LaserManager;

	constructor() {
		super("");
		this.player = new Player(this);
		this.laserManager = new LaserManager(this, this.player);
	}

	preload() {
		this.load.image('laser', 'assets/player/laser.png');
		this.player.preload();
		this.laserManager.preload();
	}

	create() {
		this.player.create();
		this.laserManager.create();
	}

	update() {
		this.player.update();
		this.laserManager.update();
	}
}
