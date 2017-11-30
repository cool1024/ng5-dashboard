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

  theads: string[] = [];
  tbodys: { [key: string]: string }[] = [];

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
          // const test = roa;
          // const temp = {};
          // test.forEach(element => {
          //   if (element['知识层级（一级）']) {
          //     temp[element['知识层级（一级）']] = {};
          //   }
          // });

          // let level_1 = '';

          // test.forEach(element => {
          //   if (element['知识层级（一级）']) {
          //     level_1 = element['知识层级（一级）'];
          //   }
          //   if (element['知识层级（二级）']) {
          //     temp[level_1][element['知识层级（二级）']] = new Array<string>();
          //   }
          // });

          // let level_2 = '';

          // test.forEach(element => {
          //   if (element['知识层级（一级）']) {
          //     level_1 = element['知识层级（一级）'];
          //   }
          //   if (element['知识层级（二级）']) {
          //     level_2 = element['知识层级（二级）'];
          //   }
          //   temp[level_1][level_2].push(element['知识层级（三级）']);
          // });

          // console.log(JSON.stringify(temp));
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
  // readExcel(file: File) {
  //   this.theads = [];
  //   const reader = new FileReader();
  //   reader.addEventListener('load', event => {
  //     const data = new Uint8Array(reader.result);
  //     const workbook = XLSX.read(data, { type: 'array' });
  //     const result = new Array<any>();
  //     if (workbook.SheetNames.length !== 2) {
  //       console.error('error excel file');
  //     }
  //     workbook.SheetNames.forEach(sheetName => {
  //       console.log('reade' + sheetName);
  //       const worksheet = workbook.Sheets[sheetName];
  //       const desired_cell = worksheet['A1'];
  //       console.log(worksheet);
  //       console.log(desired_cell);
  //     });
  //   });
  //   reader.readAsArrayBuffer(file);
  // }
}
