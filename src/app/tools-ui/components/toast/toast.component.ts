
import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  template: `
    <div *ngIf="show" class="{{positionClass}} position-fixed alert {{bgClass}} m-2" role="alert" style="width:20rem;z-index:9999" [@toastAnimate] >
      <h6 class="alert-heading">{{title}}
        <span (click)="show = false" class="pointer pull-right {{closeClass}}" style="opacity: 0.8;">
          &times;
        </span>
      </h6>
      <hr class="mb-2">
      <p class="mb-0 mt-0">{{message}}</p>
    </div>
  `,
  styles: [
    '.close {cursor:pointer;}',
    '.top-0 {top:0}',
    '.bottom-0 {bottom:0}',
    '.left-0 {left:0}',
    '.right-0 {right:0;}',
  ],
  animations: [
    trigger('toastAnimate', [
      transition('* => void', [
        animate(1000, style({ opacity: 0 }))
      ])
    ])]
})
export class ToastComponent {

  @Input() title: string;

  @Input() message: string;

  @Input() bgClass: string;

  @Input() closeClass: string;

  @Input() positionClass: string;

  @Input() timeOut: number;

  show = true;

  private timer: any;

  constructor() {
    this.positionClass = 'right-0';
  }

  play() {
    this.show = true;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(_ => this.show = false, this.timeOut);
  }

}
