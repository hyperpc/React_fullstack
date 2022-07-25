import Tab from './Tab';
import { useSelector, useDispatch } from 'react-redux';
import { openThread } from './mapActionProps';

/*
const ThreadTabs = connect(
    mapStateToTabsProps,
    mapDispatchToTabsProps
)(Tab);
*/

function ThreadTabs(){
    const {activeThreadId, threads} = useSelector(state=>state.reducer);
    const tabs = threads.map(t=>({
        title: t.title,
        active: t.id===activeThreadId,
        id:t.id
    }));

    const dispatch=useDispatch();
    return (
        <Tab tabs={tabs} onClick={(id)=>dispatch(openThread(id))} />
    );
}


export default ThreadTabs;