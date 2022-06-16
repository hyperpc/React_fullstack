# 表单

> create-react-app forms  
> cd forms  
> npm start  

## 事件

onClick函数接收一个evt参数，也就是SyntheticMouseEvent对象。  
该对象只是一个跨浏览器的包装器，包装了浏览器原生的MouseEvent对象  
所以，可以通过nativeEvent属性访问原始的原生事件  

## 文本输入

JSX中的虚拟DOM标签，通过React.createRef()添加ref属性，通过this.myRef.current得到其引用,this.myRef.current.value得到其值  
但是这种使用refs的方式，就无法发挥React的主要优势  
map()方法中的迭代函数，通过箭头语法，可以在不显示的使用return情况下返回元素  

非受控组件：比如示例中的input，用户可以选择输入或不输入，React不干涉其组件行为，也无法渲染其变化  
只能通过refs属性得知input的状态和值的变化  
受控组件：组件的值由React的render()方法和应用程序的状态指定。可以检查state对象，而预测应用的外观  

非受控组件转换为受控组件：  

- 在state的某处存储它的值  
- 在state内提供一个位置作为它的value属性  
- 添加一个onChange处理程序，更新其值  

### 验证

> npm i --save validator  

导入isEmail子包，只需要验证email即可  

```javascript
import isEmail from 'validator/lib/isEmail';
```

### 创建Field组件

创建Field组件，以支持实时验证，并未不同字段提供不同的验证需求  
附表但不必跟踪每个字段的验证结果，字段组件自己包含验证结果  
字段组件可以实时验证格式  

./forms/src/Components/MyFormField.js  
./forms/src/Components/MyFormFieldValidation.js  

## 远程数据

由于书中所讲课程选择的示例，有级联刷新的功能，所以需要定义生命周期函数: getDerivedStateFromProps()  
同时，在每个下拉选中的函数中，需要注册onChange属性  
还有，本节声明的apiClient()函数，故意设置了1秒的延迟，以演示异步刷新的效果  

```javascript

    static getDerivedStateFromProps(update){
        return{
            department: update.department,
            course:update.course
        };
    };
    
    onSelectDepartment = (evt) => {
        const department = evt.target.value;
        this.setState({department:department});
        this.props.onChange({name:'department', value:department});
        
        if(department){
            this.fetch(department);
        }
    };
    onSelectCourse = (evt) => {
        const course = evt.target.value;
        this.setState({course:course});
        this.props.onChange({name:'course', value:course});
    };
```

## 异步持久性

本节声明的apiClient是对localStorage的简单封装  

```javascript
let apiClient = {
  loadPeople: function() {
    return {
      then: function(cb) {
        setTimeout(() => {
          cb(JSON.parse(localStorage.people || '[]'));
        }, 1000);
      }
    };
  },

  savePeople: function(people) {
    const success = !!(this.count++ % 2);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!success) return reject({success});

        localStorage.people = JSON.stringify(people);
        return resolve({success});
      }, 1000);
    });
  },

  count: 1
};
```

另外，本示例会以state中的保存状态为键，对应的按钮为值，以在不同状态下展示不同的提交按钮：  

```javascript
{
    {
        SAVING: <input value="Saving..." type="submit" disabled />,
        SUCCESS: <input value="Saved!" type="submit" disabled />,
        ERROR: (<input value="Save Failed - Retry?" type="submit" disabled={this.validate()} />),
        READY: (<input value="Submit" type="submit" disabled={this.validate()} />)
    }[this.state._saveState]
}
```

## Redux

<b style="color:red;">暂时跳过，请在第10，11，12章之后再来看这一节</b>  

## 表单模块

- formsy-react  
- react-input-enhancements  
- tcomb-form  
- winterfell  
- react-redux-form  
