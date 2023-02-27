//purpose of class is to manager rxjs messages
import { Subject } from 'rxjs';
import { Service } from 'typedi';
import { EnemyEnum } from '../utils/enemy.enum';

@Service()
export class EventManager {

    public updateScore$: Subject<number> = new Subject<number>();

    constructor() {

    }
}