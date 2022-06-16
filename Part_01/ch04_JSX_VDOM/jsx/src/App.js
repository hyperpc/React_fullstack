import logo from './logo.svg';
import './App.css';
import MyComponent from './MyComponent';
import classNames from 'classnames';
import React from 'react';

function App() {
  const disabledComponent = true;
  const myprops = {name:'Name', title:'Name', placeholder:'This is an input control'};
  const myCssArray = ['class-name-1', 'class-name-2'];
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
  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      {/*4.6*/}
      <ul>
        <li>Menu</li>
        {1===1 && (<ul><li>Submenu1</li></ul>)}
        {2===1 ? (<ul><li>Submenu2</li></ul>):(<ul><li>Submenu_unknown</li></ul>)}
        {3===3 && (<ul><li>Submenu3</li></ul>)}
      </ul>
      <input name='Name' title='Name' placeholder='This is a disabled input control' disabled={disabledComponent}/>
      <br/>
      <MyComponent {...myprops} />
      <br />
      <input className={myCssArray.join(' ')} name='Name' title='Name' placeholder='This is an input control'/>
      {divObj}
      <label htmlFor='email'>Email</label>
      <input name='email' type='email' placeholder='user@test.com' />
      <br/>
      以下保留字符(&)和(;)的输出演示，以及使用Unicode字符的替换
      <ul>
        <li>phone: &phone;</li>
        <li>start: &start;</li>
        <li>phone: {'\u0260e'}</li>
        <li>start: {'\u2606'}</li>
        <li>dolphin: {'\uD83D\uDC2C'}</li>
      </ul>
    </div>
  );
}

export default App;
