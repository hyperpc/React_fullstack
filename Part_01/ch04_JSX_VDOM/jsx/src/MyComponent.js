import React from 'react';
export default class MyComponent extends React.Component{
    render(){
        return(
            <input name={this.props.name} title={this.props.title} 
                placeholder={this.props.placeholder} />
        );
    }
}