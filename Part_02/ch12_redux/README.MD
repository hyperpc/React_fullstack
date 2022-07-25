# 表示组件、容器组件和Redux一起使用

本章示例依然使用上一章的工程  

> create-react-app chat_intermediate  
> cd chat_intermediate  
> npm i --save-dev @reduxjs/toolkit react-redux  
> npm start  

## 拆分组件

视图组件：只负责渲染HTML的组件，接收容器组件中的props，作为数据源和事件定义；而不是直接与Redux store交互  
容器组件：指定视图组件应该渲染的数据，和行为  

从ThreadTabs.js组件拆分出无状态函数组件Tabs.js，也叫视图组件  
将父组件-容器组件的props作为参数传入  

从Thread.js组件演化成ThreadDisplay.js容器组件，  
然后是Thread.js视图组件，  
然后是TextFieldSubmit.js和MessageList.js视图组件  

经过这样的拆分，叶子节点不会直接分配Redux动作(reducer)，而是将Redux store的作用范围隔离在容器组件这一层  
这样，视图组件可以更方便的被应用程序的其他部分重用  
如果想要从Redux切换成其他的状态管理模式，也更方便，只需要修改src/index.js和相关的容器组件即可  

## 使用react-redux库创建容器组件

Provider组件  
使用react-redux库中的Provider组件，可以将App.js组件包装其中，以使store在App内全局有效  

将所有容器组件内，所有直接引用store的动作和数据的地方，全部提取到mapActionProps.js文件内  
然后重写顶层容器组件ThreadTabs.js和ThreadDisplay.js  
(书中的connect写法，已不再推荐；redux官方建议使用hook)  

## 使用动作创建器

动作创建器，可以将所有引用reducer内的动作的地方集中于一处，mapActionProps.js  
对React组件隐藏动作的type和属性名等  

## 异步性和服务器通信

redux-thunk是一款解决异步性的最受欢迎的轻量级中间件之一
