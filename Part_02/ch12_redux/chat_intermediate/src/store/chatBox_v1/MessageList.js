import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { DEL_MSG } from './chatBox';

function MessageList(){
    const messages = useSelector(state=>state.reducer.messages);
    //console.log(messages);
    const dispatch = useDispatch();

    let messagesView = '';
    if(messages.length>0){
        messagesView = messages.map((m)=>{
            return (
                <div className='comment' key={m.id} onClick={()=>dispatch(DEL_MSG(m.id))}>
                    {m.text}
                    <span className='metadata'>@{m.timestamp}</span>
                </div>
        )});
        //console.log(messagesView);
    }

    return (
        <div className='ui center aligned basic segment'>
            <div className='ui comments'>
                {messagesView}
            </div>
        </div>
    );
}

export default MessageList;