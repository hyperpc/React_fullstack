import React from "react";
import PropTypes from 'prop-types';

class DocumentContainer extends React.Component{
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    };
    // ...
    render(){
        return (
            <div className="container">{this.props.children}</div>
        );
    }
}

export default DocumentContainer;