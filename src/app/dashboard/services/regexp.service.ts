import { Injectable } from '@angular/core';

@Injectable()
export class RegExpService {

    private types = {
        price: /^(0|([1-9]\d{0,9}(\.\d{1,2})?))$/,
        integer: /^(0|[1-9]\d*)$/,
        code: /^\d{6}$/,
        email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    };

    constructor() { }

    isRight(param: string | number, type: string) {
        if (param === undefined || param === null) {
            // console.error(type, 'param is invalid');
            return false;
        }
        param = param.toString();
        if (this.types.hasOwnProperty(type)) {
            return this.types[type].test(param);
        } else {
            console.error(type, ' is not exists');
            return false;
        }
    }

    getRegExp(type: string): RegExp {
        if (this.types.hasOwnProperty(type)) {
            return this.types[type];
        } else {
            console.error(type, ' is not exists');
            // 返回一个什么都不匹配的正则
            return /.^/;
        }
    }

}
