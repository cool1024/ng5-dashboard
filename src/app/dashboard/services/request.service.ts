import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/skipWhile';
import { ApiData } from '../classes/api.class';
import { HttpConfig } from '../../config/http.config';
import { AppConfig } from '../../config/app.config';
import { StorageService } from './storage.service';
import { ReconnectingWebSocket } from './../classes/websocket.class';

@Injectable()
export class RequestService {

    private server_url: string;
    private coverHeader: boolean;
    private appendHeaders: { [key: string]: string };

    constructor(private http: HttpClient, private storage: StorageService) {
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
        const observable = this.http.post<ApiData>(this.server_url + url, params, { headers: this.getHeaders() });
        return check ? observable.skipWhile(res => res.result === false) : observable;
    }

    // 发送一个put请求(可带参数)
    put(url: string, params?: { [key: string]: number | string } | boolean, check = true, final?: () => void): Observable<ApiData> {
        if (typeof params === 'boolean') {
            check = <boolean>params;
            params = {};
        }
        const observable = this.http.put<ApiData>(this.server_url + url, params, { headers: this.getHeaders() });
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
            this.server_url + url, this.getFormdata(params, files), { headers: this.getHeaders() });
        return check ? observable.skipWhile(res => res.result === false) : observable;
    }

    // 发送一个post请求，可附带文件（用于文件上传，提供上传进度）
    upload(url: string, files: Array<{ name: string, files: Array<File> }>,
        onprogress: (value: number) => void, final: (value: ApiData) => void) {
        const req = new HttpRequest('POST', this.server_url + url, this.getFormdata({}, files), {
            headers: this.getHeaders(),
            reportProgress: true,
        });
        this.http.request(req).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                const percentDone = Math.round(100 * event.loaded / event.total);
                onprogress(percentDone);
            } else if (event instanceof HttpResponse) {
                final(<ApiData>event.body);
            }
        });
    }

    // Websocket
    websocket(host: string, protocols: string | string[], options = {}): ReconnectingWebSocket {
        return new ReconnectingWebSocket(host, protocols, options);
    }

    // 重置一个reqeust服务,添加自定义请求头
    withHeader(headers: { [key: string]: string }, cover = false): RequestService {
        const request = new RequestService(this.http, this.storage);
        request.appendHeaders = headers;
        request.coverHeader = cover;
        return request;
    }

    // 重置一个reqeust服务,不带请求头
    withoutHeader(): RequestService {
        return this.withHeader({}, true);
    }

    // 重置一个reqeust服务,自定义参数
    withConfig(config: { url?: string, withoutHeader?: boolean, headers?: { [key: string]: string }, cover?: boolean }): RequestService {
        const request = new RequestService(this.http, this.storage);
        if (config.url != null || config !== undefined) {
            request.server_url = config.url;
        }
        if (config.headers != null || config !== undefined) {
            request.appendHeaders = config.headers;
        }
        if (config.cover) {
            request.coverHeader = config.cover;
        }
        if (config.withoutHeader) {
            request.appendHeaders = {};
            request.coverHeader = true;
        }
        return request;
    }

    // 启用签名加密
    openSafeParams() {

    }

    private getHeaders(): HttpHeaders {
        let header = new HttpHeaders();
        if (this.appendHeaders) {
            for (const key in this.appendHeaders) {
                if (this.appendHeaders.hasOwnProperty(key)) {
                    header = header.append(key, this.appendHeaders[key]);
                }
            }
        }
        if (this.coverHeader === false) {
            AppConfig.tokenParams.forEach(key => {
                header = header.append(key, this.storage.get(key));
            });
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
