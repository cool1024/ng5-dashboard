import { Component } from '@angular/core';
import { VideoConfig, TSUploadingProgress, TSUploadResult } from './../../../../tools-ui';
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../../../../dashboard/services/request.service';
import { Subject } from 'rxjs/Subject';
import { ApiData } from '../../../../dashboard/classes/api.class';
import { HttpConfig } from '../../../../config/http.config';
declare const XLSX: any;

@Component({
    templateUrl: './video.component.html',
})
export class VideoComponent {

    // 音频自动上传配置
    autoAudioConfig: VideoConfig = {
        auto: true,
        useUploader: true,
        source: HttpConfig.SOURCE_URL + '/',
        uploadeFunc: file => {
            const sub = new Subject<TSUploadingProgress | TSUploadResult>();
            this.request.upload('/tool/audio', [{ name: 'audio', files: [file] }], percentDone => {
                console.log(percentDone);
                sub.next(new TSUploadingProgress(false, percentDone));
            }, res => {
                if (res.result) {
                    sub.next(new TSUploadResult(res.datas, true, '上传成功'));
                } else {
                    sub.next(new TSUploadResult('', false, '上传失败'));
                }
                sub.complete();
                sub.unsubscribe();
            });
            return sub.asObservable();
        }
    };

    // 视频自动上传配置
    defaultVideoConfig: VideoConfig = {
        uploaderTitle: '上传视频',
        useUploader: true,
        source: HttpConfig.SOURCE_URL + '/',
        uploadeFunc: file => {
            const sub = new Subject<TSUploadingProgress | TSUploadResult>();
            this.request.upload('/tool/video', [{ name: 'video', files: [file] }], percentDone => {
                console.log(percentDone);
                sub.next(new TSUploadingProgress(false, percentDone));
            }, res => {
                if (res.result) {
                    sub.next(new TSUploadResult(res.datas, true, '上传成功'));
                } else {
                    sub.next(new TSUploadResult('', false, '上传失败'));
                }
                sub.complete();
                sub.unsubscribe();
            });
            return sub.asObservable();
        }
    };
    file: File;
    theads: string[] = [];
    tbodys: { [key: string]: string }[] = [];
    video = 'upload/47e0b428f30fde9a0395b18e6db62ddd.mp4';
    audio = 'upload/c2d8f23c236f257039305cc263ec6439.mp3';

    constructor(private request: RequestService) { }

    readExcel(file: File) {
        this.theads = [];
        const reader = new FileReader();
        reader.addEventListener('load', event => {
            const data = new Uint8Array(reader.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const result = new Array<any>();
            workbook.SheetNames.forEach(sheetName => {
                const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                if (roa.length) {
                    result.push(roa);
                    console.log(JSON.stringify(roa));
                }
            });
            try {
                for (const key in result[0][0]) {
                    if (result[0][0].hasOwnProperty(key)) {
                        this.theads.push(key);
                    }
                }
                this.tbodys = result[0];
            } catch (error) {
                console.error(error);
            }
        });
        reader.readAsArrayBuffer(file);
    }
}
