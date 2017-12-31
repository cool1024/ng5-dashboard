
import { Component } from '@angular/core';
@Component({
  selector: 'ts-spinner',
  template: `
  <div id="loading" class="bg-info">
    <div id="loading-center">
        <div id="loading-center-absolute">
            <div class="object" id="object_four"></div>
            <div class="object" id="object_three"></div>
            <div class="object" id="object_two"></div>
            <div class="object" id="object_one"></div>
        </div>
    </div>
  </div>
  `,
})
export class SpinnerComponent { }
