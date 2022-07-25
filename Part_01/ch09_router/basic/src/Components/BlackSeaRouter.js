import React from "react";
import { Navigate } from 'react-router-dom';

class BlackSeaRouter extends React.Component{
    state = {
        counter:3
    };

    componentDidMount=()=>{
        this.interval = setInterval(() => (
            this.setState(prevState => {
                return {
                    counter: prevState.counter - 1
                };
            })
        ), 1000);
    };

    componentWillUnmount=()=>{
        clearInterval(this.interval);
    };

    render(){
        return(
            <div>
                <h3>Black Sea</h3>
                <p>Nothing to sea [sic] here ...</p>
                <p>Redirecting in {this.state.counter}...</p>
                {
                    (this.state.counter<1)?
                        (<Navigate to='/' />)
                        : null
                }
            </div>
        );
    }
}

export default BlackSeaRouter;