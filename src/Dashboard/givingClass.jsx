import React, {Component} from 'react';
const uuidV4 = require('uuid/v4');


class GivingClass extends Component {

  render() {
    let studentNumber = this.props.students.length;
    console.log(this.props.students)
    let students = this.props.students.map((student)=>{
      let id = uuidV4();
      return <li key = {id}>{student}</li>
    })
    return (
      <article className = "class clearfix">
        <div className="class-info">
          <h4>{this.props.classTitle}</h4>
          <a href = {this.props.classLink}>Access at {this.props.classLink}</a>
          <p><strong>{studentNumber}</strong> students registered</p>
          <ul>
            {students}
          </ul>
        </div>
        <div className="class-date">
          <span className="month">Oct</span>
          <span className="day">12</span>
          <span className="time">7:30 PM</span>
        </div>
      </article>
    );
  }
}

export default GivingClass;
