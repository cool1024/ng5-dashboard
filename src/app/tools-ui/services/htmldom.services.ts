import { Injectable } from '@angular/core';

@Injectable()
export class HtmlDomService {

    getExpHeight(dom: HTMLElement): number {
        dom.style.visibility = 'hidden';
        const height = dom.clientHeight;
        dom.style.visibility = '';
        return height;
    }

    getPosition(dom: HTMLElement): { x: number, y: number } {
        console.log(dom);
        return { x: dom.clientLeft, y: dom.clientTop };
    }
}
