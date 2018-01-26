import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsRoutingModule } from './goods.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs/dist';
import {
    TSSelectModule,
    TSLoadingModule,
    TSDropdownModule,
    TSPaginationModule,
    // TSConfirmModule,
    TSSwitchModule,
    TSFileModule,
    TSLoopCardModule,
    TSTableModule,
} from '../../tools-ui';
import { GoodsInfoComponent } from './pages/goods-info/goods-info.component';
import { GoodsListComponent } from './pages/goods-list/goods-list.component';
import { GoodsTypeComponent } from './pages/goods-type/goods-type.component';
import { GoodsLoopComponent } from './pages/goods-loop/goods-loop.component';
import { GoodsListSmartComponent } from './pages/goods-list-smart/goods-list-smart.component';

@NgModule({
    imports: [
        CommonModule,
        GoodsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SortablejsModule,
        TSSelectModule,
        TSLoadingModule,
        TSDropdownModule,
        TSPaginationModule,
        TSSwitchModule,
        TSFileModule,
        TSLoopCardModule,
        TSTableModule,
    ],
    declarations: [
        GoodsInfoComponent,
        GoodsListComponent,
        GoodsTypeComponent,
        GoodsLoopComponent,
        GoodsListSmartComponent,
    ]
})
export class GoodsModule { }
