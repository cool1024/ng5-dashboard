import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverDirective } from './../directives/hover.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HoverDirective,
  ],
  exports: [
    CommonModule,
    HoverDirective,
  ]
})
export class HoverModule { }
