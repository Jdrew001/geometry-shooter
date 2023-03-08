
import random from 'random'

export class RandomUtils {
    private static Vector2 = Phaser.Math.Vector2;
    static randomNumber(min: number, max: number) {
        return random.int(min, max);
    }

    static randomBoolean() {
        return random.boolean();
    }

    static randomVector2(minX: number, minY: number, maxX: number, maxY: number) {
        return new this.Vector2(random.float(minX, maxX), random.float(minY, maxY));
    }
}