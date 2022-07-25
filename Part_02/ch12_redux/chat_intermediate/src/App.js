//import logo from './logo.svg';
//import './App.css';
import ThreadTabs from './store/chatBox_v6/ThreadTabs';
import ThreadDisplay from './store/chatBox_v6/ThreadDisplay';

function App() {
  return (
    <div className='ui segment'>
      <ThreadTabs />
      <ThreadDisplay />
    </div>
  );
}

export default App;
