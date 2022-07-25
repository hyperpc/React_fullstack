import MessageList from './MessageList';
import TextFieldSubmit from './TextFieldSubmit';

function Thread(props){
    
    return(
        <div className='ui center aligned basic segment'>
            <MessageList messages={props.thread.messages}
                onClick={props.onMessageClick} />
            <TextFieldSubmit onSubmit={props.onSubmit} />
        </div>
    );
}

export default Thread;