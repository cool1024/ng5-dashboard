import { Component } from '@angular/core';
import { EditOptions } from '../../../../config/edit.config';
import { TSModalService } from './../../../../tools-ui';
import { ViewModalComponent } from './view-modal.component';


@Component({
    templateUrl: './editor.component.html',
})
export class EditorComponent {

    config = <any>EditOptions;
    content = `<pre style="text-align: center;"><span style="font-size: 36px;">这是一个富文本编辑器</span></pre>
    <p><a href="http://www.cool1024.com" rel="noopener noreferrer" target="_blank"><img src="http://139.129.161.216/upload/fc699c094126ee4800ac2a336dc9d7be.jpg" class="fr-fic fr-dib"></a></p>
    <p><img src="http://ts.cool1024.com/upload/319d3234ef2791d6dcf0a59372b2f1cf.jpg" class="fr-fic fr-dib"></p>`;

    constructor(private modal: TSModalService) {
        this.config.imageUploadParams = {
            'ng-params-one': 'NjE=',
            'ng-params-three': 'admin',
            'ng-params-two': 'YmU5MDA2OTE4NzZlMzRmNzJlMDE5MzExMWVlNWI3NGI0MWYwYTkyOQ==',
        };
    }

    // 显示预览窗口
    showViewModal() {
        this.modal.create(ViewModalComponent);
        this.modal.modal.instance.content = this.content;
        this.modal.open().next(() => { });
    }
}
