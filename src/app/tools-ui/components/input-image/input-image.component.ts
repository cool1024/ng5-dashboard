
import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageConfig } from './../../interfaces/image-config.interface';

@Component({
  selector: 'ts-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.css']
})

export class InputImageComponent implements OnChanges {

  @Input() config: ImageConfig;
  @Input() src: string | SafeResourceUrl;
  @Input() openBtnClassName: string;
  @Input() uploadBtnClassName: string;
  @Input() removeBtnClassName: string;
  @Input() resetBtnClassName: string;
  @Input() openTitle: string;
  @Input() imageStyle: { [key: string]: string };

  @Output() onChange = new EventEmitter<{ file: File, image: string | SafeResourceUrl }>();

  @ViewChildren('img_pad') img_pad: HTMLImageElement;

  showImage = false;
  isLoading = false;
  hasUpload = true;
  default: string;

  get uploaderTitle(): string { return this.config ? (this.config.uploaderTitle || '') : ''; }

  get autoUpload(): boolean { return this.config ? (this.config.auto || false) : false; }

  get useUploader(): boolean { return this.config ? (this.config.useUploader || false) : false; }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src && changes.src.firstChange) { this.default = changes.src.currentValue; }
  }

  changeFile(img: HTMLImageElement, files: File[]) {
    this.hasUpload = false;
    this.isLoading = false;
    if (files.length > 0) {
      this.onChange.emit({ file: files[0], image: this.src });
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(files[0]));
      this.showImage = true;
      if (!!this.config && this.config.auto) {
        this.uploadImage();
      }
    }
  }

  resetInput(input: HTMLInputElement) {
    this.showImage = false;
    this.isLoading = false;
    this.hasUpload = true;
    input.value = '';
    this.src = this.default;
    this.onChange.emit({ file: null, image: this.src });
  }

  cleanInput(input: HTMLInputElement) {
    this.src = ''; this.showImage = false;
    this.isLoading = false;
    this.hasUpload = true;
    input.value = ''; this.onChange.emit({ file: null, image: '' });
  }

  uploadImage() {
    if (this.hasUpload === true) { return; }
    this.hasUpload = true;
    this.isLoading = true;
    if (this.config.uploader !== undefined || this.config.uploader != null) {
      this.config.uploader.subscribe(result => {
        if (result.result === true) {
          this.isLoading = false;
          this.src = result.source;
        } else {
          this.hasUpload = false;
        }
      });
    }
  }
}
