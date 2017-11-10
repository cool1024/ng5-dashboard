import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriggleDirective } from './../directives/triggle.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TriggleDirective,
  ],
  exports: [
    CommonModule,
    TriggleDirective,
  ]
})
export class TriggleModule { }
