import React, { Component } from 'react';
import './App.css';
import Transactions from './components/Transactions'
import Operations from './components/Operations'

class App extends Component{
  constructor(){
    super()
    this.state = {
      transactions: [
        { amount: 3200, vendor: "Elevation", category: "Salary" },
        { amount: -7, vendor: "Runescape", category: "Entertainment" },
        { amount: -20, vendor: "Subway", category: "Food" },
        { amount: -98, vendor: "La Baguetterie", category: "Food" }
      ],
      balance : null
    }
  }

  pushTransaction = (amount, vendor, category) => {
    let transactions = this.state.transactions
    transactions.push({ amount: amount, vendor: vendor, category :category})
    this.setState({transactions})
  }

  calcBalance = async () => {
    let transactions= this.state.transactions
    let balance = 0
    for (let transaction of transactions){
      balance += transaction.amount
    }
    
    this.setState({balance})
  }

  componentWillMount = () => {
    // $.get('http://localhost:4000/transactions', response => {
    //   console.log(response)
    // })
    this.calcBalance()
  }

  render(){
    let balance = this.state.balance
    return(
      <div>
        <div id="balance"> Balance: ${balance} </div>
        <Transactions data={this.state.transactions} key="transactions"/>
        <Operations pushTransaction={this.pushTransaction} balance={this.state.balance}/>  
      </div>
      
    )
  }
}

export default App;
