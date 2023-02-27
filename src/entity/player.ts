import Phaser from 'phaser';
import { Entity } from './base';

export class Player implements Entity {

    private _playerSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    get PlayerSprite() { return this._playerSprite; }
    private set PlayerSprite(sprite) { this._playerSprite = sprite; }

    _scene: Phaser.Scene;

    keyA;
	keyS;
	keyD;
	keyW;

    constructor(scene: Phaser.Scene) {
        this._scene = scene;
    }

    preload() {
        this.keyA = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.keyS = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.keyD = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.keyW = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this._scene.load.image('player', 'assets/player/player3.png')
    }

    create() {
        this.PlayerSprite = this._scene.physics.add.sprite(this._scene.scale.width/2, this._scene.scale.height/2, 'player');
		this.PlayerSprite.setBounce(0.2);
        
		this.PlayerSprite.setScale(1/6);
        this.PlayerSprite.setOrigin(0.5, 0.5) 
		this.PlayerSprite.setMaxVelocity(250, 250);
		this.PlayerSprite.setCollideWorldBounds(true)
		this.PlayerSprite.body.onWorldBounds = true;
		this.PlayerSprite.body.useDamping = true;
		this.PlayerSprite.body.setAllowGravity(false);
		this.PlayerSprite.setRotation(-1.5)

		this.resetFromBounds();
    }

    update() {
        this.managePlayerMovement();
    }

	destroy() {
		throw new Error('Method not implemented.');
	}

    resetFromBounds() {
        this._scene.physics.world.on('worldbounds', (body, up, down, left, right) => {
			if (down) {
				this._playerSprite.setPosition(body.center.x, 0);
			}
		})
    }

    private managePlayerMovement() {
        this.PlayerSprite.setAcceleration(0);
		this.PlayerSprite.setDrag(0);
		this.PlayerSprite.body.angularVelocity = 0;

		if (this.keyA.isDown) {
			this.PlayerSprite.body.angularVelocity = -200;
		}

		if (this.keyD.isDown) {
			this.PlayerSprite.body.angularVelocity = 200;
		}

		if (this.keyW.isDown) {
			this.PlayerSprite.body.acceleration.setToPolar(this.PlayerSprite.rotation, 250);
		}

        if (this.keyS.isDown) {
            this.PlayerSprite.setDrag(0.45);
        }

		if (!this.keyW.isDown && !this.keyS.isDown) {
			this.PlayerSprite.setDrag(0.70);
		}
    }
}