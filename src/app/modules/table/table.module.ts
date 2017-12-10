import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

/*tool-ui*/
import { TSPaginationModule, TSLoadingModule, TSDropdownModule, TSConfirmModule, TSToastModule } from './../../tools-ui';

/*路由模块*/
import { TableRoutingModule } from './table.routing';

/*页面组件*/
import { SimpleComponent } from './pages/simple/simple.component';
import { DetailComponent } from './pages/detail/detail.component';

@NgModule({
  imports: [
    FormsModule,
    TSPaginationModule,
    TSDropdownModule,
    TSLoadingModule,
    TableRoutingModule,
    TSConfirmModule,
    TSToastModule,
  ],
  declarations: [
    SimpleComponent,
    DetailComponent,
  ]
})
export class TableModule { }
