export class CoordinateUtil {
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
}