import { Observable } from 'rxjs/Observable';
import { UploadResult } from './upload-result.interface';

export interface ImageConfig {
    useUploader?: boolean
    uploaderTitle?: string
    uploader?: Observable<UploadResult>,
    auto?: boolean,
}