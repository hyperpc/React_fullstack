import React from 'react';
import PropTypes from 'prop-types';

class MultiChildContainer extends React.Component{
    static propTypes = {
        component: PropTypes.string.isRequired,
        children: PropTypes.array.isRequired
    };
    // ...
    renderChild = (childData) => {
        return React.createElement(
            this.props.component,
            {}, // children's props
            childData // children's children
        );
    };
    // ...
    render(){
        return(
            <div className='container'>
                {React.Children.map(this.props.children, this.renderChild)}
            </div>
        );
    }
}

export default MultiChildContainer;