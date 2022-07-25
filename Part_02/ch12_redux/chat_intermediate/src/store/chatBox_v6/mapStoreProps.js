
import { openThread, deleteMessage, addMessage } from './mapActionProps';

/**
 * ThreadTabs
*/
export const mapStateToTabsProps=(state)=>{
    //const {activeThreadId, threads} = useSelector(state=>state.reducer);
    const tabs = state.threads.map(t=>({
        title: t.title,
        active:t.id===state.activeThreadId,
        id:t.id
    }));
    return {
        tabs
    };
}

export const mapDispatchToTabsProps=(dispatch)=>({
    onClick:(id)=>dispatch(openThread(id))
})

/**
 * ThreadDisplay
*/
export const mapStateToThreadProps=(state)=>{
    //const {activeThreadId, threads} = useSelector(state=>state.reducer);
    return ({
    thread: state.threads.find(t=>t.id===state.activeThreadId)
});}

export const mapDispatchToThreadProps=(dispatch)=>({
    onMessageClick:(id)=>dispatch(deleteMessage(id)),
    dispatch:dispatch
})

export const mergeThreadProps=(stateProps, dispatchProps)=>({
    ...stateProps,
    ...dispatchProps,
    onSubmit:(text)=>dispatchProps.dispatch(addMessage(text, stateProps.thread.id))
});