import React, { useContext } from 'react';
import { RouterContext } from './RouterContext';

const Route = ({path, component}) => {
  
    const ctx = useContext(RouterContext);

    if(ctx.location.pathname.match(path)){
      return React.createElement(component);
    } else {
      return (null);
    }
};

export default Route;