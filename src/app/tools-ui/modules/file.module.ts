import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputImageComponent } from './../components/input-image/input-image.component';
import { InputImagesComponent } from './../components/input-images/input-images.component';
import { InputVideoComponent } from './../components/input-video/input-video.component';
import { InputFileDirective } from './../directives/input-file.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    InputImageComponent,
    InputImagesComponent,
    InputVideoComponent,
    InputFileDirective,
  ],
  exports: [
    CommonModule,
    InputImageComponent,
    InputImagesComponent,
    InputVideoComponent,
    InputFileDirective,
  ]
})
export class FileModule { }
