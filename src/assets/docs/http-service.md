# RequestService <span class="badge badge-primary">INJECTABLE</span>
----------------------
<table class="table table-bordered">
    <tbody>
        <tr>
            <th scope="row" class="w-25">导入方式</th>
            <td>
                <code>import { RequestService } from './&lt;path&gt;/dashboard/services/request.service';
                </code>
            </td>
        </tr>
        <tr>
            <th scope="row" class="w-25">文件路径</th>
            <td class="text-primary">app/dashboard/service/request.service.service.ts</td>
        </tr>
    </tbody>
</table>

#### 引入服务到页面组件中
```typescript
import { Component, OnInit } from '@angular/core';
import { RequestService } from './dashboard/services/request.service';

@Component({
  templateUrl: './simple.component.html',
})
export class SimpleComponent implements OnInit {

     constructor(private requestService: RequestService) { }

     ngOnInit() {

     }
}
```