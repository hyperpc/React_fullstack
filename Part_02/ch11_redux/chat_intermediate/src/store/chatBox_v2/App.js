import Thread from './store/chatBox_v2/Thread';
import ThreadTabs from './store/chatBox_v2/ThreadTabs';

function App() {
  return (
    <div className='ui segment'>
      <ThreadTabs />
      <Thread />
    </div>
  );
}

export default App;
