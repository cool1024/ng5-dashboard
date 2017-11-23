import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimepickerComponent } from './../components/timepicker/timepicker.component';
import { HtmlDomService } from './../services/htmldom.services';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TimepickerComponent
  ],
  exports: [
    CommonModule,
    TimepickerComponent,
  ],
  providers: [
    HtmlDomService
  ]
})
export class TimePickerModule { }
