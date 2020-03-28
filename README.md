<h1 align="center">Welcome to 基于 Serverless 和 Vue 的豆瓣电影 Top 250 排行榜 👋</h1>
<p>
  <a href="https://twitter.com/fuergaosi" target="_blank">
    <img alt="Twitter: fuergaosi" src="https://img.shields.io/twitter/follow/fuergaosi.svg?style=social" />
  </a>
</p>

> 使用 Serverless 提供数据，使用 Vue 提供页面展示实现的豆瓣电影 TOP 250 排行榜

### ✨ [Demo](https://demo-1257685189.cos.ap-beijing.myqcloud.com/index.html)
## 如何开始
首先在本地拉取仓库
```sh
git clone https://github.com/fuergaosi233/DoubanTop250OnServerless.git
```
![show](./static/show.gif)
### 创建云函数
1. 进入 腾讯云的[云函数控制台](https://console.cloud.tencent.com/scf/)
2. 创建一个空白的云函数 （Nodejs10.15).
3. 在函数代码部分选择上传文件夹 将 `backEnd` 文件夹上传.
4. 在该函数页面选择`触发方式`->`添加触发方式`,在配置中选择`触发方式`为`API网关触发器`,同时给`启用集成响应`打勾,选择保存。即可获取到访问路径即接口`url`。
### 创建前端页面
切换到 `frontEnd` 文件夹
```
cd frontEnd
```
由于使用了 Vue-cli 的快速原型开发 所以你需要安装一个全局的包
```
npm install -g @vue/cli-service-global
```
更改配置文件，将上个环节中的 Url 填写至 `config.js` 文件中 文件内容如下
```js
//config.js
const urls=[
  'https://service-bitqtpbh-1257685189.bj.apigw.tencentcs.com/release/getDouban', //此为你的 api 调用接口
]
export default urls[Math.floor(Math.random() * urls.length)];
```
然后安装所需的依赖并构建静态页面
```sh
yarn & vue build
```
在腾讯的[对象存储](https://console.cloud.tencent.com/cos5) 中创建一个新的存储桶，随后将dist目录中的文件上传至，存储桶中。
你的存储桶目录结构应该如下
```sh
├── css
├── index.html
└── js
```
上传完成后选择 `index.html` 文件的`详情`选项，其中`对象地址`参数即是应用的地址，访问该 uri 即可使用应用。
## 出现`服务器访问频率过高被风控，请过段时间再试。`是怎么回事。
由于在服务器使用了异步访问了豆瓣的 Top250排名页面，访问频率过高很容易被服务器拉黑，禁止访问。所以会出现如下报错。
解决方案有：
1. 给 Axios访问部分增加代理设置使用代理访问。
2. 添加豆瓣账号登录后的Cookie访问。
3. 构建多个云函数进行负载均衡，防止单一访问过多被拉黑。

## Author

👤 **Holegots**

* Website: https://blog.holegots.com
* Twitter: [@fuergaosi](https://twitter.com/fuergaosi)
* Github: [@fuergaosi233](https://github.com/fuergaosi233)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_