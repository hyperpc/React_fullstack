# 单元测试

> create-react-app basic_modash  
> cd basic_modash  
> npm start  

书中示例借用babel-node完成测试用例，需要安装以下包：  

> npm i --save-dev @babel/core @babel/node  
> npm i --save-dev @babel/cli @babel/preset-env  
> ./node_modules/.bin/babel-node Modash.test.js  
> 具体配置细节，请参考源码  

鉴于babel的频繁更新，此处不再使用；而是通过react的测试库(Jest)来完成  

basic_modash应用编写了一个简单的工具库：Modash.js  
实现了三个常用的工具方法：  

- truncate(string, kength): 截取指定的字符串长度  
- capitalize(string): 首字母大写，其余小写  
- camelCase(string): 驼峰命名法，分隔符为空格、破折号或下划线的字符串，转换成驼峰命名  

## Jest

Jest使用了Jasmine的断言库  
Jest的默认配置下，自动模拟是关闭的  
Jest可以自动识别任何*.test.js和*.spec.js结尾的文件为测试文件  
同时也会查找__tests__文件夹下的测试文件(兼容旧版本)  

expect()函数进行断言  
toBe()一般适用于断言数字和布尔值  
toEqual()则适用于对象  

> npm test  

测试种类：  

- 集成测试：多个模块或软件系统的各部分一起测试的测试  
- 端到端测试：应用程序与外部服务(如API等)通信的测试  
- 单元测试：针对最小功能单元或组件的测试，不同单元间是隔离测试的  

浅渲染  

虚拟DOM中，之渲染一层深度的组件。对于子组件，只包含对子组件的引用，而不会渲染。这样在单元测试的时候，可以隔离父子组件的测试  

优势：

- 对组件进行单独测试  
- 更快。避免真实DOM的开销  

## Enzyme

Enzyme是封装了react-test-renderer的库  
Enzyme.shallow()将返回一个EnzymeWrapper对象，内部嵌套了虚拟DOM中的浅渲染组件  

目前的情况是，Enzyme迭代极度缓慢。React官方已经推出@18版本的情况下，Enzyme官方还没有支持React17  
相比较而言，Jest更新比较及时  

从项目的长期发展来看，建议使用官方的测试库或更新比较活跃的库，如Jest

```javascript
describe('My Forms', ()=>{
    test('"Items" should have the `th`',()=>{
        render(<MyForm />);
        const header = screen.getByTestId('items');
        expect(header.tagName.toLowerCase()).toBe('th');
    });
});
```

describe()是给相关的单元测试，进行逻辑分组；它是可选的  
it()或test()是具体的单元测试；它是必须的  

需要渲染快照的单元测试，请提前安装如下包：  

> npm i --save-dev react-test-renderer  

需要注意的是，如果随着项目的代码升级，某些单元测试可能已经不再使用快照，就需要将之前生成的快照文件从本地删除  
虽然不删除也不影响单元测试的结果，但是结果会有警告信息，表示有些快照已经过时  

./src/Components/MyForm.test.js中，演示了如何测试input标签和button按钮的相关属性和事件  

## 应用程序级别的单元测试

本节使用上一章完成的food-lookup应用程序，来编写单元测试  
如果出现SemanticUI的样式问题，请参考上一章的解决方案  

> cd food-lookup  
> npm i  
> node server.js  
> cd client  
> npm i  
> npm start  

## 模拟

Jest附带的一个生成器，可供用于测试替身的强大功能  
jest.fn  
这个函数的特殊之处，就是会跟踪调用  

jest.mock('../src/Client')可以创建Client服务的伪对象，并具有类似的属性和模拟方法  

## 测试覆盖率

> npm run test:w  

Istanbul是生成测试统计数据的工具  
在生成的coverage目录下，打开./coverage/lcov-report/index.html，就可以在浏览器查看详细报表  
