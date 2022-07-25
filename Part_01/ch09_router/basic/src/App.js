import './App.css';
import React from 'react';
import Atlantic from './Components/Atlantic';
import Pacific from './Components/Pacific';
import BlackSeaRouter from './Components/BlackSeaRouter';
import AtlanticOcean from './Components/AtlanticOcean';
import Welcome from './Components/Welcome';
import {
  Link,
  Route,
  Routes,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
        <div className="ui text container">
            <h2 className="ui dividing header">
                Which body of water?
            </h2>
          <Router>
            <ul>
                {/* 9.2.4 router */}
                <li>
                    <Link to='/v1'>
                      <code>/v1</code>
                    </Link>
                </li>
                <li>
                    <Link to='/welcome'>
                      <code>/welcome</code>
                    </Link>
                </li>
                <li>
                    <Link to='/atlantic'>
                      <code>/atlantic</code>
                    </Link>
                </li>
                <li>
                    <Link to='/atlantic/ocean'>
                      <code>/atlantic/ocean</code>
                    </Link>
                </li>
                <li>
                    <Link to='/pacific'>
                      <code>/pacific</code>
                    </Link>
                </li>
                <li>
                    <Link to='/black-sea'>
                      <code>/black-sea</code>
                    </Link>
                </li>
            </ul>
            <hr/>
            <Routes>
              <Route path='/' element={<Welcome/>}>
                <Route path='/welcome' element={<Welcome/>} />
              </Route>
              <Route path='/v1' element={<Welcome/>}>
                <Redirect to='/atlantic'/>
              </Route>
              <Route path='/atlantic' element={<Atlantic/>} >
                <Route path='/ocean' element={<AtlanticOcean />} />
              </Route>
              <Route path='/atlantic/ocean' element={<AtlanticOcean />} />
              <Route path='/pacific' element={<Pacific/>} />
              <Route path='/black-sea' element={<BlackSeaRouter />} />
              <Route render={({location})=>(
                <div className='ui inverted red segment'>
                  <h3>Error! No matched for <code>{location.pathname}</code></h3>
                </div>
              )}/>
            </Routes>
          </Router>
        </div>
    );
  }
}

export default App;
