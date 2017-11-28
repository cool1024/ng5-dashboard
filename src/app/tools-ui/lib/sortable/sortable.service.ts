import { Injectable } from '@angular/core';
import { Task } from './../../classes/task.class';
declare const window: any;

@Injectable()
export class SortableService {
    load(src?: string): Task {
        return new Task(handle => {
            if (window.Sortable) {
                handle.ready();
            } else {
                const s = document.createElement('script');
                s.src = src || '/assets/lib/sortable.js';
                document.head.appendChild(s);
                s.onload = () => { handle.ready(); };
            }
        });
    }
    prevload(src?: string) {
        if (!window.Sortable) {
            const s = document.createElement('script');
            s.src = src || '/assets/lib/sortable.js';
            document.head.appendChild(s);
        }
    }
}
