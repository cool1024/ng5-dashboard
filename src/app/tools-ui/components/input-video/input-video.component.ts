import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoConfig } from './../../interfaces/video-config.interface';
import { TSUploadingProgress, TSUploadResult } from './../../classes/upload.class';

@Component({
    selector: 'ts-video',
    templateUrl: './input-video.component.html',
})
export class InputVideoComponent implements OnChanges {

    @Input() src: string | SafeResourceUrl;

    @Input() videoStyle: any;

    @Input() btnClass: string;

    @Input() progressColor: string;

    @Input() title: string;

    @Input() type: string;

    @Input() config: VideoConfig;

    @Output() fileChange = new EventEmitter<File>();

    @Output() srcChange = new EventEmitter<string>();

    showVideo = false;

    showLoading = false;

    hasUpload = false;

    loaded = '0%';

    file: File;

    get uploaderTitle(): string { return this.config ? (this.config.uploaderTitle || '') : ''; }

    get autoUpload(): boolean { return this.config ? (this.config.auto || false) : false; }

    get useUploader(): boolean { return this.config ? (this.config.useUploader || false) : false; }

    get source(): string { return this.config ? (this.config.source || '') : ''; }

    get realSrc(): string | SafeResourceUrl { return typeof this.src === 'string' ? this.source + this.src : this.src; }

    constructor(private sanitizer: DomSanitizer) {
        this.type = 'video';
        this.videoStyle = { 'width': '300px', 'height': '200px' };
        this.progressColor = 'dark';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.src && changes.src.currentValue) {
            console.log(changes.src);
            this.showVideo = true;
            this.src = !changes.src.firstChange ? changes.src.currentValue : this.src;
        }
    }

    changeFile(files: File[]) {
        if (files.length > 0) {
            this.file = files[0];
            this.fileChange.emit(files[0]);
            this.src = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(files[0]));
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
        this.file = null;
        this.fileChange.emit(null);
    }

    tryUpload() {
        if (this.hasUpload === true) { return; }
        if (this.file === null || this.file === undefined) { return; }
        this.hasUpload = true;
        this.loaded = '0%';
        if (this.config.uploadeFunc !== undefined || this.config.uploadeFunc != null) {
            this.config.uploadeFunc(this.file).subscribe(result => {
                if (result instanceof TSUploadingProgress) {
                    this.showLoading = true;
                    this.loaded = result.loaded + '%';
                }
                if (result instanceof TSUploadResult) {
                    if (result.result === true) {
                        this.src = result.source;
                        this.showLoading = false;
                        this.srcChange.emit(result.source);
                    } else {
                        this.loaded = result.message;
                        this.hasUpload = false;
                    }
                }
            });
        }
    }
}
