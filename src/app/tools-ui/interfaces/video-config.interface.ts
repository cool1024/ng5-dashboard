import { Observable } from 'rxjs/Observable';
import { UploadResult, UploadingProgress } from './upload-result.interface';

export interface VideoConfig {
    useUploader?: boolean;
    uploaderTitle?: string;
    uploadeFunc?: (file: File) => Observable<UploadResult | UploadingProgress>;
    auto?: boolean;
    source?: string;
}
