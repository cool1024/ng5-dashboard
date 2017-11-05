import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './../components/select/select.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SelectComponent,
  ],
  exports: [
    CommonModule,
    SelectComponent,
  ]
})
export class SelectModule { }
