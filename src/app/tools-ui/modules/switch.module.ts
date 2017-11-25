import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from './../components/switch/switch.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SwitchComponent
  ],
  exports: [
    CommonModule,
    SwitchComponent,
  ],
  providers: []
})
export class SwitchModule { }
