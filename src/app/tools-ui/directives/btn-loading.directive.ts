import { Component, ElementRef, OnChanges, SimpleChanges, HostBinding, Input } from '@angular/core';

@Component({
  selector: `button[ts-loading]`,
  template: `
      <i [hidden]="!complete" class="fa fa-spinner fa-pulse"></i>
      <span>{{title}}</span>
  `,
  host: { '(click)': 'showLoading()' },
  exportAs: 'tsLoading'
})
export class BtnLoadingComponent implements OnChanges {

  @Input() title: string;

  @Input() loading = false;

  @Input() disabled = false;

  constructor(private elementRef: ElementRef) { }

  ngOnChanges() {
    this.elementRef.nativeElement.disabled = this.disabled;
  }

  set complete(ready: boolean) {
    this.elementRef.nativeElement.disabled = !ready || this.disabled;
    this.loading = !ready;
  }

  get complete(): boolean {
    return this.loading;
  }

  showLoading() {
    this.complete = false;
  }
}
