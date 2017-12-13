#### 插入方法
----------------------
```php
// 插入单条
$user = [
  'name' => 'zhangsan',
  'mobile' => '123456789',
]
User::insert($user);

// 插入多条
$users = [
  ['name' => 'zhangsan','no' => '001'],
  ['name' => 'lisi','no' => '002'],
  ['name' => 'wangwu','no' => '003'],
];
User::insert($users);

// 不存在就插入
User::intert()
```
[查看ORM-Builder](https://laravel.com/api/5.2/Illuminate/Database/Eloquent/Builder.html)
