import './App.css';
import React from 'react';
import { RouterContext } from './Components/RouterContext';
import { createBrowserHistory } from "history";
import Link from './Components/Link';
import Route from './Components/Route';
import Atlantic from './Components/Atlantic';
import Pacific from './Components/Pacific';
import BlackSea from './Components/BlackSea';

class App extends React.Component {
  render() {
    let history = createBrowserHistory();
    history.listen(()=>this.forceUpdate());

    return (
        <div className="ui text container">
            <h2 className="ui dividing header">
                Which body of water?
            </h2>
          <RouterContext.Provider 
              value={{history:history, location: window.location}}>
            <ul>
                {/* 9.2.4 router */}
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
                <li>
                    <Link to='/black-sea'>
                      <code>/black-sea</code>
                    </Link>
                </li>
            </ul>
            <hr/>
            <Route path='/atlantic' component={Atlantic} />
            <Route path='/pacific' component={Pacific} />
            <Route path='/black-sea' component={BlackSea} />{/**/}
          </RouterContext.Provider>
        </div>
    );
  }
}

export default App;
