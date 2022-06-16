import React from "react";
import '../Switch.css';

const CreditCard = 'CreditCard';
const BTC = 'Bitcoin';

const Choice = (props) => {
    const cssClasses = ["choice"];

    // <-- check props, not state
    if(props.active){
        cssClasses.push("active");
    }

    return (
        <div className={cssClasses.join(" ")} onClick={props.onClick}>
            {props.label}
        </div>
    );
}

class Switch extends React.Component{
    state={
        payMethod:BTC
    };

    select = (choice) => {
        return (evt) => {
            this.setState({
                payMethod:choice
            });
        };
    };

    render(){
        return (
            <div className="switch">
                <Choice onClick={this.select(CreditCard)}
                    active={this.state.payMethod===CreditCard}
                    label="Pay with Creditcard"/>
                <Choice onClick={this.select(BTC)}
                    active={this.state.payMethod===BTC}
                    label="Pay with Bitcoin"/>
                Paying with: {this.state.payMethod}
            </div>
        );
    }
}

export default Switch;