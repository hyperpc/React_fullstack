import { createSlice, nanoid } from "@reduxjs/toolkit";

const initThreads = [{
    id:'1-fca2',
    title:'Buzz Aldrin',
    messages:[{
        id: nanoid(),
        text:'Twelve minutes to ignition',
        timestamp: new Date().toISOString()
    }]
},{
    id:'2-be91',
    title:'Michael Collins',
    messages:[]
}];

const chatBox = createSlice({
    name:'chatBox',
    initialState:{
        activeThreadId:'1-fca2',
        threads:initThreads /* [{
            id:'1-fca2',
            title:'Buzz Aldrin',
            messages:[{
                id: nanoid(),
                text:'Twelve minutes to ignition',
                timestamp: new Date().toISOString()
            }]
        },{
            id:'2-be91',
            title:'Michael Collins',
            messages:[]
        }] */    
    },
    reducers:{
        ADD_MSG(state, action){
            //console.log(state, action);
            state.threads = threads(state.threads, action);
        },
        DEL_MSG:(state, action)=>{
            //console.log(state, action);
            state.threads = threads(state.threads, action);
        },
        OPEN_THREAD:(state, action)=>{
            //console.log(state, action);
            state.activeThreadId = activeThreadId(state.activeThreadId, action);
        }
    }
});

/**
 * 此处定义的reducer函数无法生效。
 * 新版本应该是，已经不再支持这种写法
 */
/*
// 11.8
function reducer(state, action){
    return {
        activeThreadId: activeThreadIdReducer(state, action),
        threads: threadsReducer(state, action)
    

// 11.11
const reducer = combineReducers({
    activeThreadId,
    threads
});

*/

function activeThreadId(state='1-fca2', action){
    //console.log(state, action);
    if(action.type==='chatBox/OPEN_THREAD'){
        state = action.payload;
    }

    //console.log(state, action);
    return state;
}

function threads(state=initThreads, action){
    //console.log(state, action);
    switch(action.type){
        case 'chatBox/ADD_MSG':
        case 'chatBox/DEL_MSG':{
            const threadIndex = findThreadIndex(state, action);
            const oldThread = state[threadIndex];
            const newThread = {
                ...oldThread,
                messages: messagesReducer(oldThread.messages, action)
            };
            state = [
                    ...state.slice(0, threadIndex),
                    newThread,
                    ...state.slice(threadIndex+1, state.length)
            ];
            break;
        }
        default:{
            break;
        }
    }

    //console.log(state, action);
    //console.log(state[0]);
    return state;
}

function messagesReducer(state=[], action){
    switch(action.type){
        case 'chatBox/ADD_MSG':{
            const newMsg = {
                id: nanoid(),
                text:action.payload.text,
                timestamp:new Date().toISOString()
            };
            return state.concat(newMsg);
        }
        case 'chatBox/DEL_MSG':{
            return state.filter((m)=>m.id!==action.payload);
        }
        default:{
            return state;
        }
    }
}

function findThreadIndex(threads, action){
    switch(action.type){
        case 'chatBox/ADD_MSG':{
            return threads.findIndex((t)=>t.id===action.payload.threadId);
        }
        case 'chatBox/DEL_MSG':{
            return threads.findIndex((t)=>t.messages.find((m)=>m.id===action.payload));
        }
        default:{
            return 0;
        }
    }
}

export const { ADD_MSG, DEL_MSG, OPEN_THREAD } = chatBox.actions;
export default chatBox.reducer;
