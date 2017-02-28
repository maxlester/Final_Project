import React, {Component} from 'react';
import TakingClass from './takingClass.jsx';
import GivingClass from './givingClass.jsx'


class ClassList extends Component {

  render() {
    var classesTaking = this.props.classesTaking.map((item)=>{
      return <TakingClass key = {item.classId} classTitle = {item.classTitle} teacherName = {item.teacherName} classDate = {item.classDate} classLink = {item.classLink}/>
    })
    var classesGiving = this.props.classesGiving.map((item)=>{
      console.log(item.classId)
      return <GivingClass key = {item.classId} classTitle = {item.classTitle} classDate = {item.classDate} classLink = {item.classLink} students = {item.students}/>
    })
    return (
      <div>
        <h3>Classes you are teaching</h3>
          {classesGiving}
        <h3>Classes you are registered for</h3>
          {classesTaking}
      </div>
    );
  }
}

export default ClassList;
