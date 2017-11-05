import { Component, OnInit, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageConfig } from './../../interfaces/image-config.interface';
import { TSInputImages } from './../../classes/upload.class';

@Component({
  selector: 'ts-images',
  templateUrl: './input-images.component.html',
  styleUrls: ['./input-images.component.css']
})
export class InputImagesComponent implements OnInit {

  @Input() src: string;
  @Input() openBtnClassName: string;
  @Input() resetBtnClassName: string;
  @Input() openTitle: string;
  @Input() resetTitle: string;
  @Input() imageStyle: { [key: string]: string };
  @Input() config: ImageConfig;

  @Output() onChange = new EventEmitter<TSInputImages>();

  images = new TSInputImages();

  constructor(private sanitizer: DomSanitizer) {
    this.src = '';
  }

  ngOnInit() {
    this.images = new TSInputImages(this.src);
  }

  changeFile(files: File[]) {
    for (let i = 0; i < files.length; i++) {
      const url = window.URL.createObjectURL(files[i]);
      this.images.push({ type: 'file', file: files[i], url, uploading: false })
      this.onChange.emit(this.images);
    }
  }

  getUrl(url: string) {
    return `url(${url})`;
  }

  removeImage(index: number) {
    this.images.remove(index);
    this.onChange.emit(this.images);
  }

  uploadImage() {

  }

  resetInput(input: HTMLInputElement) {
    this.images = new TSInputImages(this.src);
    input.value = '';
  }
}
