import React from "react";
import { Route, Redirect } from "react-router-dom";
import { client } from "../../Client";

export const PrivateRoute = ({component, ...rest})=>{
    <Route {...rest} render={(props)=>(
        client.isLoggedIn()?(
            React.createElement(component, props)
        ):(
            <Redirect to={{pathname:'/login'}} />
        )
    )} />
};