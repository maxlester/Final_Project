import React, {Component} from 'react';
import TakingClass from './takingClass.jsx';
import GivingClass from './givingClass.jsx'


class ClassList extends Component {

  render() {
    let classesTaking;
    let classesGiving;
    let noClasses;
    if (this.props.classesTaking){
       classesTaking = this.props.classesTaking.map((item)=>{
        return (
          <div>
          <h3>Classes you are registered for</h3>
          <TakingClass key = {item.classId} classTitle = {item.classTitle} teacherName = {item.teacherName} classDate = {item.classDate} classLink = {item.classLink}/>
          </div>
          )
      })
    }
    if (this.props.classesGiving){
      classesGiving = this.props.classesGiving.map((item)=>{
        return (
          <div>
          <h3>Classes you are teaching</h3>
          <GivingClass key = {item.classId} classTitle = {item.classTitle} classDate = {item.classDate} classLink = {item.classLink} students = {item.students}/>
          </div>
        )
      })
    }
    if (!(this.props.classesGiving) && !(this.props.classesTaking)) {
      console.log("Not signed up bitch")
      noClasses = <h3>Your are not signed up for shit sign up motherfucker</h3>
      } else {
        noClasses = "";
      }


    return (
      <div>
          {classesGiving}
          {classesTaking}
          {noClasses}
      </div>
    );
  }
}

export default ClassList;
