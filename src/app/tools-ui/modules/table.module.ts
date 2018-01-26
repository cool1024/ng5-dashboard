import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from './dropdown.module';
import { PaginationModule } from './pagination.module';
import { LoadingModule } from './loading.module';
import { SmartTableComponent } from './../components/smart-table/smart-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    PaginationModule,
    LoadingModule,
  ],
  declarations: [
    SmartTableComponent
  ],
  exports: [
    CommonModule,
    SmartTableComponent,
  ]
})
export class TableModule { }
