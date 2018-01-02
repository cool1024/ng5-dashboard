import { Observable } from 'rxjs/Observable';
import { UploadResult } from './upload-result.interface';
import { TaskHandle } from '../classes/task.class';

export interface ImageConfig {
    useUploader?: boolean;
    uploaderTitle?: string;
    uploadeFunc?: (file: File) => Observable<UploadResult>;
    source?: string;
    auto?: boolean;
}
