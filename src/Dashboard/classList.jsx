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
          <TakingClass key = {item.classId} classTitle = {item.classTitle} teacherName = {item.teacherName} classDate = {item.classDate} classLink = {item.classLink}/>
          </div>
          )
      })
    }
    if (this.props.classesGiving){
      classesGiving = this.props.classesGiving.map((item)=>{
        console.log(item.classId)
        return (
          <div>
          <GivingClass key = {item.classId} classTitle = {item.classTitle} classDate = {item.classDate} classLink = {item.classLink} students = {item.students}/>
          </div>
        )
    })

    if(!(this.props.classesGiving || this.props.classesTaking)){
      console.log("nothing");
      noClasses.push(
          <div>
            <h3>You are not currently registered for or teaching any classes</h3>
          </div>
        )
      }
    }


    return (
      <div>
          <h3>Classes you are teaching</h3>
          {classesGiving}
          <h3>Classes you are registered for</h3>
          {classesTaking}
          {noClasses}
      </div>
    );
  }
}

export default ClassList;
