import React from "react";
import Redirect from "./Redirect";

class BlackSea extends React.Component{
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
                        (<Redirect to='/' />)
                        : null
                }
            </div>
        );
    }
}

export default BlackSea;