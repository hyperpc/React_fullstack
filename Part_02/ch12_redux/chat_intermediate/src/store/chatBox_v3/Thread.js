import {useSelector, useDispatch } from 'react-redux';
import { DEL_MSG } from './chatBox';
import MessageInput from './MessageInput';

function Thread(){
    const dispatch = useDispatch();
    const {activeThreadId, threads} = useSelector(state=>state.reducer);
    const activeThread = threads.find((t)=>t.id===activeThreadId);

    let messagesView = '';
    if(activeThread.messages.length>0){
        messagesView = activeThread.messages.map((m)=>{
            return (
                <div className='comment' key={m.id} onClick={()=>dispatch(DEL_MSG(m.id))}>
                    {m.text}
                    <span className='metadata'>@{m.timestamp}</span>
                </div>
        )});
        //console.log(messagesView);
    }

    return(
        <div className='ui center aligned basic segment'>
            <div className='ui comments'>
                {messagesView}
            </div>
            <MessageInput />
        </div>
    );
}

export default Thread;