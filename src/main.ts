import 'reflect-metadata';
import Phaser from 'phaser'

import MainScene from './scenes/main.scene'
import LoadingScene from './scenes/load.scene';

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: window.innerWidth - 20,
	height: window.innerHeight - 20,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [LoadingScene, MainScene],
}

export default new Phaser.Game(config)
