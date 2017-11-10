import { NgModule } from '@angular/core';
import { TriggleModule } from './triggle.module';
import { CollapseDirective } from './../components/collapse/collapse.directive';
import { CollapsesDirective } from './../components/collapse/collapses.directive';

@NgModule({
  imports: [
    TriggleModule
  ],
  declarations: [
    CollapseDirective,
    CollapsesDirective,
  ],
  exports: [
    TriggleModule,
    CollapseDirective,
    CollapsesDirective,
  ]
})
export class CollapseModule { }
