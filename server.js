const express = require('express')
const app = require('express')();
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
import router from './router/index';

mongoose.connect('mongodb://localhost/eleme');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connetcion error;'));
db.once('open', function () {
  console.log('we are connection')
})
app.set('views', './views')
// app.use(express.static("views"));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

// app.use(function (req, res, next) {
//   // res.setHeader('Access-Control-Allow-Origin', '*');
//   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//   res.setHeader( 'X-Requested-With,content-type, Authorization');
//   next();
// });
app.use(express.static('views'));
app.use('/', router)
let server = app.listen(3000, function () {
  console.log('server alreay start')
})