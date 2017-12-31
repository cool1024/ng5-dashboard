import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { GuardService } from './dashboard/services/guard.service';

const routes: Routes = [

  // 此处设置网站首页
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // 懒加载子模块
  { path: 'table', loadChildren: 'app/modules/table/table.module#TableModule', canActivate: [GuardService] },
  { path: 'form', loadChildren: 'app/modules/form/form.module#FormModule', canActivate: [GuardService] },
  { path: 'upload', loadChildren: 'app/modules/upload/upload.module#UploadModule', canActivate: [GuardService] },
  { path: 'pad', loadChildren: 'app/modules/pad/pad.module#PadModule', canActivate: [GuardService] },
  { path: 'message', loadChildren: 'app/modules/message/message.module#MessageModule', canActivate: [GuardService] },
  { path: 'message', loadChildren: 'app/modules/message/message.module#MessageModule', canActivate: [GuardService] },
  { path: 'system', loadChildren: 'app/modules/system/system.module#SystemModule', canActivate: [GuardService] },
  { path: 'docs', loadChildren: 'app/modules/docs/docs.module#DocsModule', canActivate: [GuardService] },
  { path: 'goods', loadChildren: 'app/modules/goods/goods.module#GoodsModule', canActivate: [GuardService] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, preloadingStrategy: PreloadAllModules, useHash: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
