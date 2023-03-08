import MainScene from "./main.scene";

export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super(LoadingScene.name);
    }

    preload() {
        this.load.image('laser', 'assets/player/laser.png');
        this.load.image('main-square-enemy', 'assets/enemies/square_basic_lg.png');
        this.load.image('small-square-enemy', 'assets/enemies/square_basic_sm.png');
        this.load.image('player', 'assets/player/player3.png');
        this.load.audio('laserShoot', 'assets/sounds/laserShoot.wav');
        this.load.audio('blipSelect', 'assets/sounds/blipSelect.wav');
        this.load.audio('explosion', 'assets/sounds/explosion.wav');
        this.load.audio('hitHurt', 'assets/sounds/hitHurt.wav');
        this.load.audio('powerUp', 'assets/sounds/powerUp.wav');
        this.load.audio('gameMusic', 'assets/sounds/game_music.wav');
	}

    create() {
        this.scene.start(MainScene.name);
    }
}