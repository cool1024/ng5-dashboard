import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/skipWhile';
import { ApiData } from '../classes/api.class';
import { HttpConfig } from '../../config/http.config';

@Injectable()
export class RequestService {

    private server_url: string;
    private coverHeader: boolean;
    private appedHeaders: { [key: string]: string };

    constructor(private http: HttpClient) {
        this.server_url = HttpConfig.SERVER_URL;
        this.coverHeader = false;
    }

    // 发送一个get请求（获取文本文件内容）
    text(url: string): Observable<string> {
        return this.http.request('get', this.server_url + url, { responseType: 'text' });
    }

    // 发送一个get请求不带参数)
    url(url: string, check = true): Observable<ApiData> {
        const observable = this.http.get<ApiData>(this.server_url + url, { headers: this.getHeaders() });
        return check ? observable.skipWhile(res => res.result === false) : observable;
    }

    // 发送一个get请求(可带参数)
    get(url: string, params?: { [key: string]: number | string } | boolean, check = true): Observable<ApiData> {
        if (typeof params === 'boolean') {
            check = <boolean>params;
            params = {};
        }
        const observable = this.http.get<ApiData>(this.server_url + url, { headers: this.getHeaders(), params: this.getParams(params) });
        return check ? observable.skipWhile(res => res.result === false) : observable;
    }

    // 发送一个post请求(可带参数)
    post(url: string, params?: { [key: string]: number | string } | boolean, check = true): Observable<ApiData> {
        if (typeof params === 'boolean') {
            check = <boolean>params;
            params = {};
        }
        const observable = this.http.post<ApiData>(this.server_url + url, null, { headers: this.getHeaders(), params: this.getParams(params) });
        return check ? observable.skipWhile(res => res.result === false) : observable;
    }

    // 发送一个put请求(可带参数)
    put(url: string, params?: { [key: string]: number | string } | boolean, check = true): Observable<ApiData> {
        if (typeof params === 'boolean') {
            check = <boolean>params;
            params = {};
        }
        const observable = this.http.put<ApiData>(this.server_url + url, null, { headers: this.getHeaders(), params: this.getParams(params) });
        return check ? observable.skipWhile(res => res.result === false) : observable;
    }

    // 发送一个delete请求(可带参数)
    delete(url: string, params?: { [key: string]: number | string } | boolean, check = true): Observable<ApiData> {
        if (typeof params === 'boolean') {
            check = <boolean>params;
            params = {};
        }
        const observable = this.http.delete<ApiData>(this.server_url + url, { headers: this.getHeaders(), params: this.getParams(params) });
        return check ? observable.skipWhile(res => res.result === false) : observable;
    }

    // 发送一个post请求，可附带文件（用于文件上传）
    files(url: string, params: { [key: string]: number | string },
        files: Array<{ name: string, files: Array<File> }>, check = true): Observable<ApiData> {
        const observable = this.http.post<ApiData>(
            this.server_url + url, this.getFormdata(params, files), { headers: this.getHeaders(), params: this.getParams(params) });
        return check ? observable.skipWhile(res => res.result === false) : observable;
    }

    // 发送一个post请求，可附带文件（用于文件上传，提供上传进度）
    upload(url: string, files: Array<{ name: string, files: Array<File> }>, onprogress: (value: number) => void, final: (value: any) => void) {
        const req = new HttpRequest('POST', this.server_url + url, this.getFormdata({}, files), {
            reportProgress: true,
        });
        this.http.request(req).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                const percentDone = Math.round(100 * event.loaded / event.total);
                onprogress(percentDone);
            } else if (event instanceof HttpResponse) {
                final(event);
            }
        });
    }

    // 重置一个reqeust服务,添加自定义请求头
    withHeader(headers: { [key: string]: string }, cover = false): RequestService {
        const request = new RequestService(this.http);
        request.appedHeaders = headers;
        request.coverHeader = cover;
        return request;
    }

    // 重置一个reqeust服务,不带请求头
    withoutHeader(): RequestService {
        return this.withHeader({}, true);
    }

    // 重置一个reqeust服务,自定义参数
    withConfig(config: { url?: string, withoutHeader?: boolean, headers?: { [key: string]: string }, cover?: boolean }): RequestService {
        const request = new RequestService(this.http);
        if (config.url != null || config !== undefined) {
            request.server_url = config.url;
        }
        if (config.headers != null || config !== undefined) {
            request.appedHeaders = config.headers;
        }
        if (config.cover) {
            request.coverHeader = config.cover;
        }
        if (config.withoutHeader) {
            request.appedHeaders = {};
            request.coverHeader = true;
        }
        return request;
    }

    private getHeaders(): HttpHeaders {
        let header = new HttpHeaders();
        if (this.appedHeaders) {
            for (const key in this.appedHeaders) {
                if (this.appedHeaders.hasOwnProperty(key)) {
                    header = header.append(key, this.appedHeaders[key]);
                }
            }
        }
        if (this.coverHeader === false) {
            header = header.append('ng-params-one', '123456789');
        }
        return header;
    }

    private getParams(params: { [key: string]: number | string }): HttpParams {
        let httpParams = new HttpParams();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                if (typeof params[key] === 'number') {
                    params[key] = params[key].toString();
                }
                console.log(key);
                httpParams = httpParams.append(key, <string>params[key]);
            }
        }
        return httpParams;
    }

    private getFormdata(params: { [key: string]: number | string }, filesArray = new Array<{ name: string, files: Array<File> }>()) {
        const formdata = new FormData();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                if (typeof params[key] === 'number') {
                    params[key] = params[key].toString();
                }
                formdata.append(key, <string>params[key]);
            }
        }
        for (const key in filesArray) {
            if (filesArray.hasOwnProperty(key)) {
                const files = filesArray[key];
                for (let i = 0; i < files.files.length; i++) {
                    formdata.append(files.name, files.files[i]);
                }
            }
        }
        return formdata;
    }
}
