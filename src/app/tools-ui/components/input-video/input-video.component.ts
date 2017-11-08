import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoConfig } from './../../interfaces/video-config.interface';
import { TSUploadingProgress, TSUploadResult } from './../../classes/upload.class';

@Component({
  selector: 'ts-video',
  templateUrl: './input-video.component.html',
})
export class InputVideoComponent implements OnChanges {

  constructor(private sanitizer: DomSanitizer) { }

  @Input() src: string | SafeResourceUrl;

  @Input() videoStyle: any;

  @Input() btnClass: string;

  @Input() title: string;

  @Input() config: VideoConfig;

  @Output() onChange = new EventEmitter<File>();

  showVideo = false;

  showLoading = false;

  hasUpload = false;

  loaded = '0%';

  get uploaderTitle(): string { return this.config ? (this.config.uploaderTitle || '') : ''; }

  get autoUpload(): boolean { return this.config ? (this.config.auto || false) : false; }

  get useUploader(): boolean { return this.config ? (this.config.useUploader || false) : false; }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src) {
      this.showVideo = true;
      this.src = !changes.src.firstChange ? changes.src.currentValue : this.src;
    }
  }

  changeFile(files: File[]) {
    if (files.length > 0) {
      this.onChange.emit(files[0]);
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(files[0]))
      this.showVideo = true;
      this.hasUpload = false;
      this.showLoading = false;
      if (!!this.config && this.config.auto === true) {
        this.tryUpload();
      }
    }
  }

  cleanInput() {
    this.src = '';
    this.showVideo = false;
    this.hasUpload = true;
    this.showLoading = false;
    this.onChange.emit(null);
  }

  tryUpload() {
    if (this.hasUpload === true) { return; }
    this.hasUpload = true;
    this.loaded = '0%';
    if (this.config.uploader !== undefined || this.config.uploader != null) {
      this.config.uploader.subscribe(result => {
        if (result instanceof TSUploadingProgress) {
          this.showLoading = true;
          console.log(1);
          this.loaded = result.loaded + '%';
        }
        if (result instanceof TSUploadResult) {
          if (result.result === true) {
            this.src = result.source;
            this.showLoading = false;
          } else {
            this.loaded = result.message;
            this.hasUpload = false;
          }
        }
      });
    }
  }
}
