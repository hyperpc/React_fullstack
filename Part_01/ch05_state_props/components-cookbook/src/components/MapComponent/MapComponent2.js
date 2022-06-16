import React from 'react';
import PropTypes from 'prop-types';

class MapComponent2 extends React.Component{
    static propTypes = {
        lat: PropTypes.number,
        lng: PropTypes.number,
        zoom:PropTypes.number,
        place:PropTypes.object,
        markers:PropTypes.array
    };
}

export default MapComponent2;