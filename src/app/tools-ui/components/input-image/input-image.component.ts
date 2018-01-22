
import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChildren } from '@angular/core';
import { ImageConfig } from './../../interfaces/image-config.interface';

@Component({
    selector: 'ts-image',
    templateUrl: './input-image.component.html',
    styleUrls: ['./input-image.component.css']
})

export class InputImageComponent implements OnChanges {

    @Input() config: ImageConfig;
    @Input() src: string | { blobUrl: string };
    @Input() openBtnClassName: string;
    @Input() uploadBtnClassName: string;
    @Input() removeBtnClassName: string;
    @Input() resetBtnClassName: string;
    @Input() openTitle: string;
    @Input() imageStyle: { [key: string]: string };

    @Output() fileChange = new EventEmitter<File>(false);
    @Output() srcChange = new EventEmitter<string>(false);

    showImage = false;
    isLoading = false;
    hasUpload = true;
    default: string;
    file: File;


    get uploaderTitle(): string { return this.config ? (this.config.uploaderTitle || '') : ''; }

    get autoUpload(): boolean { return this.config ? (this.config.auto || false) : false; }

    get useUploader(): boolean { return this.config ? (this.config.useUploader || false) : false; }

    get source(): string { return this.config ? (this.config.source || '') : ''; }

    get realSrc(): string {
        return typeof this.src === 'string' ? this.source + this.src : this.src.blobUrl;
    }

    constructor() {
        this.default = '';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.src && !this.default) { this.default = changes.src.currentValue; }
    }

    getUrl() {
        return `url(${this.realSrc})`;
    }

    changeFile(files: File[]) {
        this.hasUpload = false;
        this.isLoading = false;
        this.file = files[0];
        if (files.length > 0) {
            this.fileChange.emit(files[0]);
            this.src = { blobUrl: window.URL.createObjectURL(files[0]) };
            this.showImage = true;
            if (!!this.config && this.config.auto) {
                this.uploadFile();
            }
        }
    }

    resetInput(input: HTMLInputElement) {
        this.showImage = false;
        this.isLoading = false;
        this.hasUpload = true;
        this.file = null;
        input.value = '';
        this.src = this.default || '';
        this.srcChange.emit(this.src);
    }

    cleanInput(input: HTMLInputElement) {
        this.src = '';
        this.showImage = false;
        this.isLoading = false;
        this.hasUpload = true;
        this.file = null;
        input.value = '';
        this.srcChange.emit(this.src);
    }

    uploadFile() {
        if (this.hasUpload === true) { return; }
        if (this.file === null || this.file === undefined) { return; }
        this.hasUpload = true;
        this.isLoading = true;
        if (this.config.uploadeFunc !== undefined || this.config.uploadeFunc !== null) {
            this.config.uploadeFunc(this.file).subscribe(result => {
                if (result.result === true) {
                    this.isLoading = false;
                    this.src = result.source;
                    this.srcChange.emit(result.source);
                } else {
                    this.hasUpload = false;
                }
            });
        }
    }
}
