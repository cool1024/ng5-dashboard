import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Breadcrumbs } from './../../dashboard/classes/breadcrumb.class';
import { ChartComponent } from './pages/chart/chart.component';


const routes: Routes = [
  {
    path: ':chart',
    component: ChartComponent,
    data: { breadcrumbs: new Breadcrumbs([['第三方库', 'archive'], ['Chartjs图表', 'bar-chart']]) }
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
