import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpConfig } from '../../config/http.config';
declare const window: any;

@Injectable()
export class SignInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // 不处理提交FormData的请求
        if (req.body instanceof FormData) {
            return next.handle(req);
        }

        const sha = new window.jsSHA('SHA-1', 'TEXT');
        const crypt = new window.JSEncrypt();

        // 获取所有的url参数,签名时使用，GET参数不予加密
        const params = [HttpConfig.SIGN_KEY];
        req.params.keys().forEach(key => {
            params.push(req.params.get(key));
        });

        // 获取body参数，并加密，FormData不加密&不参与签名
        if (req.body !== undefined && req.body !== null) {
            const body: { [key: string]: string } = {};
            crypt.setKey(HttpConfig.RSA_PUBLIC_KEY);
            for (const key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    let param = req.body[key];
                    if (param === null) { break; }
                    params.push(param);
                    // 加密
                    param = crypt.encrypt(param.toString());
                    body[key] = param;
                }
            }
            req = req.clone({ body: body });
        }

        // 生成签名
        params.sort();
        sha.update(params.join());
        const sign = sha.getHash('HEX');
        req = req.clone({ headers: req.headers.append('ng-params-four', sign) });
        return next.handle(req);
    }
}
