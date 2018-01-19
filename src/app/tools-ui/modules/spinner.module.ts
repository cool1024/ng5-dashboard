import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './../components/spinner/spinner.component';
import { LoadCssComponent } from './../components/spinner/loadcss.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SpinnerComponent,
    LoadCssComponent,
  ],
  exports: [
    CommonModule,
    SpinnerComponent,
    LoadCssComponent,
  ]
})
export class SpinnerModule { }
