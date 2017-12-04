import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/skipWhile';

import { ApiData } from '../classes/api.class';
import { HttpConfig } from '../../config/http.config';
@Injectable()
export class RequestService {

    private server_url: string;

    constructor(private http: HttpClient) {
        this.server_url = HttpConfig.SERVER_URL;
    }

    // 发送一个get请求（永恒获取文本文件内容）
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
        const observable = this.http.post<ApiData>(this.server_url + url, { headers: this.getHeaders(), params: this.getParams(params) });
        return check ? observable.skipWhile(res => res.result === false) : observable;
    }

    // 发送一个put请求(可带参数)
    put(url: string, params?: { [key: string]: number | string } | boolean, check = true): Observable<ApiData> {
        if (typeof params === 'boolean') {
            check = <boolean>params;
            params = {};
        }
        const observable = this.http.put<ApiData>(this.server_url + url, { headers: this.getHeaders(), params: this.getParams(params) });
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
    files(url: string, params: { [key: string]: number | string }, files = new Array<{ name: string, files: Array<File> }>(), check = true) {
        const observable = this.http.post<ApiData>(
            this.server_url + url, this.getFormdata(params, files), { headers: this.getHeaders(), params: this.getParams(params) });
        return check ? observable.skipWhile(res => res.result === false) : observable;
    }

    private getHeaders(): HttpHeaders {
        let header = new HttpHeaders();
        header = header.append('ng-params-one', '123456789');
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
