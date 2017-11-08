import { NgModule } from '@angular/core';

/*tool-ui*/
import { TSFileModule, } from './../../tools-ui';

/*路由模块*/
import { UploadRoutingModule } from './upload.routing';

/*页面组件*/
import { SimpleComponent } from './pages/simple/simple.component';

@NgModule({
  imports: [
    TSFileModule,
    UploadRoutingModule,
  ],
  declarations: [SimpleComponent]
})
export class UploadModule { }
