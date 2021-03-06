import React from "react";

const CreditCard = 'CreditCard';
const BTC = 'Bitcoin';
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

    renderChoice = choice => {
        return (
            <div className="choice" onClick={this.select(choice)}>
                {choice}
            </div>
        );
    };

    render(){
        return (
            <div className="switch">
                {this.renderChoice(CreditCard)}
                {this.renderChoice(BTC)}
                Pay with: {this.state.payMethod}
            </div>
        );
    }
}

export default Switch;