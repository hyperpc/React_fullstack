import MessageList from './store/chatBox_v1/MessageList';
import MessageInput from './store/chatBox_v1/MessageInput';

function App() {
  return (
    <div className='ui segment'>
      <MessageList />
      <MessageInput />
    </div>
  );
}

export default App;
