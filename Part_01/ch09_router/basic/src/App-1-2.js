import './App.css';
import React from 'react';
import {createBrowserHistory}  from 'history';

const Route = ({path, component})=>{
  const pathname = window.location.pathname;
  if(pathname.match(path)){
    return(React.createElement(component));
  } else {
    return null;
  }
};

const history = createBrowserHistory();
const Link = ({to, children})=>(
  <a onClick={(e)=>{
      e.preventDefault();
      history.push(to);
    }}
    href={to} >{children}</a>
);

class App extends React.Component {
  componentDidMount(){
    history.listen(()=>this.forceUpdate());
  }
  
  render(){
    return (
      <div className="ui text container">
        <h2 className="ui dividing header">
          Which body of water?
        </h2>
        <ul>
          {/* 9.2.2 route */}
          {/*
          <li>
            <a href='/atlantic'>
              <code>/atlantic</code>
            </a>
          </li>
          <li>
            <a href='/pacific'>
              <code>/pacific</code>
            </a>
          </li>
          */}

          {/* 9.2.3 link */}
          <li>
            <Link to='/atlantic'>
              <code>/atlantic</code>
            </Link>
          </li>
          <li>
            <Link to='/pacific'>
              <code>/pacific</code>
            </Link>
          </li>
        </ul>
        <hr/>
        <Route path='/atlantic' component={Atlantic} />
        <Route path='/pacific' component={Pacific} />
      </div>
    );
  }
}

const Atlantic = ()=>(
  <div>
    <h3>Atlantic Ocean</h3>
    <p>
      The Atlantic Ocean covers approximately 1/5th of the surface of earth.
    </p>
  </div>
);

const Pacific = () =>(
  <div>
    <h3>Pacific Ocean</h3>
    <p>
      Ferdinand Magellan, a Portuguese explore, named the ocean 'mar pacifico' in 1521, which means peaceful sea.
    </p>
  </div>
);

export default App;
