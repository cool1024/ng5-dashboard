export interface VipUser {
    // 会员id
    id: number;
    // 会员唯一编号
    uid?: number;
    // 会员昵称
    nick: string;
    // 会员头像
    avatar: string;
    // 会员级别
    vip_level: number;
    // 会员积分
    vip_credit: number;
    // 地址
    location?: string;
    // 邮箱
    email?: string;
    // 电话
    phone?: string;
    // 性别
    gender?: number;
    // 创建时间
    created_at?: string;
    // 更新时间
    updated_at?: string;
}
