import React, { Component } from 'react';

class Transaction extends Component {
    render() {
        let data = this.props.data
        let color
        Math.sign(data.amount) == 1 ? color = "green" : color = "red"
        return (
            <div className="transaction">
                <span className="vendor"> {data.vendor} </span>
                <span className="amount" style={{"color" : color}}> ${data.amount} </span>
            </div>
        );
    }
}

export default Transaction;