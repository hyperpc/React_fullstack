//import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import TopBar from './Components/v1/TopBar';
import AlbumsContainer from './Components/v1/AlbumsContainer';
import './App.css';

function App() {
  return (
    <div className="ui grid">
      <TopBar />
      <div className='spacer row' />
      <div className='row'>
        {/* 9.3.3 */}
        {/*<AlbumsContainer />*/}

        {/* 9.3.4 */}
        <Routes>
          <Route path='/albums' element={<AlbumsContainer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
