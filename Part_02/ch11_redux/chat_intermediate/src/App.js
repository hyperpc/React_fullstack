//import logo from './logo.svg';
//import './App.css';
import Thread from './store/chatBox_v4/Thread';
import ThreadTabs from './store/chatBox_v4/ThreadTabs';

function App() {
  return (
    <div className='ui segment'>
      <ThreadTabs />
      <Thread />
    </div>
  );
}

export default App;
