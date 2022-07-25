import { OPEN_THREAD, DEL_MSG, ADD_MSG } from './chatBox';

export function deleteMessage(id){
    return DEL_MSG(id);
}

export function addMessage(text, threadId){
    return ADD_MSG({text:text, threadId:threadId});
}

export function openThread(id){
    return OPEN_THREAD(id);
}