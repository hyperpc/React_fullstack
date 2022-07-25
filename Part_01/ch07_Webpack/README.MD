# webpack与Create React App结合使用

> create-react-app heart-webpack  
> cd heart-webpack  
> npm start  

JavaScript捆绑器有多种选择，React社区最喜欢的是Webpack  
社区创建了大量的样板和库，以应对设置和配置问题，让开发人员可以启动更高级的React应用  
React核心团队基于标准约定，创建了Create React App项目，有效避免了社区提供的各种分裂的解决方案  

## Create React App

该库可启动一个新的由Webpack驱动的React应用  
该库配置了一个“黑盒”的Webpack设置，同时抽象了配置细节  

默认地，public/index.html页面没有定义script标签  
而组件依赖则定义在package.json中，而且react-scripts是整个应用的引擎  
Webpack使我们能够在浏览器中使用npm包  
scripts中指定的四个命令：  

- start: 启动Webpack的HTTP开发服务器，以处理来自Web浏览器的请求  
- build: 为生产使用，为所有资源创建一个优化的静态包  
- test: 执行可能存在的应用程序的测试集  
- eject: 将react-scripts的内部结构迁移进项目目录。这可以让开发人员根据自己的需要调整配置  

Webpack通过脚本中的import语句识别出程序引用的依赖项  
如果引用路径以'./'开头，Webpack可以识别出引用的是本地文件，而非npm包  

> 示例目录./es6-modules下的脚本演示了export，import的不同用法  

值得注意的是，App.js, App.css和App.test.js为我们提供了一个完整的React组织范式  

`npm start`命令，启动Webpack开发服务器。  
默认端口为3000，如被占用，将改选其他端口  
查看启动页面的源码，可以发现，body标签底部引入了bundle.js。
它将为应用引入React定义的各种组件和资源  

## Webpack基础

Webpack开发服务器会实时生成bundle.js文件并保存在内存中，以备作为服务提供。  
bundle.js是一个大文件，包含所有的JavaScript代码(App.js源码，甚至整个React库的源码)  

Webpack已对所有包含的JavaScript代码执行了一些转换。它使用Babel将ES6代码转换为与ES5兼容的格式  
Webpack将每个模块都封装进下面的签名函数中

```javascript
function(module, exports, __webpack_require__){
    // webpack转换后的模块代码
}
```

Webpack还会为每个封装的模块提供一个模块ID  
此处的模块，包括自定义的组件，样式文件及静态资源，如logo.svg  
__webpack_require__()是Webpack的特殊模块加载器，它内部的文件路径，都表示Webpack服务器上的位置  

与其他JavaScript捆绑器一样，Webpack会将所有模块合并到一个文件。这样可以最大化的提高应用性能  
因为分成多个单独的小文件，会在HTTP传输的开始和结束，增大开销  

## 修改示例应用

Webpack支持热重载CSS文件，当检测到CSS文件变化时，将进行热交换，而无须重新加载整个页面  
Webpack检测到JavaScript文件更新，支持自动重载页面  
参考示例文件：./src/App.css, ./src/App.js  
Webpack本质上是一个JavaScript开发和部署的平台  

## 创建生产构建

> npm run build  

此命令会在项目目录生成一个新的目录./build，里面包含所有的应用资源和压缩的页面及样式  
index.html文件引用外部文件时，是指定了版本号的，以防止浏览器缓存  

生产环境中的文件都是经过压缩或混淆的，而*.map源映射文件，可以将混淆的代码映射回原始的，构建前的格式  

## 弹出 eject

弹出操作，一旦执行，无法回退，所以执行之前，一定要确保所有更改已经备份  

> npm run eject  
> Y  

## Create React App与API服务器一起使用

> md food-lookup  
> cd food-lookup  
> npm i --save express  
> npm i --save-dev concurrently  
> npm i --save-dev sqlite3  
> npm i --save-dev sql.js  
> npm i --save-dev @babel/core @babel/node  
> npm i --save node-fetch  
> npm i --save body-parser  
> npm i --save path  
> node server.js  

./food-lookup根目录存储了服务器脚本：server.js, start-client.js, start-server.js  
./food-lookup/client目录下是create-react-app生成的应用  

此示例没有在package.json中定义`npm start`命令  
此前，在第三章的示例，使用了`node server.js`命令，启动服务端，然后`npm start`启动客户端  
此处依然如此实现  
书中演示通过concurrently包，支持在不同的端口，同时启动服务端和客户端  
具体配置，参考package.json的script：  

```json
  "scripts": {
    "start": "concurrently \"npm run server\" \"npm run client\"",
    "server": "babel-node start-server.js",
    "client": "babel-node start-client.js"
  }
```

另外，本实例操作数据库的部分，使用了sql.js库，但没有展开讲  
关于该库的详细内容，请参考：  

- [Sql.js@Github](https://github.com/sql-js/sql.js)  
- [Sql.js@npm](https://www.npmjs.com/package/sql-js)  
- [Sql.js@doc.org](https://sql.js.org/#/)  

此时还不能通过client调用server中的api，因为存在跨域资源访问的问题  
CORS: Cross-Orign Resource Sharing 跨域资源共享

## 使用Webpack开发代理

> create-react-app client  
> cd client  
> npm start  

在client应用中的package.json的，设置proxy属性  
这将允许React应用与Webpack开发服务器进行单独交互，并消除与CORS相关的问题  
而用户只需要与Webpack服务器交互(localhost:3000)，而不需要关心API服务器(localhost:3001)  

## SemanticUI 样式问题

```cmd
Webpack supports "data:" and "file:" URIs by default.
You may need an additional plugin to handle "data:" URIs.
```

原因：  
样式表中的双冒号，在Webpack库中会产生bug，无法解析。  
Webpack官方和SemanticUI官方，在新的release版本都没有解决这一问题  

解决方案：  
通过public/index.html引入semantic.min.css样式文件，  
不要在src/App.js等文件中引入该样式文件  
