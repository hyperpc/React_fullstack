import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { client } from '../Client';

export const PrivateRoute = ({element, ...rest})=>{
    <Route {...rest} render={(props)=>(
        client.isLoggedIn()?(
            React.createElement(element, props)
        ):(
            <Redirect to={{pathname:'/login', state: {from:props.location} }} />
        )
    )} />
};
