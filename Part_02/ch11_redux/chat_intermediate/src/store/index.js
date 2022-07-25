import { configureStore } from "@reduxjs/toolkit";
//import reducer from './chatBox_v1/chatBox';
//import reducer from './chatBox_v2/chatBox';
//import reducer from './chatBox_v3/chatBox';
import reducer from './chatBox_v4/chatBox';

export const store = configureStore({
    reducer:{
        reducer
    }
});