import React from 'react';
import { RouterContext } from './RouterContext';

/*
* work in this way, but not a good practice.
* because class will spend time and memory on life cycle methods...
*
class Redirect extends React.Component{
    renderNull=(ctx)=>{
        ctx.history.push(this.props.to);
        return null;
    };

    render(){
        return(
            <RouterContext.Consumer>
                {(ctx)=> {
                    this.renderNull(ctx)
                }}
            </RouterContext.Consumer>
        );
    }
}
*/

/*
* the best practice, for now!!!
*/
const Redirect = ({to})=>{
    return(
        <RouterContext.Consumer>
            {(ctx)=>{
                ctx.history.push(to);
                return null;
            }}
        </RouterContext.Consumer>
    );
};

/*
* not work in function
function Redirect(to){
    return(
        <RouterContext.Consumer>
            {(ctx)=>{
                ctx.history.push(to);
                return null;
            }}
        </RouterContext.Consumer>
    );
}
*/

export default Redirect;