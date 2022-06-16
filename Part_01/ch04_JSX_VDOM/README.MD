# JSX和虚拟DOM

虚拟DOM：  

- 使用高效的差异算法，以了解发生了哪些变化  
- 同时更新DOM的子树  
- 批量更新DOM  

虚拟DOM并不是影子DOM  

React的虚拟DOM是一个由ReactElement组成的树  
ReactElement是无状态且不可变的  
下一章介绍的ReactComponent具有交互性  

> create-react-app jsx  
> cd jsx  
> npm start  

表达式及布尔属性
"()","{}", "?:"

```javascript
  const disabledComponent = true;
    ...
      <ul>
        <li>Menu</li>
        {1===1 && (<ul><li>Submenu1</li></ul>)}
        {2===1 ? (<ul><li>Submenu2</li></ul>):(<ul><li>Submenu_unknown</li></ul>)}
        {3===3 && (<ul><li>Submenu3</li></ul>)}
      </ul>
      <input name='Name' title='Name' placeholder='This is a disabled input control' disabled={disabledComponent}/>
```

注释  

```javascript

/*
4.5
在普通react脚本中，注释方式与javascript一致  
*/

{/*
4.6
但是在JSX代码中，必须要在原来的注释格式，外层加上一对花括号  
*/}

```

扩展语法

```javascript
  const myprops = {name:'Name', title:'Name', placeholder:'This is an input control'};
  const myCssArray = ['class-name-1', 'class-name-2'];
    ...
      <MyComponent {...myprops} />
      <br />
      <input className={myCssArray.join(' ')} name='Name' title='Name' placeholder='This is an input control'/>
```

陷阱

JSX中，标签的class属性要写成className  
可以将多个class属性的值，放入一个数组，然后转换为字符串，赋值给className  

[classnames](https://github.com/JedWatson/classnames)扩展包可以非常好的管理这些复杂的class属性  

> npm i --save classnames  

```javascript
  const divClasses = classNames({
    box: true, // always apply the box class
    alert: true,//this.props.isAlert, // if the prop is set
    severity: true,//this.state.onHighAlert, // with state
    timed: false // never apply this class
  });
  const divObj = React.createElement(
    'div',
    {className: divClasses},
    React.createElement('h1', {}, 'Hello world')
  );
  ...
  {divObj}
```

JSX中的label标签，需要使用htmlFor属性替换for属性  

```javascript
    <label htmlFor='email'>Email</label>
    <input name='email' type='email' placeholder='user@test.com' />
```

HTML实体和表情符号  

```javascript
    <ul>
        <li>phone: &phone;</li>
        <li>start: &start;</li>
        <li>phone: {'\u0260e'}</li>
        <li>start: {'\u2606'}</li>
        <li>dolphin: {'\uD83D\uDC2C'}</li>
    </ul>
```

data-属性，是HTML规范未覆盖的属性  
对于其他的标准的Web可访问性的属性，可以在键前添加aria-即可  
