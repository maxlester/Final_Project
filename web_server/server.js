const ENV = process.env.ENV || "development";
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var knexConfig  = require("./knexfile");
var knex = require('knex');
var PORT = process.env.PORT || 8080;
const morgan      = require('morgan');
// const knexLogger  = require('knex-logger');

var cookieSession = require('cookie-session')
var bcrypt = require('bcrypt');

app.use(morgan('dev'));
// app.use(knexLogger(knex));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}))

app.get('/', function(req, res) {
  let currentUser = knex('users').where('first_name', "Alice");
  res.json({currentUser : currentUser});
});

app.listen(PORT, function(){
  console.log(`Example app listening on port ${PORT}!`);
});


