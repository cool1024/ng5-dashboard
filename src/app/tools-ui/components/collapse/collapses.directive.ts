import { Directive, Input, Output, EventEmitter, QueryList, ContentChildren, forwardRef, AfterViewInit } from '@angular/core';
import { CollapseDirective } from './collapse.directive';
import { TriggleDirective } from './../../directives/triggle.directive';

@Directive({
  selector: 'ts-collapses',
  exportAs: 'tsCollapses',
})
export class CollapsesDirective implements AfterViewInit {

  @Input() auto: boolean;

  @ContentChildren(forwardRef(() => CollapseDirective)) collapses: QueryList<CollapseDirective>;

  @ContentChildren(forwardRef(() => TriggleDirective)) triggles: QueryList<TriggleDirective>;

  constructor() {
    this.auto = false;
  }

  ngAfterViewInit() {
    const collapses = this.collapses.toArray();
    this.triggles.forEach((e, index) => {
      e.target(collapses[index] || null);
      e.click.next((collapse: CollapseDirective) => {
        if (collapse) {
          collapse.triggle();
          if (this.auto) {
            this.closeOther(collapse);
          }
        }
      });
    });
  }

  closeOther(collapse: CollapseDirective) {
    this.collapses.forEach(e => {
      if (e !== collapse) {
        e.collapseClose();
      }
    });
  }
}
