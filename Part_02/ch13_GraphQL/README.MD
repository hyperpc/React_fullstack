# 使用GraphQL

GraphQL: Graph Query Language 图形查询语言  

GraphQLHub，一个GraphQL服务  
[https://www.graphqlhub.com/graphql](https://www.graphqlhub.com/graphql)  

```javascript
# request
curl - H 'Content-Type:application/graphql' -XPOST https://www.graphqlhub.com/graphql?pretty=true-d '{ hn { topStories(limit:2) {title url}}}'

# response
{
    "data":{
        "hn":{
            "topStories":[{
                "title":"Dropbox as a Git Server",
                "url":"http://www.anishathalye.com/2016/04/25/dropbox-as-a-true-git-server/"
            }]
        }
    }
}
```

## GraphQL的优点

首先，通过声明希望从服务器获得的确切数据，而服务器也不会隐式地返回其他多余的数据  
其次，更好地支持单元测试和集成测试  
然后，无冗余数据的设计，提高了应用性能，尤其是对网络请求流量敏感的移动端  
还有，GraphQL的类型系统，提供了一种生动的自文档形式，还有各种工具，如GrapgiQL  
最后，GraphQL的声明性和React的声明性可以很好的匹配，如Facebook的Relay框架，将React组件和GraphQL服务器连接  

GraphQL不局限React，任何传统调用API的地方，包括Angular、Backbone等，都可以

GraphiQL是Faceboo开发，内置于浏览器的IDE。可通过GraphQLHub查看  
其中的docs在线帮助文档，可以查找服务器上的数据结构，以帮助开发者编写请求结构  

## GraphQL语法

发送到服务器的查询字符串，称为文档  
一个文档包含一个或多个操作(查询或变更)  
每个操作必须有唯一的名称  
但是，GraphQL规范要求，服务器只执行文档中的一个操作。这主要是基于性能方面的考量  

GraphQL规定，每个操作的字段必须指定到标量类型(即基本类型)；涉及的复杂类型，必须详细到最终的标量类型  
这意味着，GraphQL的查询必须是明确的，它是只获取所需数据的协议  

字段可以有参数，甚至可以将字段看作函数，其参数类型，与字段的要求类似，必须是标量类型  
参数默认是可以省略的  

## 复杂类型

联合(union)

是多个标量或复杂对象的组合机制。或者说，每次请求的结果是定义的组合中的类型中的其中一种，但不确定具体是哪一种  

片段(fragment)

指定只返回某复杂对象中的某些字段，称为片段  
支持重用机制。可以在一处声明好一个片段，在文档中其他地方可以通过片段名，重用这个片段  

接口(interface)

与其他编程语言的接口类似，实现接口的对象类型，会包含接口定义的所有字段  
GraphQL支持一个对象继承多个接口  

## 探索Graph

这里的Graph，并非可视乎的图，而是数学意义上的图  

图，由表示对象的节点，以及链接节点的边组成  

## 图节点

所有节点的ID都应该是全局唯一的。如ID为"1"的用户和ID为"1"的图片是无效的，二者冲突  
可以在给ID字段加上有意义的前缀，以避免这种冲突  

## Viewer

GraphQL的顶级字段Viewer，表示当前用户，及与该用户的连接  
Viewer可以容易地实现授权逻辑，以防止不同用户的消息被错误返回  

## 图的连接和边

通常地，如果结果集很大，会分页返回；但这样对一些实时数据不太友好  
GraphQL通过字符串类型的游标，来指定列表中接下来要加载的位置  

## 变更

变更(mutation)，不同于一般的查询操作(query)  
它是GraphQL将更新的数据状态，写入服务器，并返回特定数据的操作  

## 订阅

后来添加的一种操作类型，subscription  
GraphQL不关心订阅的具体细节，它只支持有限的可能事件列表  

## GraphQL和JavaScript结合使用

对于旧时代(非ES2015)的Web应用，可以通过jQuery的AJAX，甚至原生XmlHttpRequests，发起GraphQL请求  
而随着ES2015中fetch的普及，新的Web应用可以通过fetch更方便的发起类似请求  

```javascript
var query='{ graphQLHub }';
var options={
    method:'POST',
    body:query,
    headers:{
        'content-type':'application/graphql'
    }
};

fetch('https://graphqlhub.com/graphql', options).then((res)=>{
    return res.json();
}).then((data)=>{
    console.log(JSON.stringify(data,null,2));
});
```

## GraphQL与React结合使用

Relay，这是二者最有前景的发展方式  
Relay作为二者的粘合剂，将二者的很多最佳实践，实现了自动化，如缓存、缓存清除和批处理  
Relay的新兴替代方案：Apollo。包含react-apollo的项目合集  
Apollo允许类似于Relay的方式放置视图和GraphQL查询，但是通过Redux在后台存储GraphQL缓存和数据  
