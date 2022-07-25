import React from 'react';
import { RouterContext } from './RouterContext';

const Link = ({to, children})=>(
    <RouterContext.Consumer>
        {(ctx)=>(
            <a onClick={(e)=>{
                e.preventDefault();
                ctx.history.push(to);
            }} href={to} >
            {children}
        </a>
        )}
    </RouterContext.Consumer>  
);

export default Link;