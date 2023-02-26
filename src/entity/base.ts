export abstract class Entity {
    abstract _scene: Phaser.Scene;
    abstract preload();
    abstract create();
    abstract update();
    abstract destroy();
}