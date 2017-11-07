import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnLoadingComponent } from './../directives/btn-loading.directive';
import { ImgLoadingDirective } from './../directives/img-loading.directive';
import { FlashLoadingDirective } from './../directives/flash-loading.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BtnLoadingComponent,
    ImgLoadingDirective,
    FlashLoadingDirective,
  ],
  exports: [
    CommonModule,
    BtnLoadingComponent,
    ImgLoadingDirective,
    FlashLoadingDirective,
  ]
})
export class LoadingModule { }
