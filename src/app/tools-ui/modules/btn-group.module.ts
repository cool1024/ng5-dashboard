import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnGroupComponent } from './../components/btn-group/btn-group.component';
import { BtnItemComponent } from './../components/btn-group/btn-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BtnGroupComponent,
    BtnItemComponent,
  ],
  exports: [
    BtnGroupComponent,
    BtnItemComponent,
  ]
})
export class BtnGroupModule { }
