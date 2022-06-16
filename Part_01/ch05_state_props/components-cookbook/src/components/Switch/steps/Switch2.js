import React from "react";

// eslint-disable-next-line no-unused-vars
const CreditCard = 'CreditCard';
const BTC = 'Bitcoin';
class Switch extends React.Component{
    state={
        payMethod:BTC
    };

    render(){
        return (
            <div className="switch">
                <div className="choice">CreditCard</div>
                <div className="choice">Bitcoin</div>
                Pay with: {this.state.payMethod}
            </div>
        );
    }
}

export default Switch;