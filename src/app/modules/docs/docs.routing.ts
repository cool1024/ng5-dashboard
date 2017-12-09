import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Breadcrumbs } from './../../dashboard/classes/breadcrumb.class';
import { SimpleComponent } from './pages/simple/simple.component';


const routes: Routes = [
  { path: ':docs', component: SimpleComponent, data: { breadcrumbs: new Breadcrumbs([['内置服务', 'cogs'], ['HTTP请求', 'internet-explorer']]) } },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DocsRoutingModule { }
