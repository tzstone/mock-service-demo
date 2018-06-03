# mock-service-demo

实现一个本地mock服务器, 本地请求指向mock服务器(如配置axios.defaults.baseURL为mock服务器地址), 如果path匹配成功且该path开启了mock配置项则返回mock数据, 否则对请求进行转发(可根据配置转发至本地或远程服务器)

## 功能

* 单个接口可配置是否进行mock, 随意切换mock/开发环境
* 可配置接口延迟返回时间
* 支付mockjs语法, 返回随机mock数据
* 监听mock文件变更, 自动重启服务

## 使用

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# start mock-service
npm run mock
```

## 项目目录

<pre>
|---- mock  // mock文件夹
  |--- modules  // api模块文件
    |---app.js
    |---user.js
  |---config.js // 配置mock服务器端口及转发域名
  |---index.js  // mock入口文件
  |---random.js // 随机mock数据函数
</pre>

## api模块文件配置

* `method`: 请求的方法, 默认为`POST`
* `delay`: 接口延迟返回时间, 单位`s`, 默认不延迟
* `mock`: 接口是否进行mock, 默认为`true`
* `data`: 接口返回的mock数据, 支持mockjs语法, `必填`
