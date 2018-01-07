import { Component } from '@angular/core';
import { TSModalService } from './../../../../tools-ui';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    template: `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">预览结果</h5>
            <span  class="close pointer" (click)="dismiss()">
                &times;
            </span>
        </div>
        <div class="modal-body" style="height:600px;overflow:auto" [innerHTML]="htmlStr"></div>
        <div class="modal-footer">
            <button type="button" class="btn btn-white aaa" (click)="dismiss()">关闭窗口</button>
        </div>`,
    styleUrls: ['./view-modal.component.css']
})
export class ViewModalComponent {

    content: string;

    constructor(private modalService: TSModalService, private domSanitizer: DomSanitizer) { }

    get htmlStr(): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(this.content);
    }

    close() {
        this.modalService.close();
    }

    dismiss() {
        this.modalService.dismiss();
    }
}
