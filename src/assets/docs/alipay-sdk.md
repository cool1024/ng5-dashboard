# 支付宝支付
## 配置文件说明 `lumen_api/config/alipay.php`

------------------------------------------
>1.文件目录:项目根目录下的config文件夹中的alipay.php文件


>2.参数介绍--可以直接查看文件内说明


|参数名称|描述|参考值|
| ------ | ------ | ------ |
|public_key|商户公钥|见配置文件，由alipay提供的钥匙生成工具生成|
|private_key |商户私钥|见配置文件，由alipay提供的钥匙生成工具生成|
|alipay_public_key |支付宝公钥|见配置文件，为一个固定串，在创建的支付宝应用中可以查看|
|app_id|商户app_id|在创建的支付宝应用中可以查看，如2016082100306410|
|gateway |支付宝网关|沙箱环境为https://openapi.alipaydev.com/gateway.do，正式环境为https://openapi.alipay.com/gateway.do|
|return_url |同步跳转地址|PC网站支付，手机网站支付才有，为支付成功后，前端跳转的地址，如http://ts.cool1024.com/web/alipay/order/home|
|notify_url |支付宝异步通知地址|支付成功后支付宝通知服务器的地址，如http://ts.cool1024.com/web/alipay/order/notify_url|

```php
<?php
/*----------------------------------------
 *  买家账号：joqjlq5385@sandbox.com
 *  登录密码：111111
 *  支付密码：11111
 *  证件号码：356832190808272106
 * 
 *  商家账号：gsvymh7752@sandbox.com
 *  商户UID：2088102172443237
 *  登录密码：111111
 */
return [

    // 商户公钥
    'public_key' => 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAytWYpGIj0kNCjmw/0VnflRdx1+au9FFkUIm7zoZt+IVDFflwDblidA2LdolWrTN9QVgG2STf1vSvM4we7LFpUC957H5+r8CuOriGsZObFezDEwW1b0B5NOu+nxqi6yENeUldyB17ofLrZxXrXSbbQmZJ6N7P70lC7po96tw1hhf8oIeAV+qmKL4jm4bVSNzfyD4ijn0zio0GL/YC532I8fnQDX5ppKn8sWSGP02UVs1Z3riPXvJJhIWIAkhCWbPk3ID1+W7ijIz+SLAtLygRVxt4zuwyht9ttxDEZjVT98TnDThw7VATGWFXaX/IYWJgVAGeucODNQOpviAnkbm1JQIDAQAB',

    // 商户私钥
    'private_key' => 'MIIEowIBAAKCAQEAytWYpGIj0kNCjmw/0VnflRdx1+au9FFkUIm7zoZt+IVDFflwDblidA2LdolWrTN9QVgG2STf1vSvM4we7LFpUC957H5+r8CuOriGsZObFezDEwW1b0B5NOu+nxqi6yENeUldyB17ofLrZxXrXSbbQmZJ6N7P70lC7po96tw1hhf8oIeAV+qmKL4jm4bVSNzfyD4ijn0zio0GL/YC532I8fnQDX5ppKn8sWSGP02UVs1Z3riPXvJJhIWIAkhCWbPk3ID1+W7ijIz+SLAtLygRVxt4zuwyht9ttxDEZjVT98TnDThw7VATGWFXaX/IYWJgVAGeucODNQOpviAnkbm1JQIDAQABAoIBAQCYKRxVVPoiZiqrxTEq0A0WP3w7xuZAij6C3JBzIg2lffMRrQoOgaAGB5Mz3VuUmye/uVWJ2EvDadN1DAy263BhovwIGezX0+fgTUVeOakCDZdZ0dKGHwvOU3uwx76oPSdqcUtVMCjrGNzXfG4Qd3HMogeYFm5Ox9raPANvCLtuV4EmRb0V0cRJJrfiVWYa5DrTnYphAiYozTBl8Rxo6PIUUx0QptK4eCbQ4ePFLdKW0Sb11uTrW1OG7MXFVzbr7oA77LNu8NDp6J4KgI6YpRsTpTIovXaA3CEWfc6QJb6xhpzgKX7trULKvNjRTTZ3mg5Nz0oDvdYxI84jYNM1QPeRAoGBAPfifOo+Om3q4oq7xcurqkVZPMrHvxQ2t2pOqqdahb1y6EgQgZAXKiH2smrhZWbKSmf38eyLQHhgLak8fGueWOPpNFfeLZUPtF1eCFvNoXA4blg690f4a1UwqEiVvPVl6Y32AvN5FKgxH+lRhJ6q6Z24YypETkZWvcZ2CAtNnp6bAoGBANF5iwRDZHorLherwpOZhQ2oAp+0LpQTRS35UoKif08KfI9yKwIr53U0/tsIgLmoPDlI/gZaeRDYBug9DbzuG0S2fyvNiykQ0qwFzVLn0/dS9Cm7eEiwI9BHbeS8o91lkbUoa+tDzjEb3q+GXDlJvtuvkGrnWPwOWuLuicG2/lc/AoGAZyn4iNhrItHNhKWPNSt1irUP6ujkqjn3baPdvBadcHIBH/TWpyws2cO9D2RM+lGYU9rJ8YMmyrJkbnmA4p0dK4Ujxqnt2IqXqv/2hJZ46KZjrg6kWWyW5vaAIu1Gne7TG8TWB5RNt43yVP0bL5m77msNwkp5NSbmhlEbGfEs4Z8CgYANmncMr9O2m1dC8kSQkUeyu1ZwSKM9uoKjma1iDmt2FphAOInSekdttSNX1hWF+QbwMW1NvFJgZacNLenWeyAKNk/L6G1BHXaQ9U+AMs3xIdH5Y9NL5SRuQjVAxX9ewVnVCer4PE8HoWe0vmT+02sxmRUn3B5LQCNm2VbY3almwQKBgG6T2ji4zgPsjzrXzeci9nyjbg0+sZmyjvRWFyzuN580DIHdNW+EWTuE3FqjrHkKwflKba4qmtLCKnMsM6yL7e9FinSligaKDrYNEhj/7yC4LEeXIklvLGJ+Qn7T3mhUedk1ca8qHFOOGqBiiJ9jHy//7erilkGER65d4bIkVsCs',

    // 支付宝公钥
    'alipay_public_key' => 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtyv8T39O+lI8M6NuQsWXMAa7cjxe7sUw4X+pbRZ9XeohpqSOlFOjQNN/H2s6vKDDKdG9iEKyn6owRJrIcxeM28IR8dKoD4x54q5cIsP8rvkShjVjjNLFs+knZikX2c8O9ixx5t3dYpVmNrBzDTWnpUaWIocjJIwOVu0qeUAl7eSyJJeI+wdZ1534fyKtFVLBXEdBIbUvY+jgOIcOZjTu1oSKRs5NI2xb47JmOow0GcYFE/u5gurWEBcJJ5sRvbC1Uh3CcdQDsWE0/fLudGetkhHY+HWJgZPOJBoIirKpLcJsoTNv0hfuHFPtjiWwytX++xULVIidtPu3rDCa+ojpfwIDAQAB',

    // 商户app_id
    'app_id' => '2016082100306410',

    // 支付宝网关
    'gateway' => 'https://openapi.alipaydev.com/gateway.do',

    // 同步跳转
    'return_url' => "http://ts.cool1024.com/web/alipay/order/home",

    // 异步通知地址
    'notify_url' => "http://ts.cool1024.com/web/alipay/order/notify_url",
];
```
## 使用Alipay对象生成订单`lumen_api/app/Sdk/Alipay/Alipay.php`


![图片描述](https://www.tapd.cn/tfl/captures/2018-01/tapd_21192461_base64_1515739320_27.png)
<br>
>1.引入Alipay

```php
// 使用Alipay
use App\Sdk\Alipay\Alipay;

// 初始化Alipay对象
$pay = new Alipay();
```
>2.App支付

```php
// 初始化Alipay对象
$pay = new Alipay();
// 订单信息
$order = [
    // 支付金额，单位为元
    'price' => 99.8,
    // 支付标题，这个可以在支付界面看到--APP端
    'title' => '测试支付订单',
    // 订单说明，这个可以在支付界面看到--APP端
    'body' => '测试公司名称',
    // 订单号-这个是我们自己的订单号，这里用时间日期模拟
    'ordersn' => date('YmdHis'),
];
// 使用initAppOrderData方法生成订单数据
$order_data = $pay->initAppOrderData($order['price'], $order['title'], $order['body'], $order['ordersn']);
// 把生成的订单数据传送给App，由App唤起支付宝进行支付
return $api->datas($order_data);
```
>3.PC网站支付

```php
// 初始化Alipay对象
$pay = new Alipay();
// 订单信息
$order = [
    // 支付金额，单位为元
    'price' => 99.8,
    // 支付标题，这个可以在支付界面看到--APP端
    'title' => '测试支付订单',
    // 订单说明，这个可以在支付界面看到--APP端
    'body' => '测试公司名称',
    // 订单号-这个是我们自己的订单号，这里用时间日期模拟
    'ordersn' => date('YmdHis'),
];
//获取生成的支付链接，使用initPcOrderData方法
$order_data_url = $pay->initPcOrderData($order['price'], $order['title'], $order['body'], $order['ordersn']);
    StorePayLog::insert([
        'price' => $order['price'],
        'ordersn' => $order['ordersn'],
        'type' => '支付宝',
    ]);
// 返回一个跳转，直接跳转到支付页面
 return redirect($order_data_url);
```
>4.异步通知，验证合法性

```php
// 获取所有请求参数
$return_params = $api->all();
// 初始化Alipay对象
$pay = new Alipay();
// 校验数据合法性
$check_result = $pay->notifyCheck($return_params);
// 如果验证成功，进行订单后续操作，更新支付日志--订单支付成功
if ($check_result['result']) {
        StorePayLog::where([
		// 支付类型，可以自己定义
		'type' => '支付宝', 
		// 订单号，这个是我们自己的订单号
		'ordersn' => $return_params['out_trade_no']
	])->update([
            // 支付宝返回的原始数据
            'params' => json_encode($return_params),
	    // 支付状态1--支付成功
            'status' => 1,
	   // 支付宝生成的唯一订单号，不是我们的！！！
            'no' => $return_params['trade_no'],
        ]);
        // 异步通知成功，返回success--注意，这个是固定返回值，不可修改
        return 'success';
    } else {
    // 验证失败，返回fail--注意，这个是固定返回值，不可修改
    return 'fail';
}
```