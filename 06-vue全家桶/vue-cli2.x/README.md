# vue-cli2.x

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


> 目录结构

```text
├── build/               # Webpack 配置目录，包括运行、开发环境、项目打包等配置文件
├── config/              # Vue基本配置文件，可以设置监听端口，打包输出等
├── dist/                # build 后生成静态文件目录
├── mock/                # 模拟数据的js
├── node_modules/        # npm install 后的项目依赖包
├── src/                 # 源码目录（开发的项目文件都在此文件中写）
│   ├── assets/          # 放置需要经由 Webpack 处理的静态文件，通常为样式类文件，如css以及一些外部的js
│   │   ├── iconfont     # iconfont 图片文件目录
│   ├── components/      # 提取的组件，包含自己定义的组件和平台的公共组件
│   │   ├── common/      # 放平台的公共组件
│   ├── lib/             # 放置工具类和一些第三方的js文件
│   ├── request/         # 统一管理 XHR 请求
│   │   ├── http.js      # 请求封装的 js 文件
│   │   ├── xxx.js       # 对外暴露接口的统一配置 js 文件
│   ├── router/          # 路由，此处配置项目路由
│   ├── views/           # 路由页面组件
│   ├── App.vue          # 根组件
│   ├── main.js          # 入口文件
├── static/              # 放置无需经由 Webpack 处理的静态文件，通常放置图片类资源
├── .babelrc             # babel 转码配置
├── .editorconfig        # 代码格式
├── .gitignore           # （配置）在上传中需被 Git 忽略的文件（夹）
├── .postcssrc.js        # 处理css前缀，兼容浏览器
├── index.html           # 主页，打开网页后最先访问的页面
├── logo.ico             # 项目图标
├── package.json         # 本项目的配置信息，启动方式
├── package-lock.json    # 记录当前状态下实际安装的各个npm package的具体来源和版本号
├── README.md            # 项目说明
```