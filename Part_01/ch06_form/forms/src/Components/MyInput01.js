import React from 'react';

class MyInput01 extends React.Component {
    constructor(props){
        super(props);
        this.myRef=React.createRef();
    };
    onFormSubmit = (evt) =>{
        evt.preventDefault();
        console.log(this.myRef.current);
        console.log(this.myRef.current.value);
    };
    render(){
        return (
            <div>
                <h1>Sign Up Sheet</h1>
                <form onSubmit={this.onFormSubmit}>
                    <input placeholder='Name' ref={this.myRef} />
                    <input type='submit'/>
                </form>
            </div>
        );
    }
}

export default MyInput01;