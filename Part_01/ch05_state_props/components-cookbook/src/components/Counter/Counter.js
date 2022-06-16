import React from 'react';

class Counter extends React.Component{
    static defaultProps = {
        initialValue:2
    };

    render(){
        return <h1>{this.props.initialValue}</h1>
    }
}

export default Counter;