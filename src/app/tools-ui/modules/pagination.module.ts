import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './../components/pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PaginationComponent
  ],
  exports: [
    CommonModule,
    PaginationComponent,
  ]
})
export class PaginationModule { }
