# React Native

## 初始化

[官方文档](https://reactnative.dev/)  
[开发环境设置](https://reactnative.dev/docs/environment-setup)  

初学者，可以从脚手架[Expo CLI](https://docs.expo.dev/)开始开发  
安装VSCode插件[Expo Tools](https://marketplace.visualstudio.com/items?itemName=byCedric.vscode-expo)  
有经验的移动开发者可以使用React Native CLI，并且可能会用到Xcode或Android Studio  

> npm i -g expo-cli  
> expo whoami  
> cd ch16_reactNative  
> npx create-expo-app my-app #expo init AwesomeProject  
> cd my-app  
> npm start # or expo start  

## 路由

原生应用中的路由层，本身以栈格式进行结构化存储，大致是个数组  
React Native的路由切换，只是将路由推入或弹出路由栈  

## &lt;Navigator/&gt;

&lt;Navigator/&gt;是一个用于处理路由的React组件  
需要两个props：  
- configureScene()：详细说明要实现的过渡类型  
- renderScene()：确定下一步要渲染的UI组件  

Navigator.SceneConfigs.PushFromRight是默认的组件过渡方式  
其他还有FloadFromRight、FadeAndroid、HorizontalSwipeJump、VerticalDownSwipeJump等  
借助`react-native`库中的`Platform`，我们可以检查当前运行平台的系统  

## Web组件与原生组件

`<View />`：等同于Html中的`<div />`标签  
`<Text />`：所有要显示的纯文本都要在Text内，支持嵌套、样式和触摸事件`OnPress`  
`<Image />`：支持不同类型的图片显示；网络图片和`data`格式图片，需要手动设置尺寸  
`<TextInput />`：接收键盘输入的文本；支持自动纠错、自动首字母大写，placeholder和各种键盘类型(如数字键盘等)；支持事件有onChangeText、onSubmitEditing和onFocus  
`<TouchableHighlight />`：按下时，包裹视图的不透明度降低，从而允许参考底图颜色在视图中显示、变暗或着色；有且只有一个子组件  
`<TouchableOpacity />`：按下时，包裹视图的不透明度降低，使其变暗  
`<TouchableWithoutFeedback />`：除非你有很好的理由，否则不要使用  
`<Pressable />`：Pressable是一个核心组件包装器，可以在其定义的任何子级上检测触摸交互的各个阶段  
`<ActivityIndicator />`：显示圆形加载器  
`<ScrollView />`：滚动视图的组件，同时提供与触摸锁定“响应器”系统的集成；一次性加载全部子组件，有可能出现性能问题  
`<FlatList />`：平面列表的组件，延迟渲染项目，并删除滚动到屏幕外的项目，以节省内存和处理时间  
`<SectionList />`：与`<FlatList />`作用类似，但是支持分组列表  
`<VirtualizedList />`：只有需要比`<FlatList />`提供更多的灵活性时，才应该真正使用它  

## 样式

React Native的CSS样式规则可以通过style属性应用在大多数元素上  
且样式设置都是100%在JavaScript中完成的  
需要注意的是，有些CSS属性名中包括`-`，这里要替换成驼峰命名法展示  

```javascript
<View style={[{ backgroundColor:'green'}, {padding:10}]}>
    <Text style={{color:'blue', fontSize:25}}>
    Hello World!
    </Text>
</View>
```

将样式属性放在两对花括号内即可  
也可以放在数组中，以包含多组样式  

### StyleSheet

```javascript
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  containerText: {
    color: 'blue',
    fontSize: 20,
  },
});

class ExampleComponent extends Component {
  getBackgroundColor() {
    return {
      backgroundColor: 'yellow'
    };
  }

  render() {
    return (
      <View style={[ 
        this.getBackgroundColor(),
        styles.container 
      ]}>
        <Text style={styles.containerText}>
          Hello world
        </Text>
      </View>
    );
  }
}
```

### flexbox

当容器中的子组件大小未知，或内容动态，如果对子项进行布局、对齐和分配空间，CSS很难创建动态的、通用的布局  
这时候，flexbox可以轻松实现动态布局  
flexbox可以让父元素控制子元素的布局：父元素作为flex容器，子元素是flex项  

主轴、交叉轴  

默认地，React Native的主轴垂直，交叉轴水平，焦点在左下角  

flexDirection: column（默认）主轴垂直，交叉轴水平  
flexDirection: row，主轴水平，交叉轴垂直  

主轴的属性justifyContent: flex-start, center, flex-end, space-around, space-between, space-evenly(新增)  
交叉轴属性alignItems: flex-start, center, flex-end, stretch, baseline(新增)  

flex容器支持嵌套；整个UI都是构建在嵌套的flex容器上的  

### 其他动态布局

flex容器属性`flex:1`表示同一容器下的兄弟组件的相对宽度  
子元素上的样式属性`alignSelf`可以脱离父元素的`alignItems`限制，而单独设置自己的值  

值得注意的是，React Native的一些CSS属性默认值，与Web中的默认值是由一些区别的  

## HTTP请求

React Native的fetch API可以发出HTTP请求的抽象  

## promise

promise对象是值的包装器，对象实例化前，该值可能未知，多用于异步请求的代码  
通过promise，可以避免慢响应的请求处理的复杂性  
promise的`then()`函数，可以在链式调用中，处理上一个操作返回的结果  

## 一次性使用保证

一个promise在某一时刻只有以下三种状态的一个：  

- 等待中  
- 完成(resolved)  
- 拒绝(error)  

## 创建新promise

使用Promise构造函数创建新promise；它接收一个函数，需要两个参数：

- onSuccess(或resolve)函数：在成功解决时调用  
- onFail(或reject)函数：在失败拒绝时调用  

```javascript
// 1. constructor
var promise = new Promise(function(resolve, reject){
  //如果方法成功，则调用resolve()函数
  resolve(true);
})
promise.then(bool=>console.log('Bool is true'))

// 2. fetch: GET
const url = 'https://api.github.com';
export const getGithubUsers=({offset})=>{
  return fetch(`${baseUrl}/users?since=${offset}`)
  .then(response=>response.json())
  .catch(console.warn);
};

// 3. fetch: POST
export const makeGist = (
  activity,
  {description='', isPublic=true}={}
)=>fetch(`${baseUrl}/gists`,{
  method: 'POST',
  body:JSON.stringify({
    files:{
      'activity.json':{
        content:JSON.stringify(activity)
      }
    },
    description,
    public: isPublic
  })
}).then(response=>response.json());
```

[更多fetch的用法](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)  
里面介绍了请求的各种各类型及使用，如上传文件，Header，Body及浏览器兼容等  

杀割~  

撒花  
🎉🎉🎉  
🥳🥳🥳  
🎉🎉🎉  
