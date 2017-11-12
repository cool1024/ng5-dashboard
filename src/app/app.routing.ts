import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';


const routes: Routes = [

  // 此处设置网站首页
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // 懒加载子模块
  { path: 'table', loadChildren: 'app/modules/table/table.module#TableModule' },
  { path: 'form', loadChildren: 'app/modules/form/form.module#FormModule' },
  { path: 'upload', loadChildren: 'app/modules/upload/upload.module#UploadModule' },
  { path: 'pad', loadChildren: 'app/modules/pad/pad.module#PadModule' },
  { path: 'message', loadChildren: 'app/modules/message/message.module#MessageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
