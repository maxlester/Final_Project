require('dotenv').config();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieSession = require('cookie-session')
const bcrypt = require('bcrypt');

const knexConfig  = require("./knexfile");
const knex = require('knex')(knexConfig[ENV]);
const knexLogger  = require('knex-logger');
const morgan      = require('morgan');


app.use(morgan('dev'));
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

app.get('/teacher/:id', function(req, res) {
  knex
  .select('*')
  .from('users')
  .join('teachers', 'teachers.user_id', '=', 'users.id')
  .where('teachers.id', req.params.id)
  .then((result) => {
    console.log(result);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({currentTeacher : result});
  })
});

app.get('/users/:id', function(req, res) {
  knex
  .select('*')
  .from('users')
  .where('users.id', req.params.id)
  .then((result) => {
    console.log(result);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({currentUser : result});
  })
});

app.get('/class/:id', function(req, res) {
  knex
  .select('*')
  .from('class')
  .where('class.id', req.params.id)
  .then((result) => {
    console.log(result);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({currentClass : result});
  })
});

app.post('/users/new', function(req, res) {
  const userObject = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username : req.body.username,
    email : req.body.email,
    password : bcrypt.hashSync(req.body.password, 10)
   }
   knex('users')
   .where('email', userObject.email)
   .then((results) => {
     if(results.length === 0){
       knex('users')
       .where('username', userObject.username)
       .then((results2) => {
         if(results2.length === 0){
           knex.insert(userObject)
           .into("users")
           .then((result3) => {
             res.json(JSON.stringify(result3[0]))
             res.status(200)
           }
         )}
         else{
           res.status(400);
         }
       })
     }
     else {
       console.log("email")
       res.status(400);
     }
  })
});

app.put('/users/:id/update', function(req, res) {
  const id =  req.params.id;
  const userObjectUpdate = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username : req.body.username,
    email : req.body.email,
    password : bcrypt.hashSync(req.body.password, 10)
   }
   knex('users')
   .where('id', id)
   .then((results) => {
      if(results.length === 1){
        knex.update(userObjectUpdate)
        .into("users")
        .then((result3) => {
          res.json(JSON.stringify(result3[0]))
          res.status(200)
        })
      }
    })
})

app.post('/login', function(req,res) {
   const email = req.body.email;
   const password = req.body.password;
   knex
   .select('*')
   .from('users')
   .where('email', email)
   .then((result)=> {
     if (result[0]) {
      console.log(result[0]);
       var passwordOK = bcrypt.compareSync(password, result[0].password);
       if(passwordOK) {
         res.json(JSON.stringify(result[0]));
       }
     }
     else if(!result[0]){
      res.status(400)
     }
     else res.status(401).send("Wrong password!");
   })
});

app.post('/logout', function(req,res) {
  if (res.status(200)) {
  console.log("Status Good")
  } else {
     res.status(400);
  }
});

app.post('/class/new', function(req, res) {
  const classObject = {
    teacher_id: req.body.teacher_id, // Get teacher_id from params of URL???
    class_name: req.body.class_name,
    class_description : req.body.class_description,
    start_time : req.body.start_time,
    end_time : req.body.end_time,
    price : req.body.price,
    max_number_students : req.body.max_number_students,
    registered_number_students : 0
   }
   console.log(classObject);
      knex.insert(classObject)
        .into("class")
        .then((result) => {
          console.log(result);
          req.json(JSON.stringify(classObject));
          res.status(200)
        })
        .catch(function(err) {
          res.status(400);
        })
      });

app.delete('/class/:id/delete', function(req, res) {
    var classID = req.params.id;
    console.log(classID)
    knex('class')
    .where('class.id', classID)
    .del()
    .then((result) => {
      console.log(result)
  })
  .catch(function(err) {
    res.status(400);
  })
})


app.listen(PORT, function(){
  console.log(`Example app listening on port ${PORT}!`)
});


