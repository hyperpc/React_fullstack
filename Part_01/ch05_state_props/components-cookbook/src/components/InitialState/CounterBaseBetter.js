import React from 'react';
import PropTypes from 'prop-types';

const counterStyle = {
    width: '50px',
    textAlign: 'center',
    backgroundColor: 'aliceblue',
    padding: '10px'
  };

class CounterBaseBetter extends React.Component{
    constructor(props){
        super(props);

        this.state={
            value:this.props.initialValue
        };
    };    
    decrement = () => {
        this.setState(preState => {
            return{
            value:preState.value<1?0:preState.value-1
            }
        });
    };
    increment = () => {
        this.setState(preState => {
            return{
            value:preState.value<0?1:preState.value+1
            }
        });
    };
    render(){
        return (
            <div style={counterStyle} key="CounterBaseBetter">
              {this.state.value}
              <p>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
              </p>
            </div>
        );
    }
}

 
CounterBaseBetter.propTypes = {
    initialValue: PropTypes.number
  };
  
CounterBaseBetter.defaultProps = {
    initialValue: 10
}; 

export default CounterBaseBetter;