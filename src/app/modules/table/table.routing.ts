import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleComponent } from './pages/simple/simple.component';


const routes: Routes = [
  { path: 'simple', component: SimpleComponent },
  { path: 'full', component: SimpleComponent },
  { path: 'diy', component: SimpleComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TableRoutingModule { }
