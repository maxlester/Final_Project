import React, {Component} from 'react';
import NavBar from '../navBar.jsx';
import TeacherClassList from './teacherClassList.jsx';
import TeacherProfileInfo from './teacherProfileInfo.jsx'


class TeacherProfile extends Component {
  constructor(props) {
    super(props);
    this.dataServer = "http://localhost:8080";
    this.state = {
      currentUser: {firstName: "Anonymous", id:1234},
      teacher: {firstName: "Bridgit", lastName:"Wald", description:"I have forgotten to mention that, in many things, Queequeg placed great confidence in the excellence of Yojo's judgment and surprising forecast of things; and cherished Yojo with considerable esteem, as a rather good sort of god, who perhaps meant well enough upon the whole, but in all cases did not succeed in his benevolent designs.", id:9874},
      teacherClasses:[
        {
          classTitle : "Yoga level III",
          classDate : "Thu Feb 24 2017 16:59:25 GMT-0500 (EST)",
          classLink : "",
          classCost : 5,
          classDescription : "I have forgotten to mention that, in many things, Queequeg placed great confidence in the excellence of Yojo's judgment and surprising forecast of things; and cherished Yojo with considerable esteem, as a rather good sort of god, who perhaps meant well enough upon the whole, but in all cases did not succeed in his benevolent designs.",
          id : 5647
        }
      ],
    };
  }

  render() {
    return (
      <div className="teacher-profile">
        <NavBar/>
        <TeacherProfileInfo teacher = {this.state.teacher}/>
        <main>
          <h2>{this.state.teacher.firstName} is teaching the following classes</h2>
          <TeacherClassList teacherClasses = {this.state.teacherClasses}/>
        </main>
      </div>
    );
  }
}

export default TeacherProfile;
