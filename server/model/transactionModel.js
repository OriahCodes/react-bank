var firebase  = require('C:/Users/Oriah/Desktop/code/js/little_projects/react-bank/server/node_modules/firebase')
// var admin = require('firebase-admin');
// import * as admin from 'firebase-admin';

var firebaseConfig = {
    apiKey: "AIzaSyAJZp3BL3r_Azh5g7sYGsW2VnKMqFitwsU",
    authDomain: "react-bank-442b7.firebaseapp.com",
    databaseURL: "https://react-bank-442b7.firebaseio.com",
    projectId: "react-bank-442b7",
    storageBucket: "react-bank-442b7.appspot.com",
    messagingSenderId: "524778475784",
    appId: "1:524778475784:web:3e5d667c8cb3b8b5f55cbd"
}

// var admin = admin.initializeApp();

// var serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://react-bank-442b7.firebaseio.com"
// });

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore()
    

module.exports = db