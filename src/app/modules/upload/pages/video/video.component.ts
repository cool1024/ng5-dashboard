import { Component } from '@angular/core';
import { VideoConfig, TSUploadingProgress, TSUploadResult } from './../../../../tools-ui';
import { Observable } from 'rxjs/Observable';
declare const XLSX: any;

@Component({
  templateUrl: './video.component.html',
})
export class VideoComponent {

  defaultConfig: VideoConfig = {
    useUploader: true,
    uploaderTitle: '确认上传',
    uploader: new Observable<TSUploadingProgress | TSUploadResult>(obs => {
      let loaded = 0;
      // 模拟上传过程
      const timer = setInterval(() => {
        const ready = loaded >= 100;
        obs.next(new TSUploadingProgress(false, loaded++));
        if (ready) {
          clearInterval(timer);
          // 上传结束，获取视频的访问链接
          obs.next(new TSUploadResult('http://ng.cool1024.com/mmd.mp4', true, '上传成功'));
          obs.complete();
        }
      }, 100);
    })
  };

  autoConfig: VideoConfig = {
    auto: true,
    uploaderTitle: '上传视频',
    uploader: new Observable<TSUploadingProgress | TSUploadResult>(obs => {
      let loaded = 0;
      // 模拟上传过程
      const timer = setInterval(() => {
        const ready = loaded >= 100;
        obs.next(new TSUploadingProgress(false, loaded++));
        if (ready) {
          clearInterval(timer);
          // 上传结束，获取视频的访问链接
          obs.next(new TSUploadResult('http://ng.cool1024.com/mmd.mp4', true, '上传成功'));
          obs.complete();
        }
      }, 100);
    })
  };

  file: File;

  testExcel(file: File) {
    const reader = new FileReader();
    reader.addEventListener('load', event => {
      console.log(event);
      const data = new Uint8Array(reader.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const result = {};
      workbook.SheetNames.forEach(function (sheetName) {
        const roa = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
        if (roa.length) { result[sheetName] = roa; }
      });
      const jsonString = JSON.stringify(result);
      console.log(jsonString);
    });
    reader.readAsArrayBuffer(file);
  }
}
