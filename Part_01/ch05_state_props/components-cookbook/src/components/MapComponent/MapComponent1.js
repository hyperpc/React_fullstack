import createReactClass from "create-react-class";
import PropTypes from 'prop-types';

const MapComponent1 = createReactClass({
    propTypes:{
        lat: PropTypes.number,
        lng: PropTypes.number,
        zoom:PropTypes.number,
        place:PropTypes.object,
        markers:PropTypes.array
    }
});

export default MapComponent1;