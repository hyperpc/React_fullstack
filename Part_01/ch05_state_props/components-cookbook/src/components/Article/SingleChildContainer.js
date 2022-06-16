import React from 'react';
import PropTypes from 'prop-types';

class SingleChildContainer extends React.Component{
    static propTypes = {
        children: PropTypes.element.isRequired
    };
    // ...
    render(){
        return(
            <div className='container'>{this.props.children}</div>
        );
    }
}

export default SingleChildContainer;