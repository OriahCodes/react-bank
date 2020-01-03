import React, { Component } from 'react';
import '../styles/transaction.css'

class Transaction extends Component {
    render() {
        let data = this.props.data
        let color
        Math.sign(data.amount) === 1 ? color = "#2db071" : color = "#e75446"
        return (
            <div className="transaction">
                <span className="vendor"> {data.vendor} </span>
                <span className="amount" style={{"color" : color}}> ${data.amount} </span>
            </div>
        );
    }
}

export default Transaction;