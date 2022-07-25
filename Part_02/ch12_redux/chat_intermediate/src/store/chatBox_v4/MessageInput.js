import { useDispatch, useSelector } from 'react-redux';
import { ADD_MSG } from './chatBox';

function MessageInput() {
    let text='';

    const dispatch = useDispatch();
    const {activeThreadId} = useSelector(state=>state.reducer);

    return(
        <div className='ui input'>
            <input type="text" onChange={(e)=>{ text=e.target.value;}} />
            <button onClick={()=>dispatch(ADD_MSG({text:text, threadId:activeThreadId})) } 
                className="ui primary button" type='submit'>
                Submit
            </button>
        </div>
    );
}

export default MessageInput;