# 组件

> create-react-app time_tracking_app  
> cd time_tracking_app  
> npm start  
> Ctrl+C退出当前会话  

在public/index.html文件添加如下引用：

```html
    <link rel="stylesheet" href="vendor/semantic-ui-dist/semantic.min.css">
    <link rel="stylesheet" href="style.css">
    ...
    <script src="vendor/seed/seed.js"></script>
```

书中源码使用[uuid](https://github.com/uuidjs/uuid)生成随机ID  
这里推荐社区建议的[nanoid](https://github.com/ai/nanoid)来代替  

<img src="nanoid.svg" alt="Nano ID logo by Anton Lovchikov" width="180" height="94" />

> npm i --save nanoid  

```javascript
    //id: uuid.v4(), // eslint-disable-line no-undef
    id: nanoid(),
```

自定义组件，名字必须大写字母开头  
小写字母开头，React会认为是标准的HTML标签,编译器识别不出  
