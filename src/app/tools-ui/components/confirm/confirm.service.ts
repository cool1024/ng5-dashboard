import { Injectable, Injector, ApplicationRef, ComponentFactoryResolver, ComponentRef, ComponentFactory } from '@angular/core';
import { ConfirmComponent } from './confirm.component';
import { Task } from './../../classes/task.class';

@Injectable()
export class ConfirmService {
    private baseComponent: ComponentFactory<ConfirmComponent>;
    private windowCmptRef: ComponentRef<ConfirmComponent>;

    constructor(private applicationRef: ApplicationRef, private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector) { }

    private init() {
        if (this.baseComponent !== undefined || this.baseComponent != null) { return; }
        this.baseComponent = this.componentFactoryResolver.resolveComponentFactory(ConfirmComponent);
        this.windowCmptRef = this.baseComponent.create(this.injector);
        this.applicationRef.attachView(this.windowCmptRef.hostView);
        const containerEl = document.querySelector('body');
        containerEl.appendChild(this.windowCmptRef.location.nativeElement);
    }

    create(
        title: string,
        message: string,
        options?: {
            bgColor?: string,
            cardClass?: string,
            closeClass?: string,
            btnClass?: string,
            okTitle?: string,
            cancelTitle?: string
        }): Task {
        this.init();
        this.windowCmptRef.instance.title = title;
        this.windowCmptRef.instance.message = message;
        if (options !== undefined && options != null) {
            this.windowCmptRef.instance.bgColor = options.bgColor || 'rgba(0,0,0,0.2)';
            this.windowCmptRef.instance.cardClass = options.cardClass || 'bg-primary text-white';
            this.windowCmptRef.instance.closeClass = options.closeClass || 'text-white';
            this.windowCmptRef.instance.btnClass = options.btnClass || 'text-white';
            if (options.okTitle) { this.windowCmptRef.instance.okTitle = options.okTitle; }
            if (options.cancelTitle) { this.windowCmptRef.instance.cancleTitle = options.cancelTitle; }
        }
        this.windowCmptRef.instance.play();
        return this.windowCmptRef.instance.getTask();
    }

    primary(title: string, message: string, options?: {
        bgColor?: string,
        okTitle?: string,
        cancelTitle?: string
        cardClass?: string
    }): Task {
        if (!options.cardClass) { options.cardClass = 'bg-primary text-white'; }
        return this.create(title, message, options);
    }

    secondary(title: string, message: string, options?: {
        bgColor?: string,
        okTitle?: string,
        cancelTitle?: string
        cardClass?: string
    }): Task {
        if (!options.cardClass) { options.cardClass = 'bg-secondary text-white'; }
        return this.create(title, message, options);
    }

    success(title: string, message: string, options?: {
        bgColor?: string,
        okTitle?: string,
        cancelTitle?: string
        cardClass?: string
    }): Task {
        if (!options.cardClass) { options.cardClass = 'bg-success text-white'; }
        return this.create(title, message, options);
    }

    danger(title: string, message: string, options?: {
        bgColor?: string,
        okTitle?: string,
        cancelTitle?: string
        cardClass?: string
    }): Task {
        if (!options.cardClass) { options.cardClass = 'bg-danger text-white'; }
        return this.create(title, message, options);
    }

    warning(title: string, message: string, options?: {
        bgColor?: string,
        okTitle?: string,
        cancelTitle?: string
        cardClass?: string
    }): Task {
        return this.create(title, message, {
            bgColor: options.bgColor || 'rgba(0,0,0,0.2)',
            cardClass: 'bg-warning',
            closeClass: 'text-dark',
            btnClass: 'text-dark',
            cancelTitle: options.cancelTitle,
            okTitle: options.okTitle
        });
    }
    info(title: string, message: string, options?: {
        bgColor?: string,
        okTitle?: string,
        cancelTitle?: string
        cardClass?: string
    }): Task {
        if (!options.cardClass) { options.cardClass = 'bg-info text-white'; }
        return this.create(title, message, options);
    }

    light(title: string, message: string, options?: {
        bgColor?: string,
        okTitle?: string,
        cancelTitle?: string
        cardClass?: string
    }): Task {
        return this.create(title, message, {
            bgColor: options.bgColor || 'rgba(0,0,0,0.2)',
            cardClass: 'bg-light',
            closeClass: 'text-dark',
            btnClass: 'text-dark',
            cancelTitle: options.cancelTitle,
            okTitle: options.okTitle
        });
    }

    dark(title: string, message: string, options?: {
        bgColor?: string,
        okTitle?: string,
        cancelTitle?: string
        cardClass?: string
    }): Task {
        if (!options.cardClass) { options.cardClass = 'bg-dark text-white'; }
        return this.create(title, message, options);
    }

}
