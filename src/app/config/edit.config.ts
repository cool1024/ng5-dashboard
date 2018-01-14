import { HttpConfig } from './http.config';

/* 富文本配置
 * 可以按需求增加/减少配置参数
 * 更多配置参数请参考官方网站 https://www.froala.com/wysiwyg-editor
 */

export const EditOptions = {
    placeholderText: '请输入文本内容',
    imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|',
        'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|',
        'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-',
        'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|',
        'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|',
        'print', 'spellChecker', 'help', '|', 'html', 'undo', 'redo'],
    charCounterCount: false,
    // 语言--中文
    language: 'zh_cn',
    // 图片上传地址
    imageUploadURL: HttpConfig.SERVER_URL + '/tool/edit/upload',
    // 视频上传地址
    videoUploadURL: HttpConfig.SERVER_URL + '/tool/edit/upload',
    // 文件上传地址
    fileUploadURL: HttpConfig.SERVER_URL + '/tool/edit/upload',
    // 最小高度
    heightMin: 600,
    // 默认图片宽度-自动
    imageDefaultWidth: 0,
    videoDefaultWidth: 0,
};
