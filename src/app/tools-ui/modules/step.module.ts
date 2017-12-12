import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from './../components/step/step.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        StepComponent,
    ],
    exports: [
        CommonModule,
        StepComponent,
    ]
})
export class StepModule { }
