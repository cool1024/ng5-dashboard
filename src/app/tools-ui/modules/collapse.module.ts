import { NgModule } from '@angular/core';
import { TriggleModule } from './triggle.module';
import { CollapseDirective } from './../components/collapse/collapse.directive';
import { CollapsesDirective } from './../components/collapse/collapses.directive';
import { HtmlDomService } from './../services/htmldom.services';

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
  ],
  providers: [
    HtmlDomService,
  ]
})
export class CollapseModule { }
