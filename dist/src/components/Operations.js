import React, { Component } from 'react';

class Operations extends Component {
    constructor(){
        super()
        this.state = {
            inputVals : {
                amount : "",
                vendor: "",
                category: "",
            },
            displayMessage : false
        }
    }

    handleInput = (event) => {
        let inputVals = this.state.inputVals
        inputVals[event.target.name] = event.target.value
        this.setState({ inputVals })
    }

    handleMessage = () => {
        this.setState({displayMessage : true})
        setTimeout(() => {
            this.setState({displayMessage : false})
        }, 3000);
    }

    checkFunds = (transactionAmount) => {
        if (this.props.balance + transactionAmount < 500) {
            this.handleMessage()
            return false
        }
        return true
    }

    pushTransaction = (amount) => {
        let vendor = this.state.inputVals.vendor
        let category = this.state.inputVals.category
        
        this.props.pushTransaction(amount, vendor, category)
    }

    handleTransaction = (event) => {
        let operation = event.target.name
        let sign
        operation === "withdraw" ? sign = -1 : sign = 1
        
        let amount = this.state.inputVals.amount *sign
        let isLegit = this.checkFunds(amount)
        if (isLegit){this.pushTransaction(amount)}
    }

    render() {
        let inputVals = this.state.inputVals
        return (
            <div id="operations-container">
                <div id="operations">
                    <div>
                        <span id="amount">Amount: </span> 
                        <input 
                            value={inputVals.amount} 
                            name = "amount"
                            onChange={this.handleInput}
                            id="amount-input"/>
                    </div>
                    <div>
                        <span id="Vendor">Vendor: </span> 
                        <input 
                            value={inputVals.vendor} 
                            name = "vendor"
                            onChange={this.handleInput}
                            id="Vendor-input"/>
                    </div>
                    <div>
                        <span id="Category">Category: </span> 
                        <input 
                        value={inputVals.category} 
                        name = "category"
                        onChange={this.handleInput}
                        id="Category-input"/>
                    </div>                        
                </div>
                
                <div id="operation-kind">
                    <button onClick={this.handleTransaction} name="deposite">Deposite</button>
                    <button onClick={this.handleTransaction} name="withdraw">Withdraw</button>
                </div>

                {this.state.displayMessage ? 
                    <div>Insufficient Funds</div> : null}
            </div>

        );
    }
}

export default Operations;