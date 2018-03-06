/**
 * ControlType
 * 枚举类型，控件类型
 */
export enum ControlType {
    DEFAULT_INPUT,
    MOBILE,
    TEXTAREA,
    DATE,
    SELECT,
    RADIO,
    TEXT,
    IMAGE,
    FILE,
}

/**
 * DefaultValue
 * 默认配置参数值
 */
const DefaultValue = {
    detaulTitle: '默认标题',
    defaultPlaceholder: '请输入文本内容',
};

/**
 * ControlField 表单控件接口声明
 * @auth xiaojian
 * @date 2018年02月26日
 */
export interface ControlField {

    // 控件类型
    type: ControlType;

    // 控件标题
    title: string;

    // 默认填充内容
    placeholder: string;
}

/**
 * EditControlField 编辑模式下表单控件类
 * @auth xiaojian
 * @date 2018年02月26日
 */
export class EditControlField implements ControlField {

    // 控件是否处于编辑状态
    protected active: boolean;

    // 控件是否是必须的
    required: boolean;

    /**
     * 构造方法
     *
     * @param  type ControlType 控件类型
     * @param  title string 控件标题
     * @param  placeholder string 默认填充内容
     * @return void
     */
    constructor(public type: ControlType, public title = DefaultValue.detaulTitle, public placeholder = DefaultValue.defaultPlaceholder) {
        this.active = false;
        this.required = false;
    }

    /**
     * 控件是否为编辑状态
     *
     * @return boolean
     */
    isActive(): boolean {
        return this.active;
    }

    /**
     * 将控件设置为编辑状态
     *
     * @return void
     */
    setActive() {
        this.active = true;
    }

    /**
     * 将控件设置为默认状态
     *
     * @return void
     */
    setDefault() {
        this.active = false;
    }


    /**
     * 使用json对象初始化控件
     *
     * @return void
     */
    initfromJson(json: { [key: string]: any }) { }
}


