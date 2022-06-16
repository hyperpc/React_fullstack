
# 第一个React Web应用程序

> create-react-app voting_app  
> cd voting_app  
> npm start  
> Ctrl+C退出当前会话  

## Semantic UI React

[Official Docs](https://react.semantic-ui.com/)  
[Get Started](https://react.semantic-ui.com/usage/)  

> npm i --save semantic-ui-react semantic-ui-css  

在index.html文件添加如下引用：

```html
    <link rel="stylesheet" href="vendor/semantic-ui-dist/semantic.min.css">
    <link rel="stylesheet" href="style.css">
    ...
    <script src="vendor/seed/seed.js"></script>
```

由于SemanticUI样式文件中引用的字体，是直接指向了google的资源服务器  
因为网络原因，可能会有失败的情况  
在每章示例代码中，我已经将对应的字体文件样式，指向到本地的路径  
请参照对应的目录：./public/fonts, ./public/semantic-ui-dist/local.google.fonts.css  

React.createElement可以创建DOM元素，但是推荐使用JSX  
JSX代码最终也会编译成vanilla JavaScript(原生JavaScript：React.createElement)，
但是实现了轻量级的抽象，带来了更高的可读性和可维护性  

React自带的特殊API，React会自动将this变量绑定到当前组件  
当自定义组件方法时，可以在构造方法中，手动将this绑定到自己的组件  
然后，每当执行自定义方法时，this将指向该组件，而不是null  

```javascript
    constructor(props){
        super(props);
        this.handleUpVote = this.handleUpVote.bind(this);
    }
    handleUpVote(){
        this.props.onVote(this.props.id);
    }
```

最新版本的React支持通过箭头函数自定义组件方法,  
这种方式可以避免在constructor构造函数里手动绑定自定义方法了  

```javascript
    handleProductUpVote=(productId)=>{
        const nextProducts = this.state.products.map((product)=>{
            if(product.id===productId){
                return Object.assign({}, product, {
                    votes:product.votes+1
                });
            }else{
                return product;
            }
        });
        this.setState({products:nextProducts});
    }
```

注意方法handleProductUpVote(productId)中，Object.assign会经常被使用，以避免改变原始对象  

值得注意的是，React要求JSX中的&lt;a&gt;必须要有有效的href属性，负责会出现警告信息  
一个变通的方案是：使用&lt;button&gt;代替&lt;a&gt;，并将其样式保持一致即可  
[参考](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/112261cbc84f5b7d74de9b427b529a10b41faece/docs/rules/anchor-is-valid.md)  

constructor构造函数中可以初始化this.state: this.state=[];  
新版本的React已经支持在constructor外部也可以初始化state等属性  

```javascript
class ProductList extends React.Component{
    state={
        products:[]
    };
    ...
}
```

在其他的方法或函数中只能通过setState方法修改state的内容  
原则上，应该视state为不可变的，如果“侥幸”修改了state，应该视为不规范的  

```javascript
    this.setState({nums:[1,2,3]});
    const newNums = this.state.nums.concat(4); //concat会创建新对象(不同于push(4))，以避免修改原对象
    console.log(this.state.nums); //[1,2,3]
    console.log(newNums); //[1,2,3,4]
```
