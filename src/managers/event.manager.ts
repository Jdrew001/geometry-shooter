//purpose of class is to manager rxjs messages
import { Subject } from 'rxjs';
import { Service } from 'typedi';
import { BaseEnemy } from '../entity/base.enemy';
import { EnemyEnum } from '../utils/enemy.enum';

@Service()
export class EventManager {

    public laserDestroyed$: Subject<any> = new Subject<any>();

    public updateScore$: Subject<number> = new Subject<number>();
    public laserFired$: Subject<{laser: Phaser.Types.Physics.Arcade.GameObjectWithBody}> = new Subject<any>();
    public enemyCreated$: Subject<Array<BaseEnemy>> = new Subject<Array<BaseEnemy>>();
    public playerEnemyCollison$: Subject<
        {player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
        enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody}> = new Subject<any>();

    constructor() {

    }
}