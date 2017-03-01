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

function generateRandomString(n){
  const charSet = "1234567890abcdefghijklmnopqrstuvwxyz";
  let randomString = "";
  for (var i = 0; i < n; i++){
    let rnum = Math.floor(Math.random() * charSet.length);
    randomString += charSet[rnum];
  }
  return randomString;
};

app.get('/', function(req, res) {
  knex('users').where('first_name', "Alice").then((result) => {
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
    let classes = [];
    for (let i = 0; i < result.length; i++) {
      classes.push({
        classTitle: result[i].class_name,
        classDescription: result[i].class_description,
        classDate: result[i].start_time,
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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(teacherObject);
  })
});

app.get('/dashboard/:id/taking', function(req, res) {
  knex.raw(`select loggedInUsers.first_name, teacher_users.first_name, teacher_users.last_name, class_name, class.id, class_description, class.link, start_time from users as loggedInUsers join class_user on loggedInUsers.id = class_user.user_id join class on class.id = class_user.class_id join teachers on class.teacher_id = teachers.id join users as teacher_users on teachers.id = teacher_users.id where loggedInUsers.id = ${req.params.id};`)
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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(classes);
  })
});

app.get('/dashboard/:id/giving', function(req, res) {
  knex.select('user_id')
  .from('users')
  .join('teachers', 'teachers.user_id', '=', 'users.id')
  .where('users.id', req.params.id)
  .then((result) => {
    let teacherId = req.params.id;
    console.log("hahahahahahahah", result);
    if (result.length > 0) {
     knex.raw(`select class_name, link, start_time, clientUsers.first_name, clientUsers.last_name, class.id from class join teachers on class.teacher_id = teachers.id full outer join class_user on class.id = class_user.class_id full outer join users as clientUsers on class_user.user_id = clientUsers.id  where teachers.id = ${req.params.id} order by link`)
    .then((result2) =>{
      console.log("LOKKKKKKKK", result2);
      let classes = result2.rows;
      for (var n = 0; n < classes.length; n++) {
        classes[n] = {
          classTitle: classes[n].class_name,
          classDate: classes[n].start_time,
          classLink: classes[n].link,
          classId: classes[n].id,
          first_name: classes[n].first_name,
          last_name: classes[n].last_name
        }
      }
      let formattedRes = [];
      classes[0].students = [classes[0].first_name + " " + classes[0].last_name];
      formattedRes.push(classes[0]);
      for (let i = 1; i < classes.length; i++){
        if (classes[i-1].classLink === classes[i].classLink){
          classes[i].students = classes[i].first_name + " " + classes[i].last_name;
          for(let k = 0; k < formattedRes.length; k++){
            if (formattedRes[k].classLink === classes[i].classLink){
              formattedRes[k].students.push(classes[i].students);
            }
          }
        }
        else{
          classes[i].students = [classes[i].first_name + " " + classes[i].last_name];
          classes[i].first_name = "";
          classes[i].last_name = "";
          formattedRes.push(classes[i]);
        }
      }
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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({currentClass : result});
  })
});

app.post('/users/new', function(req, res) {
  let userObject = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    username : req.body.username,
    email : req.body.email,
    password : bcrypt.hashSync(req.body.password, 10),
   }
   let isTeacher = req.body.teacher;
   knex('users')
   .where('email', userObject.email)
   .then((results) => {
     if(results.length === 0){
       knex('users')
       .where('username', userObject.username)
       .then((results2) => {
         if(results2.length === 0){
           knex.insert(userObject, "id")
           .into("users")
           .then((result3) => {
            let user_id = result3[0]
            let returnObject = {
              username: userObject.username,
              firstName: userObject.firstName,
              lastName: userObject.lastName,
              email: userObject.email,
              userId: user_id
            }
            if (isTeacher){
              console.log("it's a teacher!")
              let teacher_description = req.body.description;
              let teacherInfo = {
                user_id: user_id,
                description: teacher_description
              }
              knex.insert(teacherInfo, "id").into("teachers").then((result4)=>{
                console.log("result4", result4);
                returnObject.teacherId = result4[0];
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(returnObject)
                res.status(200)
              })
            }
            else{
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.send(returnObject)
              res.status(200)
            }
           }
         )}
         else{
           res.status(400);
         }
       })
     }
     else {
       res.status(400);
     }
  })
});

app.post('/users/:id/update', function(req, res) {
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

app.post('/users/:id/becometeacher', function(req, res) {
  console.log("becoming a teacher");
  const id =  req.params.id;
  let teacherToCreate = {
    user_id: id,
    // description: req.body.description,
      description: 'did this work?'
    }
    knex.select("*").from("teachers").where("user_id", id).then((result)=>{
      console.log("result", result);
      if(result.length === 0){
         knex
         .insert(teacherToCreate, "id")
         .into('teachers')
         .then((result1) => {
            let teacherId = result1[0];
            res.send({teacherId});
          })
      }
      else{
        res.status(400).send("User is already a teacher");
      }
    })
})

app.post('/login', function(req,res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log("email", email);
  console.log("password", password);
   knex
   .select('*')
   .from('users')
   .where('email', email)
   .then((result)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(result[0]);
      if (result[0]) {
        var passwordOK = bcrypt.compareSync(password, result[0].password);
        if(passwordOK) {
          let returnObject = {
            username: result[0].username,
            firstName: result[0].first_name,
            lastName: result[0].last_name,
            email: result[0].email,
            userId: result[0].id
          }
          knex.select('id')
          .from('teachers')
          .where('user_id', returnObject.userId)
          .then((result1)=>{
            if (result1[0]){
              returnObject.teacherId = result1[0].id;
            }
            res.send(returnObject);
          })

        }
      }
      else if(!result[0]){
        res.status(400).send("Your fired!");
      }
     else res.status(401).send("Wrong password!");
   })
});

app.post('/logout', function(req,res) {
  if (res.status(200)) {
  } else {
     res.status(400);
  }
});


app.post('/dashboard/:id/class/new', function(req, res) {
  let userId = req.params.id;
  let randomString = generateRandomString(6)
  let classLink = `http://localhost:3000/class/${randomString}`;
  let classObject = {
    id : randomString,
    class_name: req.body.classTitle,
    class_description : req.body.classDescription,
    start_time : req.body.startTime,
    price : req.body.cost,
    link : classLink,
    max_number_students : req.body.maxNumberOfStudents
   }
   knex
   .select('id')
   .from('teachers')
   .where('user_id', "=", userId)
   .then((result)=>{
    console.log("result", result);
    classObject.teacher_id = result[0].id;
    console.log("class Object before insert", classObject);
    knex.insert(classObject, "*")
      .into("class")
      .then((result1) => {
        console.log("returning from the insert", result1);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200)
      })
      .catch(function(err) {
        res.status(400);
      })
   })
});

app.delete('/class/:id/delete', function(req, res) {
    var classID = req.params.id;
    knex('class')
    .where('class.id', classID)
    .del()
    .then((result) => {
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


