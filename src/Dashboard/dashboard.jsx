import React, {Component} from 'react';
import NavBar from '../navBar.jsx';
import ClassList from './classList.jsx';


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
        {
          classTitle : "Yoga level III",
          classDate : "Thu Feb 24 2017 16:59:25 GMT-0500 (EST)",
          classLink : "www.google.com",
          students : [
            {firstName:"Marcus", lastName:"", id:3456},
            {firstName:"Justine", lastName:"Gagnepain", id:8765},
            {firstName:"Max", lastName:"Lester", id:1563}
          ],
          id : 5647
        }
      ],
      dailyQuote : {quote : "Live as if you were to die tomorrow. Learn as if you were to live forever.", author:"Ghandi"}
    };
    this.getClassesTaking();
  }



  getClassesTaking() {
   let classesTaking = this.state.classesTaking;
   let teacherId = this.props.params.id;
   console.log("Yoooooo", classesTaking);
   $.ajax({
     url: `http://localhost:8080/dashboard/${teacherId}/taking`,
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

 setClassesTaking(data) {
  this.setState({classesTaking: data})
 }

  render() {
    return (
      <div className="dashboard">
        <NavBar/>
        <aside className="left-sidebar">
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
