import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ApiData, HttpError } from '../classes/api.class';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .map(response => {
                if (response instanceof HttpResponse) {

                    if (response.body != null && response.body.result != null) {
                        const apiData = new ApiData(response.body.result, response.body.message, response.body.datas);
                        if (apiData.result === false) {
                            // this.toastrService.warning(apiData.message || ErrorMessages.API_DATA_ERROR, '操作失败')
                        }
                        response = response.clone({ body: apiData });
                    } else {
                        // this.toastrService.error(ErrorMessages.API_DATA_ERROR, '意外提示!')
                        // response = response.clone({ body: new ApiData(false, ErrorMessages.API_DATA_ERROR, response) });
                    }

                }
                return response;
            });
    }
}
