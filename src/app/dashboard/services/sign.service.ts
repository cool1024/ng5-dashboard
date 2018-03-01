import { Injectable } from '@angular/core';
import { HttpConfig } from '../../config/http.config';
declare const window: any;

@Injectable()
export class SignService {

    private sha: any;

    constructor() {
        if (window.jsSHA !== undefined && window.jsSHA !== null) {
            console.error('jsSHA undefined,please import sha1.js');
        }
    }

    signParams(params: { [key: string]: number | string } | any[]): string {
        this.sha = new window.jsSHA('SHA-1', 'TEXT');
        const signParams = [HttpConfig.SIGN_KEY];
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                signParams.push(params[key]);
            }
        }
        signParams.sort();
        this.sha.update(signParams.join());
        const sign = this.sha.getHash('HEX');
        return sign;
    }
}
