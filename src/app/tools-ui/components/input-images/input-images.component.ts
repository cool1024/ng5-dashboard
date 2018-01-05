import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { ImageConfig } from './../../interfaces/image-config.interface';
import { TSInputImages } from './../../classes/upload.class';

@Component({
    selector: 'ts-images',
    templateUrl: './input-images.component.html',
    styleUrls: ['./input-images.component.css']
})
export class InputImagesComponent implements OnChanges {

    @Input() src: string;
    @Input() openBtnClassName: string;
    @Input() resetBtnClassName: string;
    @Input() openTitle: string;
    @Input() resetTitle: string;
    @Input() imageStyle: { [key: string]: string };
    @Input() config: ImageConfig;

    @Output() srcChange = new EventEmitter<string>(false);
    @Output() fileChange = new EventEmitter<TSInputImages>(false);

    images = new TSInputImages();

    constructor() {
        this.src = '';
        this.config = {
            source: '',
            auto: false,
        };
    }

    ngOnChanges(change: SimpleChanges) {
        this.images = new TSInputImages(this.src);
    }

    changeFile(files: File[]) {
        for (let i = 0; i < files.length; i++) {
            const url = window.URL.createObjectURL(files[i]);
            this.images.push({ type: 'file', file: files[i], url, uploading: this.config.auto });
            this.fileChange.emit(this.images);
        }
        if (this.config.auto) { this.uploadImage(); }
    }

    getUrl(image: { type: string, file: File, url: string, uploading: boolean }) {
        if (image.type === 'file') {
            return `url(${image.url})`;
        } else {
            return `url(${image.url ? this.config.source + image.url : ''}`;
        }
    }

    removeImage(index: number) {
        this.images.remove(index);
        this.fileChange.emit(this.images);
    }

    uploadImage() {
        if (this.config.hasOwnProperty('uploadeFunc')) {
            const fileItems = this.images.fileItems;
            for (let i = 0; i < fileItems.length; i++) {
                this.config.uploadeFunc(fileItems[i].file).subscribe(res => {
                    if (res.result) {
                        fileItems[i].type = 'url';
                        fileItems[i].uploading = false;
                        fileItems[i].file = null;
                        fileItems[i].url = res.source;
                        this.srcChange.emit(this.images.urls.join());
                    }
                });
            }
        }
    }

    resetInput(input: HTMLInputElement) {
        this.images = new TSInputImages(this.src);
        input.value = '';
    }
}
