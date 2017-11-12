import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './../components/confirm/confirm.component';
import { ConfirmService } from './../components/confirm/confirm.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ConfirmComponent,
  ],
  entryComponents: [
    ConfirmComponent,
  ],
  providers: [
    ConfirmService,
  ],
  exports: [
    CommonModule
  ]
})
export class ConfirmModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ConfirmModule,
      providers: [
        ConfirmService,
      ]
    };
  }
}
