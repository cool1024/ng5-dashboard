import { Directive, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: `input[ts-file]`,
  exportAs: 'tsFile'
})
export class InputFileDirective implements AfterViewInit {

  @Output() fileChange = new EventEmitter<File>();

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.display = 'none';
    this.elementRef.nativeElement.addEventListener('change', event => {
      this.fileChange.emit(event.target.files[0]);
    });
  }

  openFileDialog() {
    this.elementRef.nativeElement.click();
  }

  removeFile() {
    this.elementRef.nativeElement.value = '';
    this.fileChange.emit(null);
  }

}
