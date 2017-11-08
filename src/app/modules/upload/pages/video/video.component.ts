import { Component } from '@angular/core';
import { VideoConfig, TSUploadingProgress, TSUploadResult } from './../../../../tools-ui';
import { Observable } from 'rxjs/Observable';

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
}
