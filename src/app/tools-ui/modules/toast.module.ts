import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './../components/toast/toast.component';
import { ToastService } from './../components/toast/toast.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ToastComponent,
  ],
  entryComponents: [
    ToastComponent,
  ],
  providers: [
    ToastService,
  ],
  exports: [
    CommonModule
  ]
})
export class ToastModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ToastModule,
      providers: [
        ToastService,
      ]
    };
  }
}
