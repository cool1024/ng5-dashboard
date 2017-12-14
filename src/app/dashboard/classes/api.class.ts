export class ApiData {
    constructor(public result: boolean, public message: string | { [key: string]: string[] }, public datas?: any, public id?: number) { }
    toJsonString(): string {
        const json = {
            result: this.result || false,
            message: this.message || '',
            datas: this.datas || {},
            id: this.id || '',
        };
        return JSON.stringify(json);
    }
    get messageStr(): string {
        let message = '';
        if (typeof this.message !== 'string') {
            for (const key in this.message) {
                if (this.message.hasOwnProperty(key)) {
                    message = this.message[key][0] || 'message error';
                    break;
                }
            }
        } else {
            this.message = this.message;
        }
        return message;
    }
}
export const HttpError = {
    API_DATA_ERROR: '服务器数据错误，无法解析的数据格式~',
    SERVER_ERROR: '服务器处理异常，无法获取正常的服务器响应',
    NOTFOUND_ERROR: '哎呀，请求地址不存在',
    AUTH_ERROR: '权限校验失败，请提供正确的令牌',
    NETWORK_ERROR: '网络好像出问题了',
    TIMEOUT_ERROR: '服务器很久没有响应了',
};
