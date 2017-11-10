import { Directive, HostListener, Input } from '@angular/core';
import { Task, TaskHandle } from './../classes/task.class';

@Directive({
  selector: '[ts-triggle]',
  exportAs: 'tsTriggle',
})
export class TriggleDirective {

  private _target: any;
  private clickHandle: TaskHandle;
  private clickTask: Task;

  @Input() clickTriggle: any;

  constructor() {
    this.clickTask = new Task(handle => this.clickHandle = handle);
  }

  @HostListener('click') onclick() {
    if (this.clickHandle) {
      this.clickHandle.ready(this._target);
    }
    if (this.clickTriggle) {
      this.clickTriggle.triggle();
    }
  }

  target(target: any) {
    this._target = target;
  }

  get click(): Task {
    return this.clickTask;
  }
}
