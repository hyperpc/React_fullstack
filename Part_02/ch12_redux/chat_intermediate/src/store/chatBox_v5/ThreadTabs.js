import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OPEN_THREAD } from './chatBox';
import Tab from './Tab';

function ThreadTabs(){
        const dispatch = useDispatch();
        const {activeThreadId, threads} = useSelector(state=>state.reducer);
        //console.log(activeThreadId);
        //console.log(threads);
        const tabs = threads.map(t=>({
            title: t.title,
            active: t.id===activeThreadId,
            id:t.id
        }));

        return (
            <Tab tabs={tabs}
                onClick={(id)=>dispatch(OPEN_THREAD(id))} />
        );
}

export default ThreadTabs;