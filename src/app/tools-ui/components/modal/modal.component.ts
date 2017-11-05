import { Component, Input, Output, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { ModalDirective } from './modal.directive';

@Component({
  selector: 'ts-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @ViewChild('pad') pad: any
  @ViewChild(ModalDirective) modalHost: ModalDirective;

  show: boolean

  size: string

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.show = false
    this.size = ''
  }

  loadComponent(content: any): ComponentRef<any> {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(content)

    const viewContainerRef = this.modalHost.viewContainerRef

    viewContainerRef.clear()

    const componentRef = viewContainerRef.createComponent(componentFactory)

    return componentRef

  }

  open() {
    this.show = true
  }

  close() {
    this.show = false
  }

  tryClose(event) {
    if (event.target === this.pad.nativeElement) {
      this.close()
    }
  }

}
