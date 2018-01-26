import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

/*tool-ui*/
import {
  TSPaginationModule,
  TSLoadingModule,
  TSDropdownModule,
  TSToastModule,
  TSTableModule,
} from './../../tools-ui';

/*路由模块*/
import { TableRoutingModule } from './table.routing';

/*页面组件*/
import { SimpleComponent } from './pages/simple/simple.component';
import { DetailComponent } from './pages/detail/detail.component';
import { SmartComponent } from './pages/smart/smart.component';

@NgModule({
  imports: [
    FormsModule,
    TSPaginationModule,
    TSDropdownModule,
    TSLoadingModule,
    TSToastModule,
    TSTableModule,
    TableRoutingModule,
  ],
  declarations: [
    SimpleComponent,
    DetailComponent,
    SmartComponent,
  ]
})
export class TableModule { }
