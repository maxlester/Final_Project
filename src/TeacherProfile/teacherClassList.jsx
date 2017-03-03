import React, {Component} from 'react';
import TeacherClass from './teacherClass.jsx';


class TeacherClassList extends Component {

  render() {
    var teacherClasses = this.props.teacherClasses.map((item)=>{
      console.log("ITEM", item)
      return <TeacherClass key = {item.id} teacherId = {this.props.teacherId} classTitle = {item.classTitle} classDate = {item.classDate} classDescription = {item.classDescription} classCost={item.classCost} id={item.classId} router={this.props.router} maxNumberOfStudents = {item.maxNumberOfStudents} numberOfStudents = {item.numberOfStudents} router = {this.props.router}/>
    })
    return (
      <div>
          {teacherClasses}
      </div>
    );
  }
}

export default TeacherClassList;
