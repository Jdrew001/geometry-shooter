export class ScoreManager {
    private _scene: Phaser.Scene;
    private _score: number = 0;
    private scoreText: Phaser.GameObjects.Text;
    private livesText: Phaser.GameObjects.Text;
    private lives: number = 3;

    get scene() { return this._scene; }
    get score() { return this._score; }
    set score(value: number) { this.score = value; }

    constructor(scene: Phaser.Scene) {
        this._scene = scene;
    }
    
    preload() {
        
    }

    create() {
        this.scoreText = this._scene.add.text(5, 0, `Score: ${this.score}`, { fontFamily: '"Roboto Condensed"', fontSize: 'px' });
        this.scoreText.scrollFactorX = 0;
        this.scoreText.scrollFactorY = 0;
        this.scoreText.setFontSize(20);

        this.initLives();
    }

    update() {

    }

    addScore(value: number) {
        this.score += value;
    }

    resetScore() {
        this.score = 0;
    }

    initLives() {
        this.livesText = this._scene.add.text(5, 30, 'X X X', { fontFamily: '"Roboto Condensed"', fontSize: 'px' });
        this.scoreText.scrollFactorX = 0;
        this.scoreText.scrollFactorY = 0;
        this.scoreText.setFontSize(20);
    }
}