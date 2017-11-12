import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './../components/progress/progress.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProgressComponent,
  ],
  exports: [
    CommonModule,
    ProgressComponent,
  ]
})
export class ProgressModule { }
