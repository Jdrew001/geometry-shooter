import { Sound } from "phaser";
import { Service } from "typedi";

export class SOUNDS_CONFIGS {
    public static LASER_FIRED: SoundConfig = {
        name: 'laserShoot',
        volume: 0.1
    };
    public static EXPLOSION: SoundConfig = {
        name: 'explosion',
        volume: 0.1
    };
    public static POWERUP: SoundConfig = {
        name: 'powerUp',
        volume: 0.1
    };
    public static HURT: SoundConfig = {
        name: 'hitHurt',
        volume: 0.1
    };
    public static SELECT: SoundConfig = {
        name: 'blipSelect',
        volume: 1
    };
    public static GAME_MUSIC: SoundConfig = {
        name: 'gameMusic',
        volume: 0.1,
        loop: true
    }
}

export interface SoundConfig {
    name: string;
    volume: number;
    loop?: boolean;
}

@Service()
export class SoundManager {

    private scene: Phaser.Scene;

    init(scene: Phaser.Scene) {
        this.scene = scene;
    }

    playSound(soundConfig: SoundConfig) {
        this.scene.sound.add(soundConfig.name, {loop: soundConfig.loop, volume: soundConfig.volume}).play();
    }

    pauseSounds() {
        this.scene.sound.pauseAll();
    }

    stopSounds() {
        this.scene.sound.stopAll();
    }
}