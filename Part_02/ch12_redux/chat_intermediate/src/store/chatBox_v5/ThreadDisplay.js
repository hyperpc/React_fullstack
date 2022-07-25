import {useSelector, useDispatch } from 'react-redux';
import { DEL_MSG, ADD_MSG } from './chatBox';
import Thread from './Thread';

function ThreadDisplay(){
    const dispatch = useDispatch();
    const {activeThreadId, threads} = useSelector(state=>state.reducer);
    const activeThread = threads.find((t)=>t.id===activeThreadId);

    return (
        <Thread thread={activeThread} 
        onMessageClick={(id)=>dispatch(DEL_MSG(id))} 
        onSubmit={(text)=>dispatch(ADD_MSG({text:text, threadId:activeThreadId}))} />
    );
}

export default ThreadDisplay;