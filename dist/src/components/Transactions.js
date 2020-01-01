import React, { Component } from 'react';
import Transaction from './Transaction'

class Transactions extends Component {
    render() {
        let data= this.props.data
        return (
            data.map( (t,ind) => 
                <Transaction data={t} key={ind}/> )
        )
    }
}

export default Transactions;