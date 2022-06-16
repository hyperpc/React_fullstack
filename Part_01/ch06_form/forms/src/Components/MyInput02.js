import React from 'react';

class MyInput02 extends React.Component {
    //static displayName = 'MyInput02';
    state = {names:[]};

    constructor(props){
        super(props);
        this.myRef=React.createRef();
    };
    onFormSubmit = (evt) =>{
        const name = this.myRef.current.value;
        console.log(name);
        if(name !==undefined && name !== ''){
        const names = [...this.state.names, name];
        this.setState({names:names});
        this.myRef.current.value='';
        }
        evt.preventDefault();
    };
    render(){
        return (
            <div>
                <h1>Sign Up Sheet</h1>
                <form onSubmit={this.onFormSubmit}>
                    <input placeholder='Name' ref={this.myRef} />
                    <input type='submit'/>
                </form>
                <div>
                    <h3>Names</h3>
                    <ul>
                        { this.state.names.map((name,i)=> <li key={i}>{name}</li>) }
                    </ul>
                </div>
            </div>
        );
    }
};

export default MyInput02;