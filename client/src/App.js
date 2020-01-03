import React, { Component } from 'react';
import './App.css';
import jquery from '../node_modules/jquery/dist/jquery'
import Transactions from './components/Transactions'
import Operations from './components/Operations'
import BreakDown from './components/BreakDown'

class App extends Component{
  constructor(){
    super()
    this.state = {
      transactions: [
        // { amount: 3200, vendor: "Elevation", category: "Salary" },
        // { amount: -7, vendor: "Runescape", category: "Entertainment" },
        // { amount: -20, vendor: "Subway", category: "Food" },
        // { amount: -98, vendor: "La Baguetterie", category: "Food" }
      ],
      balance : null,
      breakDown : {},
      try: []
    }
  }

  pushTransaction = async(amount, vendor, category) => {
    let newTransaction = { amount: amount, vendor: vendor, category :category}
    await jquery.ajax({
      url: `/transaction`,
      method: "POST",
      data: JSON.stringify(newTransaction),
      contentType: "application/json",
      success: function(data){
        console.log("POST complete")
      }
    })

    this.getDataFromDB()
  }

  // breakDown = (newTransaction) => {
  //   let transCategory = newTransaction.category
  //   let transAmount = newTransaction.amount
  //   let breakDown = this.state.breakDown

  //   if (breakDown[transCategory] === undefined){
  //     breakDown[transCategory] = transAmount
  //   }
  //   else {
  //     breakDown[transCategory] += transAmount
  //   }

  //   this.setState({breakDown})
  //   console.log(breakDown)
  // }

  InitBreakDown =  async() => {
    let transactions = this.state.transactions
    let breakDown = this.state.breakDown
    await transactions.forEach( t => {
      let transCategory = t.category.toLocaleLowerCase()
      let transAmount = t.amount
      if (breakDown[transCategory] === undefined){
        breakDown[transCategory] = transAmount
      }
      else {
        breakDown[transCategory] += transAmount
      }
    })
    this.setState({breakDown})
  }

  calcBalance = () => {
    let transactions= this.state.transactions
    let balance = 0
    for (let transaction of transactions){
      balance += transaction.amount
    }
    
    this.setState({balance})
  }

  getDataFromDB = () => {
    jquery.get('http://localhost:4000/transactions', transactions => {
      this.setState({transactions})  
      console.log(transactions)
      this.InitBreakDown()
      this.calcBalance()
    })
  }

  componentDidMount = () => {
    this.getDataFromDB()
  }

  render(){
    let balance = this.state.balance
    return(
      <div id="app-container">
        <div id="balance-container"> Balance: ${balance} </div>
        <Transactions data={this.state.transactions} key="transactions"/>
        <Operations pushTransaction={this.pushTransaction} balance={this.state.balance}/>  
        <BreakDown breakDown={this.state.breakDown} transactions={this.state.transactions} key="breakdown"/>
      </div>     
    )
  }
}

export default App;
