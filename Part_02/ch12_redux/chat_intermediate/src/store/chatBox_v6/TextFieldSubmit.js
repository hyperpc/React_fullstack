
function TextFieldSubmit(props) {
    let text='';

    return(
        <div className='ui input'>
            <input type="text" onChange={(e)=>{ text=e.target.value;}} />
            <button onClick={()=>props.onSubmit(text) } 
                className="ui primary button" type='submit'>
                Submit
            </button>
        </div>
    );
}

export default TextFieldSubmit;