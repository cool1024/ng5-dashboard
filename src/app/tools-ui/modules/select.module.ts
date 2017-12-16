import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './../components/select/select.component';
import { SelectService } from './../services/select.services';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    SelectComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    SelectComponent,
  ],
  providers: [
    SelectService
  ]
})
export class SelectModule { }
