import React, {Component} from 'react';
import TakingClass from './takingClass.jsx';
import GivingClass from './givingClass.jsx'


class ClassList extends Component {

  render() {
    let classesTaking;
    let classesGiving;
    let givingMessage;
    let takingMessage;
    let noClassesMessage;
    console.log("classesTaking", this.props.classesTaking)
    if (this.props.classesTaking.length != 0){
      console.log("taking")
        takingMessage = <h3>Classes you are registered for</h3>
       classesTaking = this.props.classesTaking.map((item)=>{
        return <TakingClass key = {item.classId} classTitle = {item.classTitle} teacherName = {item.teacherName} classDate = {item.classDate} classLink = {item.classLink}/>
      })
    }
    if (this.props.classesGiving.length != 0){
      console.log("giving")
      givingMessage = <h3>Classes you are teaching</h3>
      classesGiving = this.props.classesGiving.map((item)=>{
        return <GivingClass key = {item.classId} classTitle = {item.classTitle} classDate = {item.classDate} classLink = {item.classLink} students = {item.students}/>
      })
    }
    if ((this.props.classesGiving.length === 0) && (this.props.classesTaking.length === 0)) {
      noClassesMessage = <h3>Your are not registered for any class</h3>
      }


    return (
      <div>
          {givingMessage}
          {classesGiving}
          {takingMessage}
          {classesTaking}
          {noClassesMessage}
      </div>
    );
  }
}

export default ClassList;
