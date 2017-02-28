import React, {Component} from 'react';
import NavBar from '../navBar.jsx';
import ClassList from './classList.jsx';
import NewClass from './newClass.jsx';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.dataServer = "http://localhost:8080";
    this.state = {
      currentUser: {firstName: "Anonymous", id:1234},
      classesTaking: [
        {
          teacherName : "Bridgit Wald",
          classTitle : "Yoga",
          classDate : "Thu Feb 23 2017 16:59:25 GMT-0500 (EST)",
          classLink : "www.facebook.com",
          id : 1234
        },
        {
          teacherName : "Marcus",
          classTitle : "Yoga level II",
          classDate : "Thu Feb 24 2017 16:59:25 GMT-0500 (EST)",
          classLink : "www.facebook.com",
          id : 4536
        }
      ],
      classesGiving:[
      ],
      dailyQuote : {quote : "Live as if you were to die tomorrow. Learn as if you were to live forever.", author:"Ghandi"}
    };
    this.getClassesTaking();
    this.getClassesGiving();
  }



  getClassesTaking() {
   let classesTaking = this.state.classesTaking;
   let userId = this.props.params.id;
   console.log("Yoooooo", classesTaking);
   $.ajax({
     url: `http://localhost:8080/dashboard/${userId}/taking`,
     type: 'GET',
     context: this,
     success: function(data) {
       // let user = JSON.parse(data);
       console.log("Success", data);
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
       console.log("Success", data);
       this.setClassesGiving(data)
     },
     error: function(xhr, status, err) {
       console.error(err.toString());
     }.bind(this)
   })
   return false; //returning false to prevent info showing in url
 }

 setClassesGiving(data) {
  console.log("data2")
  this.setState({classesGiving: data}, ()=>{
    console.log("LOOK AT THIS", this.state)
  })
 }


 setClassesTaking(data) {
  this.setState({classesTaking: data})
 }

  render() {
    return (
      <div className="dashboard">
        <NavBar/>
        <aside className="left-sidebar">
          <NewClass getClassesGiving = {this.getClassesGiving.bind(this)} setClassesGiving = {this.setClassesGiving.bind(this)}/>
        </aside>
        <main>
          <h2>Dashboard</h2>
          <ClassList classesTaking = {this.state.classesTaking} classesGiving = {this.state.classesGiving}/>
          <section className = "Quote">
            <p>{this.state.dailyQuote.quote}</p>
            <p>{this.state.dailyQuote.author}</p>
          </section>
        </main>
      </div>
    );
  }
}

export default Dashboard;
