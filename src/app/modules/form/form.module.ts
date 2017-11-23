import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

/*tool-ui*/
import {
  TSCheckboxModule,
  TSFileModule,
  TSLoadingModule,
  TSModalModule,
  TSDatePickerModule,
  TSSelectModule,
  TSToggleModule,
  TSTimePickerModule,
} from './../../tools-ui';

/*路由模块*/
import { FormRoutingModule } from './form.routing';

/*弹窗组件*/
import { SimpleModalComponent } from './modal/simple-modal.component';

/*页面组件*/
import { SimpleComponent } from './pages/simple/simple.component';
import { SelectComponent } from './pages/select/select.component';
import { CheckboxComponent } from './pages/checkbox/checkbox.component';
import { DatepickerComponent } from './pages/datepicker/datepicker.component';

@NgModule({
  imports: [
    FormsModule,
    TSCheckboxModule,
    TSFileModule,
    TSLoadingModule,
    TSModalModule,
    FormRoutingModule,
    TSDatePickerModule,
    TSToggleModule,
    TSSelectModule,
    TSTimePickerModule,
  ],
  declarations: [
    SimpleComponent,
    SimpleModalComponent,
    SelectComponent,
    CheckboxComponent,
    DatepickerComponent,
  ],
  entryComponents: [
    SimpleModalComponent
  ]
})
export class FormModule { }
