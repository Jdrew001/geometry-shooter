import { RandomUtils } from "./random.util";

export class CoordinateUtil {
    public static get Coordinate() { return this.coordinate; }
    private static coordinate = Phaser.Math.Vector2;
    static generateCoordinates(scene: Phaser.Scene): Array<{id: number, min: Phaser.Math.Vector2, max: Phaser.Math.Vector2, minDegree: number, maxDegree: number}> {
        let width = scene.scale.width;
        let height = scene.scale.height;
        return [
            {id: 1, min: new this.coordinate(0, 0), max: new this.coordinate(width/2, height/2), minDegree: 45, maxDegree: 180},
            {id: 2, min: new this.coordinate(width/2, 0), max: new this.coordinate(width, height/2), minDegree: 180, maxDegree: 315},
            {id: 3, min: new this.coordinate(0, height/2), max: new this.coordinate(width/2, height), minDegree: 0, maxDegree: 135},
            {id: 4, min: new this.coordinate(width/2, height/2), max: new this.coordinate(width, height), minDegree: 225, maxDegree: 360}
        ]
    }

    static generateCoordianteInQuadrant(scene: Phaser.Scene, position: Phaser.Math.Vector2) {
        let width = scene.scale.width;
        let height = scene.scale.height;
        let xMid = width / 2;
        let yMid = height / 2;
        let quadFromPosition = this.findQuadrantFromPosition(scene, position);

        switch(quadFromPosition) {
            case 1: // x: 0 -> half; y: 0 -> half
                return RandomUtils.randomVector2(20, 20, xMid, yMid);
            break;
            case 2:// x: half -> width; y: 0 -> half
                return RandomUtils.randomVector2(xMid, 20, width,  yMid);
            break;
            case 3: // x: 0 -> half; y: half -> height
                return RandomUtils.randomVector2(20,  yMid, xMid-50, height - 50);
            break;
            case 4:// x: half -> width; y half -> height
                return RandomUtils.randomVector2(xMid, yMid, width - 50, height-50);
            break;
        }
    }

    static findQuadrantFromPosition(scene: Phaser.Scene, position: Phaser.Math.Vector2) {
        let width = scene.scale.width;
        let height = scene.scale.height;

        // Quad 1 or 3
        if (position.x > 0 && position.x < width/2) {
            if (position.y > 0 && position.y < height/2) {
                return 1
            } else {
                return 3;
            }
        } else {
            // Quad 2 or 4
            if (position.y > 0 && position.y < height/2) {
                return 2
            } else {
                return 4;
            }
        }

        return -1;
    }
}