import { NgModule } from '@angular/core';

/*tool-ui*/
import { TSFileModule, TSProgressModule } from './../../tools-ui';

/*路由模块*/
import { UploadRoutingModule } from './upload.routing';

/*页面组件*/
import { SimpleComponent } from './pages/simple/simple.component';
import { VideoComponent } from './pages/video/video.component';

@NgModule({
  imports: [
    TSFileModule,
    UploadRoutingModule,
    TSProgressModule,
  ],
  declarations: [
    SimpleComponent,
    VideoComponent,
  ]
})
export class UploadModule { }
