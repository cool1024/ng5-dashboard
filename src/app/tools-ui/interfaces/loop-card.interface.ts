import { SafeResourceUrl } from '@angular/platform-browser';

export interface LoopCard {
    id: number;
    url: string;
    src: string | SafeResourceUrl;
    active?: boolean;
    file?: File;
}
