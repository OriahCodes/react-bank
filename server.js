const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
let api = require('./server/routes/api')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'dist')))
app.use('/', api)

app.use(function (req, res, next) { //does this go to the api.js?
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

//========================================================

const port = 4000
app.listen(process.env.PORT || port, function(){
    console.log(`Running server on port ${port}`)
})