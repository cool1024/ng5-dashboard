import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnLoadingComponent } from './../directives/btn-loading.directive';
import { ImgLoadingDirective } from './../directives/img-loading.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BtnLoadingComponent,
    ImgLoadingDirective,
  ],
  exports: [
    CommonModule,
    BtnLoadingComponent,
    ImgLoadingDirective,
  ]
})
export class LoadingModule { }
