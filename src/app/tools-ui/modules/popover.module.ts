import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './../components/popover/popover.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PopoverComponent,
  ],
  exports: [
    CommonModule,
    PopoverComponent,
  ]
})
export class PopoverModule { }
