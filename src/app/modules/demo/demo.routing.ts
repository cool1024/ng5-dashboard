import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Breadcrumbs } from './../../dashboard/classes/breadcrumb.class';
import { ChartComponent } from './pages/chart/chart.component';
import { EditorComponent } from './pages/editor/editor.component';
import { MapComponent } from './pages/map/map.component';
import { CodeComponent } from './pages/code/code.component';


const routes: Routes = [
  {
    path: 'chart',
    component: ChartComponent,
    data: { breadcrumbs: new Breadcrumbs([['第三方库', 'archive'], ['Chartjs图表', 'bar-chart']]) }
  },
  {
    path: 'edit',
    component: EditorComponent,
    data: { breadcrumbs: new Breadcrumbs([['第三方库', 'archive'], ['富文本编辑器', 'edit']]) }
  },
  {
    path: 'map',
    component: MapComponent,
    data: { breadcrumbs: new Breadcrumbs([['第三方库', 'archive'], ['地图', 'map']]) }
  },
  {
    path: 'code',
    component: CodeComponent,
    data: { breadcrumbs: new Breadcrumbs([['第三方库', 'archive'], ['代码高亮', 'code']]) }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DemoRoutingModule { }
