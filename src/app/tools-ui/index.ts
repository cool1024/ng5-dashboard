/*tool modules*/
export { PaginationModule as TSPaginationModule } from './modules/pagination.module';
export { LoadingModule as TSLoadingModule } from './modules/loading.module';
export { DropdownModule as TSDropdownModule } from './modules/dropdown.module';
export { SelectModule as TSSelectModule } from './modules/select.module';
export { CheckboxModule as TSCheckboxModule } from './modules/checkbox.module';
export { FileModule as TSFileModule } from './modules/file.module';
export { ModalModule as TSModalModule } from './modules/modal.module';
export { TabModule as TSTabModule } from './modules/tab.module';
export { CollapseModule as TSCollapseModule } from './modules/collapse.module';

/*const configs*/
export { ImageConfig } from './interfaces/image-config.interface';
export { UploadResult, UploadingProgress } from './interfaces/upload-result.interface';
export { VideoConfig } from './interfaces/video-config.interface';

/*tool interfaces*/

/*tool classes*/
export { Pagination } from './classes/pagination.class';
export { SearchParams } from './classes/search.class';
export { TSUploadingProgress, TSUploadResult } from './classes/upload.class';

/*tool services*/
export { ModalService as TSModalService } from './components/modal/modal.service';
