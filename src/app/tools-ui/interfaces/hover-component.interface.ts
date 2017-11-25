import { ElementRef } from '@angular/core';

export interface HoverComponent {
    hover(): void;
    leave(): void;
    bind(elementRef: ElementRef): void;
}
