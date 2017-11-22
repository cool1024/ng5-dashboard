import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './../components/datepicker/datepicker.component';
import { DropdownModule } from './dropdown.module';

@NgModule({
  imports: [
    DropdownModule,
  ],
  declarations: [
    DatepickerComponent
  ],
  exports: [
    CommonModule,
    DropdownModule,
    DatepickerComponent,
  ]
})
export class DatePickerModule { }
