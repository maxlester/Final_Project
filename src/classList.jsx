import React, {Component} from 'react';
import TakingClass from './takingClass.jsx';


class ClassList extends Component {

  render() {
    var classesTaking = this.props.classesTaking.map((item)=>{
      return <TakingClass key = {item.id} classTitle = {item.classTitle} teacherName = {item.teacherName} classDate = {item.classDate} classLink = {item.classLink}/>
    })
    return (
      <div>
        <h3>Classes you are teaching</h3>

        <h3>Classes you are registered for</h3>
          {classesTaking}
      </div>
    );
  }
}

export default ClassList;
