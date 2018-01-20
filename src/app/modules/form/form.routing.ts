import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Breadcrumbs } from './../../dashboard/classes/breadcrumb.class';
import { SimpleComponent } from './pages/simple/simple.component';
import { SelectComponent } from './pages/select/select.component';
import { CheckboxComponent } from './pages/checkbox/checkbox.component';
import { DatepickerComponent } from './pages/datepicker/datepicker.component';
import { LoopCardComponent } from './pages/loop-card/loop-card.component';
import { MutiComponent } from './pages/muti/muti.component';
import { CheckFormComponent } from './pages/checkform/checkform.component';

const routes: Routes = [
  {
    path: 'simple', component: SimpleComponent,
    data: { breadcrumbs: new Breadcrumbs([['表单', 'list-alt'], ['简单表单', 'tablet']]) }
  },
  {
    path: 'muti', component: MutiComponent,
    data: { breadcrumbs: new Breadcrumbs([['表单', 'list-alt'], ['功能表单', 'codepen']]) }
  },
  {
    path: 'checkbox', component: CheckboxComponent,
    data: { breadcrumbs: new Breadcrumbs([['表单', 'list-alt'], ['勾选框', 'check-square-o']]) }
  },
  {
    path: 'select', component: SelectComponent,
    data: { breadcrumbs: new Breadcrumbs([['表单', 'list-alt'], ['下拉选择', 'caret-down']]) }
  },
  {
    path: 'datepicker', component: DatepickerComponent,
    data: { breadcrumbs: new Breadcrumbs([['表单', 'list-alt'], ['日期选择', 'calendar']]) }
  },
  {
    path: 'loopcard', component: LoopCardComponent,
    data: { breadcrumbs: new Breadcrumbs([['表单', 'list-alt'], ['轮播图', 'file-image-o']]) }
  },
  {
    path: 'checkform', component: CheckFormComponent,
    data: { breadcrumbs: new Breadcrumbs([['表单', 'list-alt'], ['表单校验', 'filter']]) }
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
export class FormRoutingModule { }
