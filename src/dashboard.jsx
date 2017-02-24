import React, {Component} from 'react';
import NavBar from './navBar.jsx';
import ClassList from './classList.jsx';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
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
      classesTeaching:[
        {
          classTitle : "Yoga level II",
          classDate : "Thu Feb 24 2017 16:59:25 GMT-0500 (EST)",
          classLink : "www.facebook.com",
          nOfStudents : 3,
          id : 5647
        }
      ],
    };
  }
  render() {
    return (
      <div className="dashboard">
        <NavBar/>
        <aside className="left-sidebar">
        </aside>
        <main>
          <ClassList classesTaking = {this.state.classesTaking}/>
        </main>
      </div>
    );
  }
}

export default Dashboard;
