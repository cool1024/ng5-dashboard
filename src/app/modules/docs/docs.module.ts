import { NgModule } from '@angular/core';

/*tool-ui*/
import { TSLoadingModule } from './../../tools-ui';

/*路由模块*/
import { DocsRoutingModule } from './docs.routing';

/*页面组件*/
import { SimpleComponent } from './pages/simple/simple.component';

@NgModule({
  imports: [
    TSLoadingModule,
    DocsRoutingModule,
  ],
  declarations: [
    SimpleComponent,
  ]
})
export class DocsModule { }
