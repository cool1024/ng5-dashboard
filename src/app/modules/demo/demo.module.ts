import { NgModule } from '@angular/core';

/*tool-ui*/
import {
  TSChartModule,
  TSModalModule,
  TSMapModule,
  TSPrismCodeModule,
} from './../../tools-ui';

/*富文本编辑模块*/
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

/*路由模块*/
import { DemoRoutingModule } from './demo.routing';

/*页面组件*/
import { ChartComponent } from './pages/chart/chart.component';
import { EditorComponent } from './pages/editor/editor.component';
import { MapComponent } from './pages/map/map.component';
import { CodeComponent } from './pages/code/code.component';

/*弹窗组件*/
import { ViewModalComponent } from './pages/editor/view-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    TSChartModule,
    DemoRoutingModule,
    TSModalModule,
    TSMapModule,
    TSPrismCodeModule,

    /*富文本编辑模块*/
    FroalaEditorModule,
    FroalaViewModule
  ],
  declarations: [
    ChartComponent,
    EditorComponent,
    CodeComponent,
    MapComponent,
    ViewModalComponent,
  ],
  entryComponents: [
    ViewModalComponent
  ]
})
export class DemoModule { }
