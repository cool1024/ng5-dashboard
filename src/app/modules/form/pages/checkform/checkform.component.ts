import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RegExpService } from '../../../../dashboard/services/regexp.service';

@Component({
    templateUrl: './checkform.component.html',
    styleUrls: ['./checkform.component.css']
})
export class CheckFormComponent {

    constructor(private regexp: RegExpService) { }

    isValid(param: string, type: string): boolean {
        return this.regexp.isRight(param, type);
    }

    // 生成正则表达式
    createRegexp(regex: string): RegExp {
        try {
            if (regex[0] === '/') {
                const regexs = regex.split('/');
                regexs.shift();
                const flags = regexs.pop();
                const regexStr = regexs.join('/');
                return new RegExp(regex, flags);
            } else {
                return new RegExp(regex, 'g');
            }
        } catch (e) {
            return null;
        }
    }

    // 测试正则匹配
    doTest(regexpStr: string, testStr: string, messageInput: NgModel) {
        const regexp = this.createRegexp(regexpStr);
        console.log(regexp);
        messageInput.reset(regexp === null ? '正则表达式错误' : regexp.test(testStr));
    }
}
