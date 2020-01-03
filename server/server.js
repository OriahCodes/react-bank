const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
let api = require('./routes/api')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', api)

//========================================================

const port = 4000
app.listen(process.env.PORT || port, function(){
    console.log(`Running server on port ${port}`)
})