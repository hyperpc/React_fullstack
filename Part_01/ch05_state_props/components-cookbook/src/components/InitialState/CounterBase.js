import React from 'react';

const counterStyle = {
    width: '50px',
    textAlign: 'center',
    backgroundColor: 'aliceblue',
    padding: '10px'
  };
  
class CounterBase extends React.Component{
    constructor(props){
        super(props);

        this.state={
            value:this.props.initialValue
        };
    };    
    decrement = () => {
        const nextVal = this.state.value<1?0:this.state.value-1;
        this.setState({
            value:nextVal
        });
    };
    increment = () => {
        const nextVal = this.state.value<0?1:this.state.value+1;
        this.setState({
            value:nextVal
        });
    };
    render(){
        return (
            <div style={counterStyle} key="Counter1">
              {this.state.value}
              <p>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
              </p>
            </div>
        );
    }
}

export default CounterBase;