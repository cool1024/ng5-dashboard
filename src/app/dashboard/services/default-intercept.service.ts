import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ApiData, HttpError } from '../classes/api.class';
import { HttpConfig } from '../../config/http.config';
import { TSToastService } from '../../tools-ui';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';


@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
    constructor(private toast: TSToastService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .timeout(HttpConfig.REQUEST_TIMEOUT)
            .catch(error => {
                let errorMessage = '';
                if (error instanceof HttpErrorResponse) {
                    console.log('response error');
                    errorMessage = HttpError.SERVER_ERROR;
                    this.toast.setTimeOut(HttpConfig.TOAST_ERROR_TIME).danger(error.statusText, errorMessage);
                } else {
                    console.log('timeout');
                    errorMessage = HttpError.TIMEOUT_ERROR;
                    this.toast.setTimeOut(HttpConfig.TOAST_ERROR_TIME).danger('请求超时', errorMessage);
                }
                return Observable.of<HttpEvent<string>>(new HttpResponse<string>({ body: new ApiData(false, errorMessage).toJsonString() }));
            })
            .map(response => {
                console.log(req.responseType);
                if (response instanceof HttpResponse) {
                    if (response.body != null && response.body.result != null) {
                        const apiData = new ApiData(response.body.result, response.body.message, response.body.datas);
                        if (apiData.result === false) {
                            console.log('api use error');
                            this.toast.setTimeOut(HttpConfig.TOAST_ERROR_TIME).warning('操作失败', apiData.messageStr);
                        }
                        response = response.clone({ body: apiData });

                    } else if (req.responseType !== 'text') {
                        console.log('response error');
                        response = response.clone({ body: new ApiData(false, HttpError.API_DATA_ERROR, response) });
                    }
                }
                return response;
            });
    }
}
