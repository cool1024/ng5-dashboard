
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ts-progress',
  template: `
  <div class="progress">
    <div class="progress-bar {{bgColor}}" [ngStyle]="{'width':progress+'%'}" [ngClass]="{'progress-bar-striped':striped,'progress-bar-animated':animated}">
    {{useLable?progress+'%':''}}
    </div>
  </div>
  `,
})
export class ProgressComponent {

  @Input() value: number;

  @Input() useLable: boolean;

  @Input() striped: boolean;

  @Input() animated: boolean;

  @Input() bgColor: string;

  constructor() {
    this.value = 0;
    this.useLable = false;
    this.striped = false;
    this.animated = false;
    this.bgColor = 'bg-dark';
  }

  get progress(): number {

    let progress = Math.ceil(this.value);

    progress = progress < 0 ? 0 : (progress > 100 ? 100 : progress);

    return progress;
  }
}
