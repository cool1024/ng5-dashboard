import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './../components/datepicker/datepicker.component';
import { DropdownModule } from './dropdown.module';
import { HtmlDomService } from './../services/htmldom.services';

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
  ],
  providers: [
    HtmlDomService
  ]
})
export class DatePickerModule { }
