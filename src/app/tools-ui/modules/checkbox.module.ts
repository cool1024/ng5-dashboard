import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './../components/checkbox/checkbox.component';
import { CheckboxsDirective } from './../components/checkbox/checkboxs.direvtive';
import { RadioComponent } from './../components/checkbox/radio.component';
import { RadioDirective } from './../components/checkbox/radios.direvtive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CheckboxComponent,
    CheckboxsDirective,
    RadioComponent,
    RadioDirective,
  ],
  exports: [
    CommonModule,
    CheckboxComponent,
    CheckboxsDirective,
    RadioComponent,
    RadioDirective,
  ]
})
export class CheckboxModule { }
