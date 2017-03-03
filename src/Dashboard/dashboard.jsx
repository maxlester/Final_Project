import React, {Component} from 'react';
import NavBar from '../navBar.jsx';
import ClassList from './classList.jsx';
import NewClass from './newClass.jsx';
import Auth from '../auth-helper.js';
import BecomeTeacher from './becomeTeacher.jsx';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.dataServer = "http://localhost:8080";
    this.state = {
      currentUser: {},
      teacher:{
        description:""
      },
      classesTaking: [],
      classesGiving:[
      ],
      dailyQuote : {quote : "Live as if you were to die tomorrow. Learn as if you were to live forever.", author:"Ghandi"},
      newClass:{
        classTitle:"",
        classDescription:"",
        startTime:"",
        cost:"",
        maxNumberOfStudents: "",
      }
    };
    this.getClassesTaking();
    this.getClassesGiving();
  }

  getClassesTaking() {
   let classesTaking = this.state.classesTaking;
   let userId = this.props.params.id;
   let authUserId = Auth.retrieveUser().userId
   $.ajax({
     url: `http://localhost:8080/dashboard/${userId}/taking`,
     type: 'GET',
     context: this,
     success: function(data) {
       this.setClassesTaking(data)
     },
     error: function(xhr, status, err) {
       console.error(err.toString());
     }.bind(this)
   })
   return false; //returning false to prevent info showing in url
 }

 getClassesGiving() {
   let classesGiving = this.state.classesGiving;
   let userId = this.props.params.id;
   $.ajax({
     url: `http://localhost:8080/dashboard/${userId}/giving`,
     type: 'GET',
     context: this,
     success: function(data) {
       // let user = JSON.parse(data);
       this.setClassesGiving(data)
     },
     error: function(xhr, status, err) {
       console.error(err.toString());
     }.bind(this)
   })
   return false; //returning false to prevent info showing in url
 }

  setClassesGiving(data) {
    this.setState({classesGiving: data}, ()=>{
    })
  }


  setClassesTaking(data) {
    this.setState({classesTaking: data})
  }

  redirectHome(){
    this.props.router.push('/');
  }

  becomeTeacher(e){
    e.preventDefault();
    let userId = this.props.params.id;
    let teacher = {
      // description : this.state.teacher.description
      description:"this is a descrption about me as a teacher"
    }
    $.ajax({
       url: `http://localhost:8080/users/${userId}/becometeacher`,
       type: 'POST',
       context: this,
       dataType: 'json',
       data: JSON.stringify(teacher),
       success: function(data) {
          let currentUser = Auth.retrieveUser();
          currentUser.teacherId = data.teacherId;
          Auth.saveUser(currentUser);
          this.setState({currentUser : currentUser})
          console.log("this worked");
       },
       error: function(xhr, status, err) {
         console.error(err.toString());
       }.bind(this)
    })
    return false; //returning false to prevent info showing in url
  }

  changeTeacher(e){
    const field = e.target.name;
    const teacher = this.state.teacher;
    teacher[field] = e.target.value;
    this.setState({teacher:teacher})
  }

  changeClass(e){
    console.log("changing");
    const field = e.target.name;
    const newClass = this.state.newClass;
    newClass[field] = e.target.value;
    this.setState({newClass})
  }

  addClassToState(classInfo){
    this.getClassesGiving();
  }

  // teacherName : "Bridgit Wald",
  //         classTitle : "Yoga",
  //         classDate : "Thu Feb 23 2017 16:59:25 GMT-0500 (EST)",
  //         classLink : "www.facebook.com",
  //         id : 1234

  addClass(e){
    console.log("addiing class!")
    let newClass = this.state.newClass;
    e.preventDefault();
    let userId = Auth.retrieveUser().userId;
    $.ajax({
       url: `http://localhost:8080/dashboard/${userId}/class/new`,
       type: 'POST',
       dataType: 'json',
       data: JSON.stringify(newClass),
       headers: {
         'Content-Type':'application/json'
        },
        context: this,
       success: function(data) {
        console.log('this worked');
        console.log(data);
        let returnClass = data;
        returnClass.numberOfStudent = 0
        returnClass.students = ["null null"];
        this.addClassToState(returnClass);
       },
       error: function(xhr, status, err) {
         console.error(err.toString());
       }.bind(this)
    })
    return false; //returning false to prevent info showing in url
  }


  render() {
    let userId = Auth.retrieveUser().userId;
    if (userId == this.props.params.id) {
      let newClassForm;
      let becomeTeacherOption;
      if (Auth.retrieveUser().teacherId){
        newClassForm = <NewClass changeClass = {this.changeClass.bind(this)} addClass = {this.addClass.bind(this)} getClassesGiving = {this.getClassesGiving.bind(this)} setClassesGiving = {this.setClassesGiving.bind(this)}/>
      }
      else {
        becomeTeacherOption = <BecomeTeacher userId = {userId} becomeTeacher = {this.becomeTeacher.bind(this)} handleChange = {this.changeTeacher.bind(this)}/>
      }
      return (
        <div className="dashboard">
          <NavBar router={this.props.router}/>
          <aside className="left-sidebar">
            {newClassForm}
          </aside>
          <main>
            <h2>Dashboard</h2>
            {becomeTeacherOption}
            <ClassList classesTaking = {this.state.classesTaking} classesGiving = {this.state.classesGiving}/>
            <section className = "Quote">
              <p>{this.state.dailyQuote.quote}</p>
              <p>{this.state.dailyQuote.author}</p>
            </section>
          </main>
        </div>
      );
    }
    else{
      return(
        <div className = "wrong-dashboard">
          <NavBar router={this.props.router}/>
          <h1>You do not have access to this page it seems</h1>
          <button className="btn btn-default" onClick={this.redirectHome.bind(this)}>Return to home page</button>
        </div>
      );
    }
  }
}

export default Dashboard;
