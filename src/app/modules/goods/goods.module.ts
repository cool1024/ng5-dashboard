import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsInfoComponent } from './pages/goods-info/goods-info.component';
import { GoodsRoutingModule } from './goods.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    GoodsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    GoodsInfoComponent
  ]
})
export class GoodsModule { }
