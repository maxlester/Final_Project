import React, {Component} from 'react';
import TeacherClass from './teacherClass.jsx';


class TeacherClassList extends Component {

  render() {
    var teacherClasses = this.props.teacherClasses.map((item)=>{
      console.log("LOKKKKKKKKKKK", item);
      console.log("SSSSSSSSSSSSS", this.props.teacherClasses[0].maxNumberOfStudents)
      return <TeacherClass key = {item.id} teacherId = {this.props.teacherId} classTitle = {item.classTitle} classDate = {item.classDate} classDescription = {item.classDescription} classCost={item.classCost} id={item.classId} router={this.props.router} maxNumberOfStudents = {this.props.teacherClasses[0].maxNumberOfStudents}/>
    })
    return (
      <div>
          {teacherClasses}
      </div>
    );
  }
}

export default TeacherClassList;
