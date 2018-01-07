import { Component } from '@angular/core';
import { EditOptions } from '../../../../config/edit.config';
import { TSModalService } from './../../../../tools-ui';
import { ViewModalComponent } from './view-modal.component';


@Component({
    templateUrl: './editor.component.html',
})
export class EditorComponent {

    config = EditOptions;
    content = '文本内容';

    constructor(private modal: TSModalService) { }

    // 显示预览窗口
    showViewModal() {
        this.modal.create(ViewModalComponent);
        this.modal.modal.instance.content = this.content;
        this.modal.open().next(() => { });
    }
}
