# 路由

SPA(Single-Page Application)单页面应用程序，是一种Web应用程序，只加载一次  
页面上的所有元素，都是通过JavaScript脚本动态更新  
这样可以避免浏览器闪烁或无响应的问题  

路由的两个主要功能(JavaScript路由思想)：  

- 修改应用程序的位置，即URL  
- 确定在给定位置渲染哪些组件  

## 自定义React Router

> create-react-app basic  
> cd basic  
> npm start  

React Router核心React组件  

- Link组件，链接  
- Redirect组件，重定向  
- Route组件和Switch组件，给定位置渲染  

### Route组件

本例自定义一个无状态函数的Route，两个参数props  

- path: 与位置匹配的路径。如果未匹配，返回null，不渲染组件内容  
- component: 当位置匹配路径时，需要渲染的组件  

多数情况下，组件类作为变量参数，传入函数，然后通过React.createElement()渲染，而不是JSX  
因为JSX，还要注意组件名必须大写等  

使用自定义的Route组件，浏览器会向Webpack开发服务器发送新请求；服务器返回index.html，然后浏览器再次重新挂载React应用  

### History.js库

> npm i --save history  

此库允许您在JavaScript运行的任何地方轻松管理会话历史。历史对象抽象出各种环境中的差异，并提供一个最小的API，允许您管理历史堆栈、导航和会话之间的持久状态。  
[History.js@Github](https://github.com/remix-run/history)  
[History.js docs](https://github.com/remix-run/history/tree/dev/docs)  

App-1-2.js会用到history库的createBrowserHistory函数，来与浏览器的历史记录API交互  
此库对跨浏览器的兼容性做的很好  

### Link组件

对a标签进行封装，to属性代替href属性，来控制浏览器的跳转  
Link组件的onClick()事件内部，使用e.preventDefault()来阻止浏览器发出请求，而使用history.push()将新位置推入历史记录栈  

### RouterContext

原书示例的Router组件，React@18已经不推荐使用  
这里声明了公共上下文RouterContext  
在App-3.js组件中，设置history.listen()，并被一个匿名函数订阅，匿名函数调用了forceUpdate()方法  

### Redirect组件和BlackSea组件

在App-3-4.js中添加一个BlackSea的组件引用，该组件会在加载完成的3秒后，自动加载Redirect组件  
Redirect组件会通过上下文跳转到'/'路径  

由于是render方法正在执行的过程中，进行的跳转，所以控制台出现了如下错误：  

```cmd
Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
    at Redirect (http://localhost:3000/static/js/bundle.js:601:5)
    at div
    at BlackSea (http://localhost:3000/static/js/bundle.js:303:5)
    at Route (http://localhost:3000/static/js/bundle.js:682:5)
    at div
    at App (http://localhost:3000/static/js/bundle.js:41:1)
```

解决方法：暂时没有好的解决方法。在render()方法中不能再有其他改变state或者prop的操作  

### 使用react-router-dom库

[React Router DOM](https://reactrouterdotcom.fly.dev/)  
现在，不再使用前面自己创建的React Router组件，而是使用React库中的路由组件：react-router-dom  
React Router是React JavaScript库的一个轻量级、功能齐全的路由库。React路由器在React运行的任何地方运行；在web、服务器（使用node.js）和React Native上  

> npm i --save react-router-dom  

在以前的版本中，如果路径出现重复或部分重复，则将所有路径下的DOM一起渲染  
可以通过属性`exact={true}`完全匹配路径的限制，来避免这种漏洞  
新版本已经不会出现部分匹配即渲染的情况  

Routes组件，即旧版本中的Switch组件，可以处理未匹配到的路由  

> 书中示例，非法的路由(如`/article`)，可以在页面显示自定义的错误信息  
> 新版本，暂未找到对应的实现方法  

## 动态路由

> create-react-app music  
> npm i --save express  
> npm i --save morgan  
> npm i --save isomorphic-fetch  
> npm i --save urijs  
> npm i --save camelcase-keys@7.0.2 // not install the latest version (pure ESM, not able to import in server.js)  
> npm i --save btoa  
> cd music  
> node server.js //启动server  
> create-react-app client  
> cd client  
> npm i --save react-router-dom  
> npm i --save isomorphic-fetch  
> npm start  

server.js无法引用最新的camelcase-keys包，因为最新的v8.0.0已经升级成pure ESM  
不兼容require()的引入方式  
参考作者的官方指导：[Pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)  

```cmd
const {camelcaseKeys} = require('camelcase-keys';       
                        ^                           keys\index.js 
                                                    () which is av
Error [ERR_REQUIRE_ESM]: require() of ES Module D:\workspace\React\react_fullstack\Part_01\ch09_router\music\node_modules\camelcase-keys\index.js from D:\workspace\React\react_fullstack\Part_01\ch09_router\music\server.js not supported.
Instead change the require of index.js in D:\workspace\React\react_fullstack\Part_01\ch09_router\music\server.js to a dynamic import() which is available in all CommonJS modules.
    at Object.<anonymous> (D:\workspace\React\react_fullstack\Part_01\ch09_router\music\server.js:15:25) {
  code: 'ERR_REQUIRE_ESM'
}
```

Route组件，会从Url中提取所有动态参数，并将它们传递给match.params对象内的目标组件  

> 示例使用的第三方API`https://api.spotify.com/v1`，在国内无法访问  
> 示例暂未完成，考虑稍后换成国内可用的音乐平台API  

示例应用启动后，默认地址是无法看到新页面的  
因为当前路由是`/`，与新页面对应的路由`/albums`不匹配  

### /src/Components/v1中的组件

不支持登录和退出，按钮事件也未实现
连接第三方API的token，是硬编码在代码中的  

### /src/Components/v2中的组件

实现了Close按钮的功能  
由于带有Close按钮的组件，可能出现在多个不同的页面，对应这不同的路由。当Close事件成功后，应用应该返回之前的页面路由，所以需要将Close按钮的跳转地址变量化。这里是通过将路径名作为props传递进来实现的  

### /src/Components/v3中的组件

实现了登录和退出的功能  
NavLink组件实现动态菜单项，它的activeClassName属性默认值为active，可以省略  

## 支持身份验证的路由

Login组件和Logout组件  

### PrivateRoute高阶组件

自定义一个高阶组件PrivateRoute，并通过Client库里的isLoggedIn，来确定应该渲染props传入的组件，还是渲染Redirect跳转组件  
Redirect组件设置，登陆成功后，需要跳转的Url  
如果需要跳转回登陆前的Url，可以设置state，其在Route组件的location属性下可用  

通过Login组件的方法实现获取跳转前的Url：  

```javascript
    redirectPath=()=>{
      const locationState = this.props.location.state;
      const pathname=(
        locationState && locationState.from && locationState.from.pathname
      );
      return pathname||'/albums';
    }
    render(){
      if(this.state.shouldRedirect){
        return(
          <Redirect to={this.redirectPath()} />
        );
      } else {
        ...
      }
    }
```
