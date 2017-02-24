require('dotenv').config();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieSession = require('cookie-session')
const bcrypt = require('bcrypt');

const knexConfig  = require("../knexfile");
const knex = require('knex')(knexConfig[ENV]);
const knexLogger  = require('knex-logger');
const morgan      = require('morgan');


app.use(morgan('dev'));
// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}))

app.get('/', function(req, res) {
  knex('users').where('first_name', "Alice").then((result) => {
    console.log(result);
    console.log(req.body);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({currentUser : result});
  })
});

app.listen(PORT, function(){
  console.log(`Example app listening on port ${PORT}!`);
});


