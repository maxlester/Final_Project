require('dotenv').config();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieSession = require('cookie-session')
const bcrypt = require('bcrypt');

var AccessToken = require('twilio').AccessToken;
var VideoGrant = AccessToken.VideoGrant;
var randomUsername = require('./randos');

const knexConfig  = require("./knexfile");
const knex = require('knex')(knexConfig[ENV]);
const knexLogger  = require('knex-logger');
const morgan      = require('morgan');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(morgan('dev'));
app.use(knexLogger(knex));

app.use(bodyParser.json());
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
  .join('class', 'class.teacher_id', '=', 'teachers.id')
  .where('teachers.id', req.params.id)
  .then((result) => {
    console.log(result);
    let classes = [];
    for (let i = 0; i < result.length; i++) {
      classes.push({
        classTitle: result[i].class_name,
        classDescription: result[i].class_description,
        classDate: result[i].start_time,
        endTime: result[i].end_time,
        classCost: result[i].price,
        maxNumberOfStudents: result[i].max_number_students
      })
    }
    let teacherObject = {
      firstName: result[0].first_name,
      lastName: result[0].last_name,
      description: result[0].description,
      id: result[0].id,
      classes: classes
    }
    console.log("yoooooooooo", teacherObject);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(teacherObject);
  })
});

app.get('/dashboard/:id/taking', function(req, res) {
  knex.raw(`select loggedInUsers.first_name, teacher_users.first_name, teacher_users.last_name, class_name, class.id, class_description, class.link, start_time, end_time from users as loggedInUsers join class_user on loggedInUsers.id = class_user.user_id join class on class.id = class_user.class_id join teachers on class.teacher_id = teachers.id join users as teacher_users on teachers.id = teacher_users.id where loggedInUsers.id = ${req.params.id};`)
  .then((result) => {
    let formattedRes = result.rows;
    let classes = [];
     for (let i = 0; i < formattedRes.length; i++) {
      classes.push({
        teacherName: formattedRes[i].first_name + " " + formattedRes[i].last_name,
        classTitle: formattedRes[i].class_name,
        classDescription: formattedRes[i].class_description,
        classDate: formattedRes[i].start_time,
        classLink: formattedRes[i].link,
        classId: formattedRes[i].id
      })
    }
    console.log(classes);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(classes);
  })
});

app.get('/dashboard/:id/giving', function(req, res) {
  knex.select('*')
  .from('users')
  .join('teachers', 'teachers.user_id', '=', 'users.id')
  .where('users.id', req.params.id)
  .then((result) => {
    let teacherId = req.params.id;
    console.log(result);
    if (result.length > 0) {
     knex.raw(`select class_name, link, start_time, end_time, clientUsers.first_name, clientUsers.last_name from class join teachers on class.teacher_id = teachers.id join class_user on class.id = class_user.class_id join users as clientUsers on class_user.user_id = clientUsers.id  where teachers.id = ${req.params.id};`)
    .then((result2) =>{
      let classes = result2.rows;
      let formattedRes = [];
      classes[0].students = [classes[0].first_name + " " + classes[0].last_name];
      formattedRes.push(classes[0]);
      for (let i = 1; i < classes.length; i++){
        console.log('same link')
        if (classes[i-1].link === classes[i].link){
          classes[i].students = [classes[i].first_name + " " + classes[i].last_name];
          for(let k = 0; k < formattedRes.length; k++){
            if (formattedRes[k].link === classes[i].link){
              formattedRes[k].students.push(classes[i].students);
            }
          }
        }
        else{
          console.log('diff link')
          classes[i].students = [classes[i].first_name + " " + classes[i].last_name];
          classes[i].first_name = "";
          classes[i].last_name = "";
          formattedRes.push(classes[i]);
        }
      }
      console.log(formattedRes);
      res.send(formattedRes);
    })
    }
  })
/*  })*/
 /* .then((result) => {
    let formattedRes = result.rows;
    let classes = [];
     for (let i = 0; i < formattedRes.length; i++) {
      classes.push({
        teacherName: formattedRes[i].first_name + " " + formattedRes[i].last_name,
        classTitle: formattedRes[i].class_name,
        classDescription: formattedRes[i].class_description,
        classDate: formattedRes[i].start_time,
        classLink: formattedRes[i].link,
        classId: formattedRes[i].id
      })
    }
    console.log(classes);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(classes);*/
  });

      // classesTaking: [
      //   {
      //     teacherName : "Bridgit Wald",
      //     classTitle : "Yoga",
      //     classDate : "Thu Feb 23 2017 16:59:25 GMT-0500 (EST)",
      //     classLink : "www.facebook.com",
      //     id : 1234
      //   },
      //   {
      //     teacherName : "Marcus",
      //     classTitle : "Yoga level II",
      //     classDate : "Thu Feb 24 2017 16:59:25 GMT-0500 (EST)",
      //     classLink : "www.facebook.com",
      //     id : 4536
      //   }

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
  console.log(req.body);
  const userObject = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    username : req.body.username,
    email : req.body.email,
    password : bcrypt.hashSync(req.body.password, 10)
   }
   console.log(userObject);
   knex('users')
   .where('email', userObject.email)
   .then((results) => {
     if(results.length === 0){
       knex('users')
       .where('username', userObject.username)
       .then((results2) => {
         if(results2.length === 0){
          console.log("Somethin")
           knex.insert(userObject, "id")
           .into("users")
           .then((result3) => {
            console.log(result3[0])
            let user_id = result3[0]
            let returnObject = {
              username: userObject.username,
              firstName: userObject.firstName,
              lastName: userObject.lastName,
              email: userObject.email,
              userId: user_id
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            console.log(result3[0])
             res.send(returnObject)
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

app.get('/token', function(request, response) {
    var identity = randomUsername();

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );

    // Assign the generated identity to the token
    token.identity = identity;

    //grant the access token Twilio Video capabilities
    var grant = new VideoGrant();
    grant.configurationProfileSid = process.env.TWILIO_CONFIGURATION_SID;
    token.addGrant(grant);

    // Serialize the token to a JWT string and include it in a JSON response
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send({
        identity: identity,
        token: token.toJwt()
    });
});

app.listen(PORT, function(){
  console.log(`Example app listening on port ${PORT}!`)
});


