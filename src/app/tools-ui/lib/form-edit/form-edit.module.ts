import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabModule } from './../../modules/tab.module';
import { CheckboxModule } from './../../modules/checkbox.module';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs/dist';

import { FormEditComponent } from './form-edit.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { InputFieldEditComponent } from './components/input-field/input-field-edit.component';
import { TextAreaFieldComponent } from './components/textarea-field/textarea-field.component';
import { TextAreaFieldEditComponent } from './components/textarea-field/textarea-field-edit.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { SelectFieldEditComponent } from './components/select-field/select-field-edit.component';
import { RadioFieldComponent } from './components/radio-field/radio-field.component';
import { RadioFieldEditComponent } from './components/radio-field/radio-field-edit.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { TextFieldEditComponent } from './components/text-field/text-field-edit.component';
import { DateFieldComponent } from './components/date-field/date-field.component';
import { DateFieldEditComponent } from './components/date-field/date-field-edit.component';
import { FileFieldComponent } from './components/file-field/file-field.component';
import { FileFieldEditComponent } from './components/file-field/file-field-edit.component';

@NgModule({
  imports: [
    FormsModule,
    TabModule,
    CheckboxModule,
    SortablejsModule,
  ],
  declarations: [
    FormEditComponent,
    InputFieldComponent,
    InputFieldEditComponent,
    TextAreaFieldComponent,
    TextAreaFieldEditComponent,
    SelectFieldComponent,
    SelectFieldEditComponent,
    RadioFieldComponent,
    RadioFieldEditComponent,
    TextFieldComponent,
    TextFieldEditComponent,
    DateFieldComponent,
    DateFieldEditComponent,
    FileFieldComponent,
    FileFieldEditComponent,
  ],
  exports: [
    FormsModule,
    TabModule,
    CheckboxModule,
    SortablejsModule,
    FormEditComponent,
  ]
})
export class FormEditModule { }
