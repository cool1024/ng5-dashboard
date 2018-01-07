import { NgModule } from '@angular/core';

/*tool-ui*/
import { TSChartModule, TSModalModule } from './../../tools-ui';

/*富文本编辑模块*/
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

/*路由模块*/
import { DemoRoutingModule } from './demo.routing';

/*页面组件*/
import { ChartComponent } from './pages/chart/chart.component';
import { EditorComponent } from './pages/editor/editor.component';

/*弹窗组件*/
import { ViewModalComponent } from './pages/editor/view-modal.component';

@NgModule({
  imports: [
    TSChartModule,
    DemoRoutingModule,
    TSModalModule,

    /*富文本编辑模块*/
    FroalaEditorModule,
    FroalaViewModule
  ],
  declarations: [
    ChartComponent,
    EditorComponent,
    ViewModalComponent,
  ],
  entryComponents: [
    ViewModalComponent
  ]
})
export class DemoModule { }
