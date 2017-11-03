import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*路由模块*/
import { TableRoutingModule } from './table.routing';

/*页面组件*/
import { SimpleComponent } from './pages/simple/simple.component';

@NgModule({
  imports: [
    CommonModule,
    TableRoutingModule,
  ],
  declarations: [
    SimpleComponent,
  ]
})
export class TableModule { }
