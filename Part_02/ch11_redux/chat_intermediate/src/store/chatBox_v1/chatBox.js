import { createSlice, nanoid } from "@reduxjs/toolkit";

const chatBox = createSlice({
    name:'chatBox',
    initialState:{
        messages:[]
    },
    reducers:{
        ADD_MSG(state, action){
            //console.log(state, action);
            state.messages = state.messages.concat({
                id:nanoid(), 
                text:action.payload.itext,
                timestamp:new Date().toISOString()
            });
        },
        DEL_MSG:(state, action)=>{
            //console.log(state, action);
            state.messages = state.messages.filter((m)=>m.id!==action.payload);
        }
    }
});

export const { ADD_MSG, DEL_MSG } = chatBox.actions;
export default chatBox.reducer;