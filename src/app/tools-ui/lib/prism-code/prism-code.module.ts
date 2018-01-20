import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismCodeComponent } from './prism-code.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PrismCodeComponent
  ],
  exports: [
    PrismCodeComponent
  ]
})
export class PrismCodeModule { }
