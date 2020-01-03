import React, { Component } from 'react';
import '../styles/operations.css'

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

    initInputVals = () => {
        this.setState({ inputVals: {
            amount : "",
            vendor: "",
            category: "",
        } })
    }

    pushTransaction = (amount) => {
        let vendor = this.state.inputVals.vendor
        let category = this.state.inputVals.category
        
        this.props.pushTransaction(amount, vendor, category)
        this.initInputVals()
    }

    handleTransaction = (event) => {
        let amount = this.state.inputVals.amount
        if(!isNaN(amount)){
            let operation = event.target.id
            let sign
            operation === "withdraw" ? sign = -1 : sign = 1
            
            let isLegit = this.checkFunds(amount*sign)
            if (isLegit){this.pushTransaction(amount*sign)}
        }
        else{ alert("Please insert a number in the 'Amount' field")}
    }

    render() {
        let inputVals = this.state.inputVals
        return (
            <div id="operations-container">
                <div id="operations">
                    <input 
                        placeholder="Amount:"                        
                        value={inputVals.amount} 
                        name = "amount"
                        onChange={this.handleInput}
                        id="amount-input"/>
                    <input 
                        placeholder="Vendor:"
                        value={inputVals.vendor} 
                        name = "vendor"
                        onChange={this.handleInput}
                        id="Vendor-input"/>
                    <input 
                    placeholder="Category:"                        
                    value={inputVals.category} 
                    name = "category"
                    onChange={this.handleInput}
                    id="Category-input"/>
                </div>
                
                <div id="operation-kind">
                    <div onClick={this.handleTransaction} id="deposite">Deposite</div>
                    <div onClick={this.handleTransaction} id="withdraw">Withdraw</div>
                </div>

                {this.state.displayMessage ? 
                    <div>Insufficient Funds</div> : null}
            </div>

        );
    }
}

export default Operations;