var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const express = require('express');
const router = express.Router();
var cors = require('cors');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// var db = admin.firestore()

// db.collection("SaferSchool").doc().get().then(doc => {
//     console.log(doc)
// })
// .catch(err =>{
//     console.log('Error',err)
// })


// const express = require('express');
const app = express();

//api Routes
const dataRoute =require('./api/data');




//api Routes

  app.use('/data',dataRoute);
  


module.exports = app;


