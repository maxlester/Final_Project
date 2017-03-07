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
      teacher: [],
      teacherClasses:[]
    };
  }

componentWillMount() {
  this.getTeacher()
}

setTeacher(teacher) {
  this.setState({teacher: teacher})
}

setClasses(teacherClasses) {
  this.setState({teacherClasses: teacherClasses})
}

getTeacher() {
  let teacherId = this.props.params.teacherId;
   $.ajax({
     url: `http://localhost:8080/teacher/${teacherId}`,
     type: 'GET',
     context: this,
     success: function(data) {
       let teacher = {
        firstName: data.firstName,
        lastName: data.lastName,
        description: data.description,
        id: data.id
       }
       let classes = data.classes
       console.log("tecaher",teacher);
       this.setTeacher(teacher);
       this.setClasses(classes);
     },
     error: function(xhr, status, err) {

       e.error(err.toString());
     }.bind(this)
   })
   return false; //returning false to prevent info showing in url
 }

  render() {
    let classes = null;
    if (this.state.teacherClasses) {
    classes = <h2>{this.state.teacher.firstName} is teaching the following classes</h2>
    }
    else{
      classes = <h2>{this.state.teacher.firstName} is currently not teaching any classes</h2>
    }
    return (
      <div className="teacher-profile">
        <NavBar router = {this.props.router}/>
        <TeacherProfileInfo teacher = {this.state.teacher}/>
        <main>
          <div className="container-main">
            {classes}
            <TeacherClassList teacherId = {this.props.params.teacherId} teacherClasses = {this.state.teacherClasses} router= {this.props.router}/>
          </div>
        </main>
      </div>
    );
  }
}

export default TeacherProfile;
