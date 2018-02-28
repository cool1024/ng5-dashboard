/**
 * ControlType
 * 枚举类型，控件类型
 */
export enum ControlType {
    DEFAULT_INPUT,
    DEFAULT_PASSWORD,
    MOBILE,
    TEXTAREA,
    DATE,
}

/**
 * DefaultValue
 * 默认配置参数值
 */
const DefaultValue = {
    detaulTitle: '默认标题',
    defaultPlaceholder: '默认填充值',
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
    private active: boolean;

    /**
     * 构造方法
     *
     * @param  type string 控件类型
     * @param  title string 控件标题
     * @param  placeholder string 默认填充内容
     * @return void
     */
    constructor(public type: ControlType, public title = DefaultValue.detaulTitle, public placeholder = DefaultValue.defaultPlaceholder) {
        this.active = false;
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
}


