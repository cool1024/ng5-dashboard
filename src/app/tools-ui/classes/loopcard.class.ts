import { LoopCard } from './../interfaces/loop-card.interface';
export class LoopCardObj implements LoopCard {
    constructor(public id = 0, public url = '', public src = '', public active?: boolean, public file?: File) { }
    setActive() {
        this.active = true;
        this.file = null;
    }
}
export class LoopCardArray {

    private loopCardObjs = new Array<LoopCardObj>();

    constructor(loopCards: LoopCard[]) {
        loopCards.forEach(loopCard => {
            this.loopCardObjs.push(new LoopCardObj(
                loopCard.id, loopCard.url, <string>loopCard.src, true));
        });
    }

    toArray(): LoopCardObj[] {
        return this.loopCardObjs;
    }
}
