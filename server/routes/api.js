const express = require('express')
const router = express.Router()

const db = require('../model/transactionModel')

// Routes setup

router.get('/', (req,res) => {
    console.log("Someone has come into the server.")
    res.send("Server is up and running smoothly")
})

router.get('/transactions', function (req,res) {

    let transactionsFromDB = []
    db.collection('transactions').get()
    .then(transactions => {
        transactions.docs.forEach( doc => {
            transData = doc.data()
            transactionsFromDB.push(transData)
        })
        console.log(transactionsFromDB)
        res.send(transactionsFromDB)  
    })
    .catch(error=>{ console.log(error)})
    
})

router.post('/transaction', (req,res) => {
    const transInfo = req.body
    console.log(transInfo)
    db.collection('transactions').add(transInfo)
    .then( docRef => {
        console.log("Document written with ID: ", docRef.id)
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    })
    
    res.send("just added a new trnsaction to the db")
})

module.exports = router
