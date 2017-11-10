import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapsePadComponent } from './../components/collapse/collapse.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CollapsePadComponent
  ],
  exports: [
    CommonModule,
    CollapsePadComponent,
  ]
})
export class CollapseModule { }
