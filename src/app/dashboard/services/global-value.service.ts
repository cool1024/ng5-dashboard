import { Injectable } from '@angular/core';

@Injectable()
export class GlobalValueService {

    private params: { [key: string]: string | number | boolean } = {};

    // 提供一些全局默认参数
    get values(): { [key: string]: string | number | boolean } {
        return this.params;
    }

    // 修改全局默认参数
    setValue(key: string, value: string | number | boolean) {
        this.params[key] = value;
    }
}
