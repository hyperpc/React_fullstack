//import logo from './logo.svg';
//import './App.css';
import Thread from './store/chatBox_v3/Thread';
import ThreadTabs from './store/chatBox_v3/ThreadTabs';

function App() {
  return (
    <div className='ui segment'>
      <ThreadTabs />
      <Thread />
    </div>
  );
}

export default App;
