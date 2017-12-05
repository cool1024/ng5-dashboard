import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoopCardComponent } from './../components/loop-card/loop-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    LoopCardComponent
  ],
  exports: [
    CommonModule,
    LoopCardComponent
  ]
})
export class LoopCardModule { }
