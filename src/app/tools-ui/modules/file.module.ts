import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputImageComponent } from './../components/input-image/input-image.component';
import { InputImagesComponent } from './../components/input-images/input-images.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    InputImageComponent,
    InputImagesComponent,
  ],
  exports: [
    CommonModule,
    InputImageComponent,
    InputImagesComponent,
  ]
})
export class FileModule { }
