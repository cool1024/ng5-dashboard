import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomToggleDirective } from './../directives/dom-toggle.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DomToggleDirective,
  ],
  exports: [
    CommonModule,
    DomToggleDirective,
  ]
})
export class ToggleModule { }
