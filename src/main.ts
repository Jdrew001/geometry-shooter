import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'
import MainScene from './scenes/main.scene'

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
	scene: [MainScene],
}

export default new Phaser.Game(config)
