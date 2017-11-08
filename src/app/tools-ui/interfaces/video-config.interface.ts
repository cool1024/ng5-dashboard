import { Observable } from 'rxjs/Observable';
import { UploadResult, UploadingProgress } from './upload-result.interface';

export interface VideoConfig {
    useUploader?: boolean;
    uploaderTitle?: string;
    uploader?: Observable<UploadResult | UploadingProgress>;
    auto?: boolean;
}
