import { createSlice, nanoid } from "@reduxjs/toolkit";

const chatBox = createSlice({
    name:'chatBox',
    initialState:{
        activeThreadId:'1-fca2',
        threads:[{
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
        }]
    },
    reducers:{
        ADD_MSG(state, action){
            //console.log(state, action);
            state.threads = threadsReducer(state.threads, action);
            /*
            const newMsg = {
                id: nanoid(),
                text:action.payload.text,
                timestamp:new Date().toISOString()
            };
            const threadIndex = state.threads.findIndex((t)=>t.id===action.payload.threadId);
            const oldThread = state.threads[threadIndex];
            const newThread = {
                ...oldThread,
                messages: oldThread.messages.concat(newMsg)
            };
            state.threads = [
                    ...state.threads.slice(0, threadIndex),
                    newThread,
                    ...state.threads.slice(threadIndex+1, state.threads.length)
            ];
            */
        },
        DEL_MSG:(state, action)=>{
            //console.log(state, action);
            state.threads = threadsReducer(state.threads, action);
            /*
            const threadIndex = state.threads.findIndex((t)=>t.messages.find((m)=>m.id===action.payload));
            const oldThread = state.threads[threadIndex];
            const newThread = {
                ...oldThread,
                messages: oldThread.messages.filter((m)=>m.id!==action.payload)
            };
            state.threads = [
                    ...state.threads.slice(0, threadIndex),
                    newThread,
                    ...state.threads.slice(threadIndex+1, state.threads.length)
            ];
            */
        },
        OPEN_THREAD:(state, action)=>{
            //console.log(state, action);
            //state.activeThreadId = action.payload;
            state.activeThreadId = activeThreadIdReducer(state.activeThreadId, action);
        }
    }
});

/**
 * 此处定义的reducer函数无法生效。
 * 新版本应该是，已经不再支持这种写法
 */
/*
function reducer(state, action){
    return {
        activeThreadId: activeThreadIdReducer(state, action),
        threads: threadsReducer(state, action)
    }
}
*/

function activeThreadIdReducer(state, action){
    //console.log(state, action);
    if(action.type==='chatBox/OPEN_THREAD'){
        state = action.payload;
    }

    //console.log(state, action);
    return state;
}

function threadsReducer(state, action){
    //console.log(state, action);
    if(action.type==='chatBox/ADD_MSG'){
        //console.log(state, action);
        const newMsg = {
            id: nanoid(),
            text:action.payload.text,
            timestamp:new Date().toISOString()
        };
        const threadIndex = state.findIndex((t)=>t.id===action.payload.threadId);
        const oldThread = state[threadIndex];
        const newThread = {
            ...oldThread,
            messages: oldThread.messages.concat(newMsg)
        };
        state = [
                ...state.slice(0, threadIndex),
                newThread,
                ...state.slice(threadIndex+1, state.length)
        ];
    } else if(action.type==='chatBox/DEL_MSG'){
        //console.log(state, action);
        const threadIndex = state.findIndex((t)=>t.messages.find((m)=>m.id===action.payload));
        const oldThread = state[threadIndex];
        const newThread = {
            ...oldThread,
            messages: oldThread.messages.filter((m)=>m.id!==action.payload)
        };
        state = [
                ...state.slice(0, threadIndex),
                newThread,
                ...state.slice(threadIndex+1, state.length)
        ];
    }

    //console.log(state, action);
    //console.log(state[0]);
    return state;
}

export const { ADD_MSG, DEL_MSG, OPEN_THREAD } = chatBox.actions;
export default chatBox.reducer;
//export default reducer;