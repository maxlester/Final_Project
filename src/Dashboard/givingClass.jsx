import React, {Component} from 'react';
const uuidV4 = require('uuid/v4');
var moment = require('moment');


class GivingClass extends Component {
  constructor(props) {
    super(props);
    console.log("PROPS", this.props)
    console.log(this.props.classId)
  }

  formatDate(){
    let array = moment(this.props.classDate).toArray();
    let string = moment(this.props.classDate).format('MMMM Do YYYY, h:mm a');
    let formatted = [];
    formatted[0] = array[0];
    formatted[2] = array[2];
    formatted[1]= moment(formatted[1]).format('MMM');
    formatted[3]= string.substr(string.indexOf(",") + 1);
    console.log(formatted);
    return formatted;
  }




  render() {
    let students = this.props.students;
    if (students[0] === "null null"){ students = []}
    let studentNumber = students.length;
    let studentsMarkup = students.map((student)=>{
      let id = uuidV4();
      return <li key = {id}><span className="glyphicon glyphicon-ok" aria-hidden="true"></span>{student}</li>
    })
    return (
      <article className = "class giving-class clearfix">
        <div className="class-info">
          <h4>{this.props.classTitle}</h4>
          <a href = {this.props.classLink}>Access at {this.props.classLink}</a>
          <p><strong>{studentNumber} students registered</strong></p>
          <ul>
            {studentsMarkup}
          </ul>
        </div>
        <div className="class-date">
          <span className="year">{this.formatDate()[0]}</span>
          <span className="day">{this.formatDate()[2]}</span>
          <span className="month">{this.formatDate()[1]}</span>
          <span className="month">{this.formatDate()[3]}</span>
        </div>
        <div className="class-delete" onClick={this.props.deleteClass} data-class-id={this.props.classId}>
          <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
        </div>
      </article>
    );
  }
}

export default GivingClass;
