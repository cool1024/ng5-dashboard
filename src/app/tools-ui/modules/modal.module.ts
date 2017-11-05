import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './../components/modal/modal.component';
import { ModalDirective } from './../components/modal/modal.directive';
import { ModalService } from './../components/modal/modal.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ModalComponent,
    ModalDirective,
  ],
  entryComponents: [
    ModalComponent,
  ],
  providers: [
    ModalService,
  ]
})
export class ModalModule { }
