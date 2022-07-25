import Thread from './Thread';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, deleteMessage } from './mapActionProps';

/*
const ThreadDisplay = connect(
    mapStateToThreadProps,
    mapDispatchToThreadProps,
    mergeThreadProps
)(Thread);
*/

function ThreadDisplay(){
    const {activeThreadId, threads} = useSelector(state=>state.reducer);
    const activeThread = threads.find((t)=>t.id===activeThreadId);

    const dispatch=useDispatch();
    return (
        <Thread thread={activeThread} 
        onMessageClick={(id)=>dispatch(deleteMessage(id))} 
        onSubmit={(text)=>dispatch(addMessage(text, activeThreadId))} />
    );
}

export default ThreadDisplay;