# Flux和Redux介绍

> md counter  
> cd counter  
> npm init  
> npm i --save-dev @babel/core @babel/cli @babel/preset-env @babel/node  
> npm i --save-dev nodemon  
> npm start  

在React中配置Babel，可以参考[ReactJS using Babel](https://www.geeksforgeeks.org/reactjs-using-babel/)  
Babel的依赖包：@babel/core, @babel/cli, @babel/preset-env, @babel/node  
nodemon包，支持无刷新更新浏览器内容  

```json
// package.json
  "scripts": {
    "start": "nodemon --exec babel-node src/Components/reducer-amount.js",
    "test": "react-scripts test"
  }
```

```json
// .babelrc
{
    "presets": ["@babel/preset-env"]
}
```

Flux这种设计模式(单项数据通道：动作、分配器、store、视图)，是为了解决的一个痛点，就是  
用户交互和状态更改之间的紧耦合  

优点：  

- 解耦交互处理和状态更改  
- 拆分状态管理逻辑  
- React组件更简单  
- 状态数和DOM树之间不匹配  

Redux库是社区最受欢迎的，Flux模式的一种非严格的实现  
Redux库特性是简单，除去注释和完整性检查，Redux只有约100行代码  

Redux库关键思想：  

- 应用程序的所有数据都在一个名为state的数据结构中，state保存在store中  
- 应用程序从store中读取状态  
- state永远不会在store外直接改变  
- 视图会发出描述所发生事件的动作  
- 将旧的state和动作通过一个函数(reducer)进行组合来创建新state  
- reducer函数必须是纯函数  

Redux库中的动作是对象，且始终拥有一个type属性  
store负责维护状态并接受来自视图的动作  
只有store才可以访问reducer  

## 构建Store

> create-react-app chat_simple  
> cd chat_simple  
> npm i --save-dev @babel/core @babel/cli @babel/preset-env @babel/node  
> npm i --save-dev nodemon  
> npm start  

示例代码节10.8、10.9、是通过babel-node运行App.js运行的，参考上面的项目配置  

```json
// package.json
  "scripts": {
    "start": "nodemon --exec babel-node src/App-babel.js",
    "test": "react-scripts test"
  }
```

```json
// .babelrc
{
    "presets": ["@babel/preset-env"]
}
```

最后的10.10由React执行得到最终页面  

```json
// package.json
  "scripts": {
    "start": "react-scripts start",
    "test": "react-scripts test"
  }
```

Redux库，使用createStore()函数创建store，返回的store对象包含一个内部变量state  
store对象的dispatch函数，使用state和action，去调用reducer函数，以获取最新状态  

store控制状态，reducer更新状态

需要说明的是，在添加和删除消息内容的时候，保存在数组中的消息列表，并没用使用数组自带的splice和push方法  
而是使用了concat方法，产生了新的数组  
这样避免了修改传入的state参数，从而使reducer函数保持是纯函数  

## 将Redux连接到React

本示例将MessageView组件、MessageInput组件以及App组件全部定义在App.js文件里，共用声明的store  
只是方便演示组件状态和组件数据的分离  
下一章是将store单独定义的示例  
