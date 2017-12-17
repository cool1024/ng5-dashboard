
import { Component, Input } from '@angular/core';
import { Task, TaskHandle } from './../../classes/task.class';

@Component({
  template: `
  <div *ngIf="show" class="d-flex fixed-top h-100 w-100" [ngStyle]="{'background-color':bgColor}">
    <div class="align-self-center w-100">
      <div class="card {{cardClass}}" style="max-width: 20rem;margin:auto;">
        <div class="card-header">{{title}}
          <span (click)="show = false" class="pointer pull-right {{closeClass}}" aria-label="Close" style="opacity: 0.8;">
          &times;
          </span>
        </div>
        <div class="card-body">
          <p class="card-text">{{message}}</p>
          <div class="text-right">
            <span (click)="show = false" type="button" class="btn btn-sm btn-link {{btnClass}}">{{cancleTitle}}</span>
            <span (click)="confirm()" type="button" class="btn btn-sm btn-link {{btnClass}}">{{okTitle}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [
    '.close {cursor:pointer;}',
    '.btn-link {text-decoration:none;cursor:pointer;}',
  ]
})
export class ConfirmComponent {

  @Input() title: string;

  @Input() message: string;

  @Input() okTitle: string;

  @Input() cancleTitle: string;

  @Input() bgColor: string;

  @Input() cardClass: string;

  @Input() closeClass: string;

  @Input() btnClass: string;

  show = true;

  private task: Task;

  private handle: TaskHandle;

  constructor() {
    this.title = 'Title';
    this.message = 'Some quick example text to build on the card title and make up the bulk of the card\'s content.';
    this.bgColor = 'rgba(0,0,0,0.2)';
    this.cardClass = 'bg-primary text-white';
    this.closeClass = 'text-white';
    this.okTitle = 'Confirm';
    this.cancleTitle = 'Cancle';
    this.btnClass = 'text-white';
  }

  confirm() {
    if (this.handle) { this.handle.ready(); }
    this.show = false;
  }

  play() {
    this.show = true;
  }

  getTask(): Task {
    this.task = new Task(handle => this.handle = handle);
    return this.task;
  }
}
