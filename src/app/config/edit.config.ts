import { HttpConfig } from './http.config';

// 富文本配置

export const EditOptions = {
    placeholderText: '请输入文本内容',
    imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|',
        'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|',
        'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-',
        'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|',
        'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|',
        'print', 'spellChecker', 'help', '|', 'undo', 'redo'],
    charCounterCount: false,
    language: 'zh_cn',
    imageUploadURL: HttpConfig.SERVER_URL + '/tool/edit/upload',
    videoUploadURL: HttpConfig.SERVER_URL + '/tool/edit/upload',
    heightMin: 600,
    // 默认图片宽度-自动
    imageDefaultWidth: 0,
    videoDefaultWidth: 0,
};
