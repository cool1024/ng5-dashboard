import { NgModule } from '@angular/core';
import { BtnGroupComponent } from './../components/btn-group/btn-group.component';
import { BtnItemComponent } from './../components/btn-group/btn-item.component';
import { BtnGroupModalComponent } from './../modals/btn-group-modal.component';
import { ModalModule } from './modal.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ModalModule,
    FormsModule,
  ],
  declarations: [
    BtnGroupComponent,
    BtnItemComponent,
    BtnGroupModalComponent,
  ],
  exports: [
    ModalModule,
    FormsModule,
    BtnGroupComponent,
    BtnItemComponent,
    BtnGroupModalComponent,
  ],
  entryComponents: [
    BtnGroupModalComponent
  ]
})
export class BtnGroupModule { }
