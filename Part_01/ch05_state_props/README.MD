# 具有props、state和children的高级组件配置

> create-react-app components-cookbook  
> cd components-cookbook  
> npm start  

源码中使用了[React Styleguidist](https://react-styleguidist.js.org/)构建工具  
~~我们暂时没有使用~~  

> npm i --save-dev react-styleguidist  

在package.json添加如下配置：  

```json
{
  "scripts": {
        ...
        "styleguide": "styleguidist server",
        "styleguide:build": "styleguidist build"
  }
}
```

如果不修改配置，可以选择在终端直接执行以下命令：  

> npx styleguidist server  
> npx styleguidist build  

npx是npm的一部分，它可以执行本地安装的styleguidist包  

## ReactComponent

创建ReactComponent的两种方式：  

(1)createReactClass()函数  

```javascript
import createReactClass from 'create-react-class';

const CreateClassApp = createReactClass({
    render(){ return function () { }}
});

export default CreateClassApp;
```

(2)ES6类：class

```javascript
import React from 'react';

class ComponentApp extends React.Component{
    render(){return (<h1>return</h1>);}
}

export default ComponentApp;
```

> 必须说明的是，React官方已不再支持createReactClass()函数的使用  
> 在我们的项目中，尽量使用ES6来实现相关功能。  
> 如果开发环境或生产环境不支持ES6，就需要单独安装`create-react-class`包来使用  
> npm i --save-dev create-react-class  

render()方法是在ReactComponent上定义的唯一必须的方法  
React期望render()方法返回单个子元素。它可以是DOM组件的虚拟表示，也可以返回null或false这类的假值。  
React会渲染一个空元素(&lt;noscript&gt;)来处理假值，用于从页面上删除该标签  

在React中，props是从父组件传递到子组件的不可变数据片段，以DOM标签属性的方式接受数据  
state是组件私有的，且可变的，用以保存组件本地数据  
如果组建的state发生变化，组件就需要重新渲染  
context是一种通过整个组件树传递的“隐式props”  

可以通过props传递任何Javascript对象：基本数据类型、简单的JavaScript对象、原子操作、函数等，甚至其他的React元素和虚拟DOM节点  
可以使用props记录组件的功能  
可以使用PropTypes指定每个属性的类型  

## PropTypes

```javascript
import PropTypes from 'prop-types';

class MapComponent extends React.Component{
    static propTypes = {
        lat: PropTypes.number,
        lng: PropTypes.number,
        zoom:PropTypes.number,
        place:PropTypes.object,
        markers:PropTypes.array
    };
}
```

以上代码，定义了一个静态(类)propTypes属性来定义PropTypes  
组件会根据这个类的定义，来验证props的值类型是否正确  

更多关于PropTypes的信息，请参看附录A-PropTypes  

## getDefaultProps()获取默认props

```javascript
//Counter.js
class Counter extends React.Component{
    static defaultProps = {
        initialValue:2
    };

    render(){
        return <h1>{this.props.initialValue}</h1>
    }
}

//App.js
      <Counter/>
      <Counter initialValue={1}/>
```

## 上下文

> create-react-app context-theme  
> cd context-theme  
> npm start  

上下文API：React.createContext(param)会创建一个“全局”公开的属性  
React通过上下文的Provider组件传递上下文内容给React树，通过Provider组件的子组件Consumer访问该上下文  
/context-theme/components/ThemeToggleButton.js的例子，演示了嵌套的子组件如何更新上下文  

如果项目中定义了多个上下文组件，React也支持在一个子组件中同时访问多个上下文内容  
/context-theme/context/AppUser.js的例子，演示了多个上下文的使用  
但是，如果多个上下文经常同时使用，最好创建一个新的组件来实现同样的功能。React建议一个上下文队医一个树节点，以保持DONM渲染的效率  
这一节参考了官方的文档和示例，点[这里](https://reactjs.org/docs/context.html)查看更多  

注意，在访问多个上下文时，React只能访问包裹(Consumer)的创建者(Provider)拥有的上下文  
/context-theme/components/Body.js的例子，演示了这样的错误：ThemeContext.Provider包裹的子组件Body，是无法访问UserContext.Consumer的  

## state

包含本地可变数据的组件，称为有状态组件  
React建议，尽可能少用有状态组件，因为state的引入，造成了组件组合的复杂性  
而且，setState()方法会触发刷新，影响性能。要注意setState()的调用频率  

示例代码/components/InitialState/CounterBase.js和/components/InitialState/CounterBaseBetter.js，展示了如何更好的使用setState()  

```javascript
    //CounterBaseBetter.js
    decrement = () => {
        this.setState(preState => {
            return{
                value: preState.value<1 ? 0:preState.value-1
            }
        });
    };
```

尽量减少放入状态中的信息量。信息量越小、越可序列化(转换为JSON)，效果越好  
程序会更快，结果更容易推断  
一种实践方案是：使用多个无状态组件(不保存状态的组件)，组成一个有状态组件来构建应用  
或者借助第三方工具，如Flux等  

## 无状态组件

无状态组件，是轻量级的组件，不需要对组件进行任何特殊处理  
对于不是以类的方式出现的无状态组件，内部无法使用this，因为无法找到类的实例  
它只是一个函数，不包含状态，也不会被普通的组件生命周期方法调用  
React允许我们在无状态组件上使用propTypes和defaultProps  

React团队声明，以后会为函数式组件引入更多的性能改进  

尽可能使用无状态组件的一个明显准则是：如果只需要一个渲染函数，而无须任何生命周期方法，就应该选择使用无状态组件  
参考示例代码/components/Switch/steps/Switch5.js和/components/Switch/steps/Switch6-Stateless.js  
Switch6-Stateless.js将Switch5.js里的renderChoice函数，隔离到外部的Choice函数  
Choice函数是无状态函数，只能通过props向下传递参数，只是间接的调用setState()函数  
这时的Choice无状态组件，达到了可重用的目的  

## 使用props.children与子组件对话

React提供了一些特殊的props  
props.children引用组件树中对应的子组件  

React.Children和this.props：  
1、React.Children是顶层API之一，它是react提供的一个工具方法。
2、 this.props对象的属性与组件的属性一一对应，但是有一个例外，就是this.props.children属性。它表示组件的所有子节点。  
3、this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是array  

oneOf和oneOfType：  

```javascript
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
        ///
        children: PropTypes.oneOf(['child1', 'child2'])
    };
```

React.Children.map()和React.Children.forEach()两个函数的区别：  

- map返回值是回调函数结果的数组/components/Article/MultiChildContainer.js  
- forEach不收集结果  

React.Children.toArray()函数，可以把props.children的数据结构，转换为子元素的数组  
