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
        },
        DEL_MSG:(state, action)=>{
            //console.log(state, action);
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
        },
        OPEN_THREAD:(state, action)=>{
            //console.log(state, action);
            state.activeThreadId = action.payload;
        }
    }
});

export const { ADD_MSG, DEL_MSG, OPEN_THREAD } = chatBox.actions;
export default chatBox.reducer;