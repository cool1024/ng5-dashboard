import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiData } from '../classes/api.class';
import { HttpConfig } from '../../config/http.config';

@Injectable()
export class RequestService {

    private server_url: string;

    constructor(private http: HttpClient) {
        this.server_url = HttpConfig.SERVER_URL;
    }

    // 发送一个get请求（永恒获取文本文件内容）
    text(url: string): Observable<any> {
        return this.http.request('get', this.server_url + url, { responseType: 'text' });
        // return this.http.get<ApiData>(this.server_url + url, { headers: this.getHeaders(), observe: 'response' });
    }

    // 发送一个get请求不带参数)
    url(url: string): Observable<ApiData> {
        return this.http.get<ApiData>(this.server_url + url, { headers: this.getHeaders() });
    }

    // 发送一个get请求(带参数)
    get(url: string, params: { [key: string]: number | string }): Observable<ApiData> {
        return this.http.get<ApiData>(this.server_url + url, { headers: this.getHeaders(), params: this.getParams(params) });
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
                httpParams = httpParams.append(key, <string>params[key]);
            }
        }
        return httpParams;
    }
}
