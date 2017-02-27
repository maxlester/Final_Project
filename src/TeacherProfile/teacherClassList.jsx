import React, {Component} from 'react';
import TeacherClass from './teacherClass.jsx';


class TeacherClassList extends Component {

  render() {
    var teacherClasses = this.props.teacherClasses.map((item)=>{
      return <TeacherClass key = {item.id} classTitle = {item.classTitle} classDate = {item.classDate} classDescription = {item.classDescription} classCost={item.classCost} id={item.id}/>
    })
    return (
      <div>
          {teacherClasses}
      </div>
    );
  }
}

export default TeacherClassList;
