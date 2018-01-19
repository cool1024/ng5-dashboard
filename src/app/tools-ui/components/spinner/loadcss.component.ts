
import { Component, Input } from '@angular/core';
@Component({
    selector: 'ts-load-css',
    template: `
  <div class="cssload-loader" [ngStyle]="{'width':loadSize.width,'height':loadSize.height}">
      <div class="cssload-inner cssload-one" [ngClass]="borderClass"></div>
      <div class="cssload-inner cssload-two" [ngClass]="borderClass"></div>
      <div class="cssload-inner cssload-three" [ngClass]="borderClass"></div>
  </div>
  `,
})
export class LoadCssComponent {
    @Input() borderClass: string;
    @Input() loadSize: { width: string, height: string };
    constructor() {
        this.borderClass = 'border-dark';
        this.loadSize = { width: '35px', height: '35px' };
    }
}
