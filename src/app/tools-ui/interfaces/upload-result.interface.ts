export interface UploadResult {
    source: string,
    result: boolean,
    message: string,
    error?: ErrorEvent
}

export interface UploadingProgress {
    ready: boolean,
    loaded: number,
    error?: ErrorEvent
}