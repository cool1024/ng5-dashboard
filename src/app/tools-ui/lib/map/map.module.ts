import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapDirective } from './map.directive';
import { MapService } from './map.service';
import { MapConfig } from './map.config';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MapDirective
  ],
  exports: [
    MapDirective
  ]
})
export class MapModule {

  public static forRoot(appKey: string): ModuleWithProviders {
    return {
      ngModule: MapModule,
      providers: [
        { provide: MapConfig, useValue: { appKey } },
        MapService,
      ]
    };
  }

}
