# 组件和服务器

> create-react-app time_tracking_app_server  
> cd time_tracking_app_server  
> npm i --save express  

书中通过server.js和data.json模拟API和数据持久化  
如果在一台机器模拟这个实例，会出现端口(3000)占用的情况  
这里修改一下server.js。使用端口3001，并开启跨域访问请求，允许`http://localhost:3000` 的请求进入  

```javascript
    /* server.js */
    //app.set('port', (process.env.PORT || 3000));
    app.set('port', (process.env.PORT || 3001)); 
    
    app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    // 允许跨域访问的域名
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    // 明确列出允许跨域访问的方法（不要用‘*’代替，它只允许GET/POST通过）
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
    });
```

> node server.js //启动server  

然后修改client.js，以调用新的server API  

```javascript
    /* client.js */    
export default window.client = (function () {
  const server_somain = 'http://localhost:3001';
  function getTimers(success) {
    return fetch(server_somain+'/api/timers', {
        ...
```

注意，client.js中的每个对server API的调用，都要加上server_somain  

> 打开一个新的命令行工具  
> npm start  // 启动client react web app  
> Ctrl+C退出当前会话  

## curl

[curl](https://curl.se/)  
command line tool and library for transferring data with URLs (since 1998)  
![curl logo](curl-logo.svg)  

我们如果之前配置过其他开发环境(如.NET, Java, Python, C/C++或Rust等)，可能已经集成了这个工具  
可以在命令行使用`curl --help`查看  

> curl -X GET http://localhost:3001/api/timers  
> curl -X GET http://localhost:3001/api/timers | jq '.[]|{id}'  
> curl -X POST http://localhost:3001/api/timers -H "Content-Type: application/json" \  
> -d "{\"id\":\"zr_xqf-7r1asc-ymfWWuw\",\"title\":\"Hello\",\"project\":\"World\",\"elapsed\":0}"  
> curl -X PUT http://localhost:3001/api/timers -H "Content-Type: application/json" \  
> -d "{\"id\":\"zr_xqf-7r1asc-ymfWWuw\",\"title\":\"Hello1\",\"project\":\"World\",\"elapsed\":0}"  
> curl -X POST http://localhost:3001/api/timers/start -H "Content-Type: application/json" \  
> -d "{\"id\":\"zr_xqf-7r1asc-ymfWWuw\",\"start\":1}"  
> curl -X POST http://localhost:3001/api/timers/stop -H "Content-Type: application/json" \  
> -d "{\"id\":\"zr_xqf-7r1asc-ymfWWuw\",\"stop\":1}"  
> curl -X DELETE http://localhost:3001/api/timers -H "Content-Type: application/json" \  
> -d "{\"id\":\"zr_xqf-7r1asc-ymfWWuw\"}"  
