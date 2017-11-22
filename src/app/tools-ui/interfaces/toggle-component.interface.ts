import { ElementRef } from '@angular/core';

export interface ToggleComponent {
    toggle(): void;
    bind(elementRef: ElementRef): void;
}
