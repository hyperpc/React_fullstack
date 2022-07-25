import {useSelector, useDispatch } from 'react-redux';
import { OPEN_THREAD } from './chatBox';

function ThreadTabs(){
    const dispatch = useDispatch();
    const {activeThreadId, threads} = useSelector(state=>state.reducer);
    //console.log(activeThreadId);
    //console.log(threads);
    const tabs = threads.map((tab, index)=>(
        <div key={index} className={tab.id===activeThreadId?'active item':'item'}
            onClick={()=>dispatch(OPEN_THREAD(tab.id))}>
            {tab.title}
        </div>
    ));

    return (
        <div className='ui top attached tabular menu'>
            {tabs}
        </div>
    );
}

export default ThreadTabs;