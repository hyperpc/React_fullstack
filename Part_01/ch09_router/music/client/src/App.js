//import logo from './logo.svg';
import { Route, Routes, Redirect } from 'react-router-dom';
import TopBar from './Components/v4/TopBar';
import AlbumsContainer from './Components/v4/AlbumsContainer';
import Login from './Components/v4/Login-1';
import Logout from './Components/v4/Logout';

import './App.css';
import { PrivateRoute } from './Components/v4/PrivateRoute';

function App() {
  return (
    <div className="ui grid">
      <TopBar />
      <div className='spacer row' />
      <div className='row'>
        {/* 9.3.3 */}
        {/*<AlbumsContainer />*/}

        {/* 9.3.4 */}
        {/*
        <Routes>
          <Route path='/albums' element={<AlbumsContainer />} />
        </Routes>
        */}

        {/* 9.3.6 */}
        {/*
        <Routes>
          <Route path='/' element={<AlbumsContainer />}>
            <Redirect to='/albums' />
          </Route>
        </Routes>
        */}

        {/* 9.4 */}
        <Routes>
          <Route path='/albums' element={<AlbumsContainer />} />
          <PrivateRoute path='/albums' element={<AlbumsContainer />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/' element={<AlbumsContainer />}>
            <Redirect to='/albums' />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
