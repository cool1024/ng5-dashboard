import { Injectable } from '@angular/core';
import { HttpConfig } from '../../config/http.config';
declare const window: any;

@Injectable()
export class SignService {

    private sha: any;

    constructor() {
        if (window.jsSHA !== undefined && window.jsSHA !== null) {
            this.sha = new window.jsSHA('SHA-1', 'TEXT');
        }
    }

    signParams(params: { [key: string]: number | string } | any[]): string {
        const signParams = [HttpConfig.SIGN_KEY];
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                signParams.push(key);
            }
        }
        signParams.sort();
        this.sha.update(signParams.join());
        return this.sha.getHash('HEX');
    }
}
