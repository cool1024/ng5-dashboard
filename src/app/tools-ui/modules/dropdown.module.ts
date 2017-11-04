import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './../components/dropdown/dropdown.component';
import { DropdownDirective } from './../directives/dropdown.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropdownComponent,
    DropdownDirective,
  ],
  exports: [
    CommonModule,
    DropdownComponent,
    DropdownDirective,
  ]
})
export class DropdownModule { }
