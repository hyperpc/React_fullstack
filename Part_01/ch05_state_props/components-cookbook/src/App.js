//import logo from './logo.svg';
import './App.css';
import Newspaper from './components/Article/Newspaper';
import Counter from './components/Counter/Counter';
//import CreateClassHeading from './components/Header/CreateClassHeading';
import Header from './components/Header/Header';
import CounterWrapper from './components/InitialState/CounterWrapper';
import Switch from './components/Switch/Switch';

function App() {
  return (
    <div className="App">
      {/* 5.10 */}
      <Newspaper />

      {/* 5.8 */}
      <Switch />
      <CounterWrapper />

      {/* 5.6 */}
      <Counter/>
      <Counter initialValue={1}/>

      {/* 5.3 */}
      {/*<CreateClassHeading/>*/}
      <Header headerText='Hi, everyone!'/>

      {/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */}
    </div>
  );
}

export default App;
